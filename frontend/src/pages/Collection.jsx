import { useState, useContext, useEffect } from "react"
import { assets } from "../assets/assets"
import { ShopContext } from "../context/shopContext";
import ProductTile from "../components/ProductTile";
import Spinner from "../components/Spinner";


const collection = () => {
  const [loading, setLoading] = useState(true);
  const {products, search, showSearch} = useContext(ShopContext);
  const [filterVisibility, setFilterVisibility] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('Relavent')

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value));
    }else{
      setCategory(prev => [...prev, e.target.value]);
    }
  }
  const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    }else{
      setSubCategory(prev => [...prev, e.target.value]);
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilteredProducts(productsCopy);
    setLoading(false);
  }

  const sortProduct = () => {
    let filteredProductsCopy = filteredProducts.slice();
    switch (sortType) {
      case 'lowToHigh':
        setFilteredProducts(filteredProductsCopy.sort((a, b) => a.price - b.price));
        break;
      case 'highToLow':
        setFilteredProducts(filteredProductsCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProduct();
  }, [sortType, products])

  return (
    <div className="w-full flex gap-2 py-10 max-sm:flex-col">
      {/* filter Options */}
      <div className="min-w-60 flex flex-col gap-5">
        <div onClick={() => setFilterVisibility(!filterVisibility)} className="flex items-center gap-3">
          <h1 className="text-xl">FILTERS</h1>
          <img src={assets.dropdown_icon} alt="dropdownIcon" className={`${filterVisibility ? 'rotate-90 -z-1' : ''} transistion ease-in-out w-3 sm:hidden`}/>
        </div>
        <div className={`flex-col gap-5 ${filterVisibility ? '' : 'hidden'} sm:flex`}>
          <div className="flex flex-col gap-5 border-2 border-gray-300 p-3 rounded-lg">
            <h2 className="text-lg">CATEGORIES</h2>
            <div className="flex flex-col gap-2">
              <p className="flex gap-2"><input type="checkbox" value="Men" className="w-3" onChange={toggleCategory} />Men</p>
              <p className="flex gap-2"><input type="checkbox" value="Women" className="w-3" onChange={toggleCategory} />Women</p>
              <p className="flex gap-2"><input type="checkbox" value="Kids" className="w-3" onChange={toggleCategory} />Kids</p>
            </div>
          </div>
          <div className="flex flex-col gap-5 border-2 border-gray-300 p-3 rounded-lg max-sm:my-5">
            <h2 className="text-lg">TYPE</h2>
            <div className="flex flex-col gap-2">
              <p className="flex gap-2"><input type="checkbox" value="Topwear" className="w-3" onChange={toggleSubCategory} />Top wear</p>
              <p className="flex gap-2"><input type="checkbox" value="Bottomwear" className="w-3" onChange={toggleSubCategory} />Bottom wear</p>
              <p className="flex gap-2"><input type="checkbox" value="Winterwear" className="w-3" onChange={toggleSubCategory} />winter wear</p>
            </div>
          </div>
        </div>
      </div>

      {/* right division */}

      <div className="flex flex-col gap-5 w-full">
        <div className="flex gap-5 max-sm:gap-3 items-center justify-between">
            <h2 className="text-2xl font-normal text-gray-500 flex gap-1 items-center max-sm:text-base">ALL <span className="font-semibold text-black">COLLECTIONS</span> <p className="pl-2 w-12 md:w-16 h-[3px] bg-[#414141]"></p></h2>
            <select onChange={(e) => {setSortType(e.target.value)}} name="sort" id="sort" className="border-2 border-gray-300 rounded-lg p-2">
              <option value="Relavent">Sort by: Relavent</option>
              <option value="lowToHigh">Sort by: Low to High</option>
              <option value="highToLow">Sort by: High to Low</option>
            </select>
        </div>
        <div className={`w-full p-3 ${loading ? "flex justify-center items-center" : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"}`}>
        {
          loading ? (<Spinner />) : (
          filteredProducts.map((item, index) => {
            return(
              <ProductTile key={index} id={item._id} name={item.productName} image={item.image} price={item.price}/>
            )
          }))
        }
        </div>
      </div>

    </div>
  )
}

export default collection

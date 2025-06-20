import {v2 as cloudinary} from 'cloudinary';
import Product from '../models/productModel.js';

const addProduct = async (req, res) => {
    try {
        const {productName, productDesc, price, category, subCategory, sizes, bestSeller} = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        console.log(images);

        const imageUrls = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: "image"});
                return result.secure_url;
            })
        )
        console.log(sizes);
        const newProduct = new Product({
            productName,
            productDesc,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            image: imageUrls,
            bestSeller: bestSeller,
        })
        console.log(newProduct);

        const product = await newProduct.save();
        if(product){
            return res.status(200).json({message: "Product added successfully", success: true});
        }else{
            return res.status(400).json({message: "Error in adding product", success: false});
        }
        
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error", success: false});
    }

}

const getAllProducts = async (req, res) => {
    try{

        const products = await Product.find({});
        if(products){
            return res.json({products, success: true});
        }else{
            return res.status(400).json({message: "No products found", success: false});
        }

    }
    catch (error){
        console.log(error);
        return res.status(500).json({message: "Internal server error", success: false});
    }
}

const removeProduct = async (req, res) => {
    try{
        const {productId} = req.body;
        console.log
        const product = await Product.findByIdAndDelete(productId);
        if(product){
            return res.json({message: "Product deleted successfully", success: true});
        }else{
            return res.status(400).json({message: "Error in deleting product", success: false});
        }
    }
    catch (error){
        console.log(error);
        return res.status(500).json({message: "Internal server error", success: false});
    }

}

const productInfo = async (req, res) => {
    try{
        const {productId} = req.body;
        const product = await Product.findById(productId);
        if(!product){
            return res.json({message: "Unable to get Product Info", success: false});
        }
        return res.json({product, success: true});
    
    }
    catch (error){
        console.log(error);
        return res.status(500).json({message: "internal server error", success: false});
    }
}

export { addProduct, getAllProducts, removeProduct, productInfo };
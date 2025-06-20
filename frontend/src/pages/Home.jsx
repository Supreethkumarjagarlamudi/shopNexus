import BestSeller from "../components/BestSeller"
import Hero from "../components/Hero"
import LatestCollection from "../components/LatestCollection"
import Features from "../components/Features"
import NewsLetter from "../components/NewsLetter"

const home = () => {
  return (
    <div>
      <Hero></Hero>
      <LatestCollection></LatestCollection>
      <BestSeller></BestSeller>
      <Features></Features>
      <NewsLetter></NewsLetter>
    </div>
  )
}

export default home

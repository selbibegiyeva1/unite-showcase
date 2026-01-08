import Slider from "../components/home/Slider"
import SliderPopular from "../components/home/SliderPopular"
import Products from "../components/home/Products"
import NewsBlock from "../components/home/NewsBlock"
import Faq from "../components/home/Faq"

import Footer from "../components/layout/Footer"

function Home() {
    document.title = "Unite Gaming Shop | Home"

    return (
        <div>
            <div className="m-auto px-4 text-white">
                <div className="mb-15">
                    <Slider />
                </div>
                <SliderPopular />

                <div className="pt-10 pb-15">
                    <Products />
                </div>

                <div className="pb-15 max-lg:px-[48px]">
                    <NewsBlock />
                </div>

                <div className="pb-46 max-lg:px-[48px]">
                    <Faq />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home
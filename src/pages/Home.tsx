import Slider from "../components/home/Slider"
import SliderPopular from "../components/home/SliderPopular"
import Products from "../components/home/Products"
import News from "../components/home/News"

function Home() {
    return (
        <div>
            <div className="mb-15">
                <Slider />
            </div>
            <SliderPopular />

            <div className="pt-10 pb-15">
                <Products />
            </div>

            <div className="pb-15">
                <News />
            </div>
        </div>
    )
}

export default Home
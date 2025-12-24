import Slider from "../components/home/Slider"
import SliderPopular from "../components/home/SliderPopular"
import Products from "../components/home/Products"

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
        </div>
    )
}

export default Home
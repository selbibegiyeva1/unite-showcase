import Slider from "../components/home/Slider"
import SliderPopular from "../components/home/SliderPopular"

function Home() {
    return (
        <div>
            <div className="mb-15">
                <Slider />
            </div>
            <SliderPopular />
        </div>
    )
}

export default Home
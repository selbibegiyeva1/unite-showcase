import Slider from "../components/home/Slider"
import SliderPopular from "../components/home/SliderPopular"

function Home() {
    return (
        <div>
            <div className="mb-15">

                {/* First Slider */}
                <Slider />
            </div>

            {/* Second Slider */}
            <SliderPopular />
        </div>
    )
}

export default Home
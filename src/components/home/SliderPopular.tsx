import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/effect-coverflow";

import { EffectCoverflow } from "swiper/modules";

function SliderPopular() {
    const [slides] = useState([
        { id: 1, img: "/home/slider2/1.png", title: "Steam" },
        { id: 2, img: "/home/slider2/2.png", title: "Spotify" },
        { id: 3, img: "/home/slider2/3.png", title: "PlayStation" },
        { id: 4, img: "/home/slider2/4.png", title: "PUBG Mobile" },
        { id: 5, img: "/home/slider2/4.png", title: "PUBG Mobile" },
    ]);

    return (
        <div className="pb-10">
            <b className="text-[32px] pb-6 flex">Популярное</b>
            <Swiper
                effect={"coverflow"}
                slidesPerView={"auto"}
                grabCursor={true}
                centeredSlides={false}
                spaceBetween={33.33}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 0,
                    modifier: 0,
                    slideShadows: true,
                }}
                modules={[EffectCoverflow]}
                className="overflow-hidden"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className="w-57.5!">
                        <Link to='/product'>
                            <img
                                src={slide.img}
                                alt=""
                                className="w-full h-auto block rounded-3xl"
                            />
                            <center><p className="font-bold mt-2.5">{slide.title}</p></center>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default SliderPopular;

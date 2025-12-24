import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import { EffectCoverflow, Navigation } from "swiper/modules";

function SliderPopular() {
    const [slides] = useState([
        { id: 1, img: "/home/slider2/1.png", title: "Steam" },
        { id: 2, img: "/home/slider2/2.png", title: "Spotify" },
        { id: 3, img: "/home/slider2/3.png", title: "PlayStation" },
        { id: 4, img: "/home/slider2/4.png", title: "PUBG Mobile" },
        { id: 5, img: "/home/slider2/4.png", title: "PUBG Mobile" },
    ]);

    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);

    return (
        <div className="pb-10 relative">
            <div className="flex items-center justify-between pb-6">
                <b className="text-[32px]">Популярное</b>

                <div className="flex gap-2">
                    <button
                        ref={prevRef}
                        type="button"
                        aria-label="Previous"
                        className="w-10 h-10 rounded-[10px] bg-[#79109D] flex items-center justify-center"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M9.16732 5L4.16732 10M4.16732 10L9.16732 15M4.16732 10H15.834"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <button
                        ref={nextRef}
                        type="button"
                        aria-label="Next"
                        className="w-10 h-10 rounded-[10px] bg-[#79109D] flex items-center justify-center"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M10.8327 5L15.8327 10M15.8327 10L10.8327 15M15.8327 10H4.16602"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <Swiper
                effect={"coverflow"}
                slidesPerView={"auto"}
                grabCursor
                centeredSlides={false}
                spaceBetween={33.333}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 0,
                    modifier: 0,
                    slideShadows: true,
                }}
                modules={[EffectCoverflow, Navigation]}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    // @ts-expect-error Swiper types
                    swiper.params.navigation.prevEl = prevRef.current;
                    // @ts-expect-error Swiper types
                    swiper.params.navigation.nextEl = nextRef.current;
                }}
                className="overflow-hidden rounded-3xl"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className="w-57.5! shrink-0">
                        <Link to="/product" className="block">
                            <img
                                src={slide.img}
                                alt={slide.title}
                                className="w-full h-auto block rounded-3xl"
                                draggable={false}
                            />
                            <p className="font-bold mt-2.5 text-center">{slide.title}</p>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default SliderPopular;

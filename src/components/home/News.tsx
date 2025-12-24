import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import { EffectCoverflow, Navigation } from "swiper/modules";

function News() {
    const [slides] = useState([
        {
            id: 1,
            img: "/home/news/1.png",
            title: "Розыгрыш 500 000 ₽ завершён",
            text: "Список участников и победителей определён.",
            date: "20.04.2024",
        },
        {
            id: 2,
            img: "/home/news/2.png",
            title: "Разыгрываем 500 000 ₽",
            text: "Совершите от 3 покупок с 20 марта по 10 апреля и выиграйте денежный приз!",
            date: "20.04.2024",
        },
        {
            id: 3,
            img: "/home/news/3.png",
            title: "Итоги розыгрыша 500 000 ₽",
            text: "Список участников и победителей определён.",
            date: "20.04.2024",
        },
        {
            id: 4,
            img: "/home/news/3.png",
            title: "Итоги розыгрыша 500 000 ₽",
            text: "Список участников и победителей определён.",
            date: "20.04.2024",
        }
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
                spaceBetween={33}
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
                    <SwiperSlide key={slide.id} className="w-79.5! shrink-0 rounded-4xl overflow-hidden bg-[#1D2023]">
                        <Link to="/product" className="block">
                            <div className="w-79.5! h-42.5!">
                                <img
                                    src={slide.img}
                                    alt={slide.title}
                                    className="w-full h-full object-cover"
                                    draggable={false}
                                />
                            </div>
                            <div className="p-5">
                                <b className="text-[17px]">{slide.title}</b>
                                <p className="mt-4 text-[#FFFFFFCC] text-[14px]">{slide.text}</p>
                                <p className="mt-11.5 text-[#FFFFFF80] text-[14px] font-light">{slide.date}</p>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default News
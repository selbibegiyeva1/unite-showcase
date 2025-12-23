import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow } from "swiper/modules";

function Slider() {
    const [slides] = useState([
        {
            id: "pubg",
            img: "/home/slider/1.png",
            title: "PUBG Mobile",
            description: "Пополняйте PUBG Mobile без комиссии по UID",
            descriptionClassName: "mt-3 mb-6 w-58.75 text-[14px] font-medium",
            button: {
                to: "/",
                text: "Пополнить аккаунт",
                className:
                    "text-[14px] shadow-[0px_4px_0px_#580873] font-bold py-[11.5px] px-8.75 flex w-52.5 items-center justify-center rounded-[10px]",
            },
        },
        {
            id: "steam",
            img: "/home/slider/2.png",
            title: "Самый выгодный стим",
            titleClassName: "text-[32px] w-79 flex leading-9",
            button: {
                to: "/",
                text: "Посмотреть",
                className:
                    "text-[14px] mt-6 shadow-[0px_4px_0px_#580873] font-bold py-[11.5px] px-8.75 flex w-52.5 items-center justify-center rounded-[10px]",
            },
        },
        {
            id: "ps",
            img: "/home/slider/3.png",
            title: "PlayStation под рукой",
            description: "Погружайся в мир топовых игр без ограничений.",
            descriptionClassName: "mt-3 mb-6 w-70 text-[14px] font-medium",
            button: {
                to: "/",
                text: "Посмотреть",
                className:
                    "text-[14px] shadow-[0px_4px_0px_#580873] font-bold py-[11.5px] px-8.75 flex w-52.5 items-center justify-center rounded-[10px]",
            },
        },
        {
            id: "partners",
            img: "/home/slider/4.png",
            title: "Пополняйте у наших партнёров",
            description: "Выбирай удобный способ оплаты и возвращайся в игру за секунды",
            descriptionClassName: "mt-3 mb-6 w-65 text-[14px] font-medium",
            button: {
                to: "/partners",
                text: "Посмотреть",
                className:
                    "text-[14px] shadow-[0px_4px_0px_#580873] font-bold py-[11.5px] px-8.75 flex w-52.5 items-center justify-center rounded-[10px]",
            },
        },
    ]);

    return (
        <div>
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                spaceBetween={30}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 0,
                    modifier: 0,
                    slideShadows: true,
                }}
                modules={[EffectCoverflow]}
                className="overflow-hidden rounded-3xl"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className="overflow-hidden rounded-3xl">
                        <div className="h-90">
                            <img src={slide.img} alt={slide.title} className="w-full h-full object-cover" />
                        </div>
                        <div className={"absolute bottom-0 p-8 w-full bg-linear-to-t from-black/60 via-black/40 to-transparent"}>
                            <b className={slide.titleClassName ?? "text-[32px]"}>{slide.title}</b>

                            {slide.description ? (
                                <p className={slide.descriptionClassName ?? "mt-3 mb-6 text-[14px] font-medium"}>
                                    {slide.description}
                                </p>
                            ) : null}

                            {slide.button ? (
                                <Link
                                    to={slide.button.to}
                                    style={{ background: "linear-gradient(to right, #79109D, #A132C7)" }}
                                    className={slide.button.className ?? ""}
                                >
                                    {slide.button.text}
                                </Link>
                            ) : null}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Slider;

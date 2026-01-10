import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import { EffectCoverflow, Navigation } from "swiper/modules";

function Slider() {
    const [slides] = useState([
        {
            id: "pubg",
            img: "/home/slider/1.png",
            title: "PUBG Mobile",
            description: "Быстрое и надёжное пополнение по UID",
            descriptionClassName: "mt-3 mb-6 w-58.75 text-[14px] font-medium max-xsmall:mb-4",
            button: {
                group: "PUBG Mobile",
                text: "Пополнить аккаунт",
                className:
                    "text-[14px] max-xsmall:w-full shadow-[0px_4px_0px_#580873] font-bold py-[11.5px] px-8.75 flex w-52.5 items-center justify-center rounded-[10px]",
            },
        },
        {
            id: "steam",
            img: "/home/slider/2.png",
            title: "Удобно пополнить Steam онлайн",
            titleClassName: "text-[32px] max-xsmall:text-[24px] w-79 flex leading-9",
            button: {
                group: "Steam",
                text: "Пополнить аккаунт",
                className:
                    "text-[14px] max-xsmall:w-full mt-6 shadow-[0px_4px_0px_#580873] font-bold py-[11.5px] px-8.75 flex w-52.5 items-center justify-center rounded-[10px]",
            },
        },
        {
            id: "ps",
            img: "/home/slider/3.png",
            title: "PlayStation под рукой",
            description: "Погружайся в мир топовых игр без ограничений.",
            descriptionClassName: "mt-3 mb-6 w-70 text-[14px] font-medium max-xsmall:mb-4",
            button: {
                group: "Playstation",
                text: "Посмотреть",
                className:
                    "text-[14px] max-xsmall:w-full shadow-[0px_4px_0px_#580873] font-bold py-[11.5px] px-8.75 flex w-52.5 items-center justify-center rounded-[10px]",
            },
        },
        {
            id: "partners",
            img: "/home/slider/4.png",
            title: "Пополняйте у наших партнёров",
            description: "Выбирай удобный способ оплаты и возвращайся в игру за секунды",
            descriptionClassName: "mt-3 mb-6 w-65 text-[14px] font-medium max-xsmall:mb-4",
            button: {
                to: "/partners",
                text: "Посмотреть",
                className:
                    "text-[14px] max-xsmall:w-full shadow-[0px_4px_0px_#580873] font-bold py-[11.5px] px-8.75 flex w-52.5 items-center justify-center rounded-[10px]",
            },
        },
    ]);

    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        if (!swiper || !prevEl || !nextEl) return;

        // @ts-expect-error Swiper types
        swiper.params.navigation.prevEl = prevEl;
        // @ts-expect-error Swiper types
        swiper.params.navigation.nextEl = nextEl;

        swiper.navigation?.destroy();
        swiper.navigation?.init();
        swiper.navigation?.update();

        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    }, [swiper, prevEl, nextEl]);

    return (
        <div className="max-w-282.5 m-auto flex items-center justify-between gap-2.5 product">
            <button
                ref={setPrevEl}
                type="button"
                aria-label="Previous"
                disabled={isBeginning}
                className={`slider-arrow ${isBeginning ? "slider-arrow--inactive" : "slider-arrow--active"} btn`}
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

            <Swiper
                onSwiper={setSwiper}
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
                navigation={{ prevEl, nextEl }}
                onInit={(s) => {
                    setIsBeginning(s.isBeginning);
                    setIsEnd(s.isEnd);
                }}
                onSlideChange={(s) => {
                    setIsBeginning(s.isBeginning);
                    setIsEnd(s.isEnd);
                }}
                onReachBeginning={() => setIsBeginning(true)}
                onReachEnd={() => setIsEnd(true)}
                className="flex-1 w-255 overflow-hidden rounded-3xl"
            >
                {slides.map((slide) => {
                    const slideUrl = slide.button?.to ?? (slide.button?.group ? `/product?group=${encodeURIComponent((slide.button as any).group)}` : "#");
                    
                    return (
                        <SwiperSlide key={slide.id} className="overflow-hidden rounded-3xl relative">
                            <Link to={slideUrl} className="block h-full w-full">
                                <div className="h-90 slider-img">
                                    <img src={slide.img} alt={slide.title} className="w-full h-full object-cover" draggable={false} />
                                </div>

                                <div className="absolute bottom-0 p-8 w-full bg-linear-to-t from-black/60 via-black/40 to-transparent max-xsmall:p-4">
                                    <b className={slide.titleClassName ?? "text-[32px] max-xsmall:text-[24px] max-xsmall:w-[300px] max-xsmall:leading-8 flex"}>{slide.title}</b>

                                    {slide.description ? (
                                        <p className={slide.descriptionClassName ?? "mt-3 mb-6 text-[14px] font-medium"}>{slide.description}</p>
                                    ) : null}

                                    {slide.button ? (
                                        <div
                                            style={{ background: "linear-gradient(to right, #79109D, #A132C7)" }}
                                            className={slide.button.className ?? ""}
                                        >
                                            {slide.button.text}
                                        </div>
                                    ) : null}
                                </div>
                            </Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            <button
                ref={setNextEl}
                type="button"
                aria-label="Next"
                disabled={isEnd}
                className={`slider-arrow ${isEnd ? "slider-arrow--inactive" : "slider-arrow--active"} btn`}
            >
                <img src="/home/arrow-forward.png" className="w-5" alt="arrow-forward" />
            </button>
        </div>
    );
}

export default Slider;

import { useRef, useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Link } from "react-router-dom";
import { useTranslations } from "../../translations";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import { EffectCoverflow, Navigation } from "swiper/modules";

interface NewsBlockProps {
    compact?: boolean;
    onNewsClick?: () => void;
    isVisible?: boolean;
}

function NewsBlock({ compact = false, onNewsClick, isVisible }: NewsBlockProps = {}) {
    const t = useTranslations();

    const slides = useMemo(() => [
        {
            id: 1,
            img: "/home/news/1.png",
            title: t.newsBlock.slide1.title,
            text: t.newsBlock.slide1.text,
            date: "07.01.2026",
            to: "/news",
        },
        {
            id: 2,
            img: "/home/news/2.png",
            title: t.newsBlock.slide2.title,
            text: t.newsBlock.slide2.text,
            date: "07.01.2026",
            to: "/news2",
        },
        {
            id: 3,
            img: "/home/news/3.png",
            title: t.newsBlock.slide3.title,
            text: t.newsBlock.slide3.text,
            date: "07.01.2026",
            to: "/news3",
        },
        {
            id: 4,
            img: "/home/news/4.png",
            title: t.newsBlock.slide4.title,
            text: t.newsBlock.slide4.text,
            date: "07.01.2026",
            to: "/news4",
        }
    ], [t]);

    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);
    const swiperRef = useRef<SwiperType | null>(null);

    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        if (compact && isVisible && swiperRef.current) {
            const timer = setTimeout(() => {
                swiperRef.current?.update();
                swiperRef.current?.updateSlides();
                setIsBeginning(swiperRef.current?.isBeginning ?? true);
                setIsEnd(swiperRef.current?.isEnd ?? false);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [compact, isVisible]);

    return (
        <div className={`relative ${compact ? "" : "max-w-255 m-auto"}`}>
            <div className={`flex items-center justify-between ${compact ? "pb-4" : "pb-6"}`}>
                <b className={compact ? "text-[20px]" : "text-[32px]"}>{t.newsBlock.title}</b>

                <div className="flex gap-2">
                    <button
                        ref={prevRef}
                        type="button"
                        aria-label="Previous"
                        disabled={isBeginning}
                        className={`slider-arrow ${isBeginning ? "slider-arrow--inactive" : "slider-arrow--active"}`}
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
                        disabled={isEnd}
                        className={`slider-arrow ${isEnd ? "slider-arrow--inactive" : "slider-arrow--active"}`}
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
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                effect={"coverflow"}
                slidesPerView={"auto"}
                grabCursor
                centeredSlides={false}
                spaceBetween={compact ? 16 : 33.333}
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
                onInit={(swiper) => {
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                }}
                onAfterInit={(swiper) => {
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                }}
                onSlideChange={(swiper) => {
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                }}
                onReachBeginning={() => setIsBeginning(true)}
                onReachEnd={() => setIsEnd(true)}
                className="overflow-hidden rounded-3xl"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className={`${compact ? "w-56!" : "w-79.5! h-[370px]!"} shrink-0 h-full ${compact ? "rounded-2xl" : "rounded-4xl"} overflow-hidden bg-[#1D2023]`}>
                        <Link to={slide.to} className="flex flex-col h-full" onClick={onNewsClick}>
                            <div className={`${compact ? "w-56! h-23.5!" : "w-79.5! h-42.5!"} shrink-0`}>
                                <img
                                    src={slide.img}
                                    alt={slide.title}
                                    className="w-full h-full object-cover"
                                    draggable={false}
                                    loading="lazy"
                                />
                            </div>
                            <div className={`flex flex-col flex-1 ${compact ? "px-[11px] pt-[11px] pb-[30px]" : "p-5"}`}>
                                <div className="flex-1">
                                    <b className={`${compact ? "text-[14px]" : "text-[17px]"}`}>{slide.title}</b>
                                    <p className={`${compact ? "mt-2" : "mt-4"} text-[#FFFFFFCC] ${compact ? "text-[12px]" : "text-[14px]"}`}>{slide.text}</p>
                                </div>
                                <p className={`mt-auto text-[#FFFFFF80] text-[14px] font-light ${compact ? "hidden" : "block"}`}>{slide.date}</p>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default NewsBlock
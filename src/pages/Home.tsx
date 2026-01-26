import { useState } from "react";
import Slider from "../components/home/Slider"
import SliderPopular from "../components/home/SliderPopular"
import Products from "../components/home/Products"
import NewsBlock from "../components/home/NewsBlock"
import Faq from "../components/home/Faq"
import SupportHelpModal from "../components/product/SupportHelpModal"
import { useTranslations } from "../translations"

import Footer from "../components/layout/Footer"

function Home() {
    const t = useTranslations();
    const [isSupportOpen, setIsSupportOpen] = useState(false);
    document.title = "Unite Gaming Shop | Home"

    return (
        <div>
            <div className="m-auto px-4 text-white product-page">
                <div className="mb-15">
                    <Slider />
                </div>
                <SliderPopular />

                <div className="pt-10 pb-15">
                    <Products />
                </div>

                <div className="max-w-255 m-auto pb-15 max-lg:px-[48px] product">
                    <div
                        className="overflow-hidden relative rounded-3xl px-[32px] py-[32px] max-lg:px-[24px] max-lg:py-[24px] flex flex-col lg:flex-row items-center justify-between gap-[24px]"
                        style={{
                            backgroundImage: "url('/news/5/bg.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="relative z-10">
                            <p className="text-[28px] leading-[34px] font-semibold max-md:text-[24px]">
                                {t.support.bannerTitle}
                            </p>
                            <p className="my-[18px] text-[16px] leading-[22px] text-[#FFFFFF99] max-md:text-[14px]">
                                {t.support.bannerDescription}
                            </p>

                            <button
                                type="button"
                                onClick={() => setIsSupportOpen(true)}
                                style={{ background: "linear-gradient(to right, #79109D, #A132C7)" }}
                                className="inline-flex w-[206px] cursor-pointer text-[14px] shadow-[0px_4px_0px_#580873] font-bold py-[11.5px] px-8.75 items-center justify-center rounded-[10px]"
                            >
                                {t.support.bannerButton}
                            </button>
                        </div>

                        <div className="relative max-w-[200px] z-10 max-lg:w-[253px] lg:w-[320px] xl:w-[380px]">
                            <img
                                src="/news/5/about.png"
                                alt="about"
                                className="w-full h-full object-contain select-none pointer-events-none"
                                loading="lazy"
                            />
                        </div>

                        <div className="absolute bg-black/70 w-full h-full left-0 top-0" />
                    </div>
                </div>

                <div className="pb-15 max-lg:px-[48px] product">
                    <NewsBlock />
                </div>

                <div className="pb-46 max-lg:px-[48px] product">
                    <Faq />
                </div>
            </div>
            <Footer />
            <SupportHelpModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
        </div>
    )
}

export default Home
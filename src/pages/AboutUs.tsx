import { useState } from "react";
import { useTranslations } from "../translations";

import NewsBlock from "../components/home/NewsBlock";
import Footer from "../components/layout/Footer";
import SupportHelpModal from "../components/product/SupportHelpModal";

function AboutUs() {
    const t = useTranslations();
    const [isSupportOpen, setIsSupportOpen] = useState(false);
    document.title = t.news.news5.documentTitle;

    return (
        <>
            <div className="px-4 max-lg:px-[64px] product">
                <div className="max-w-255 m-auto">

                    <div className="mt-[32px] mb-[40px]">
                        <h1 className="text-white font-medium text-[32px] leading-9">{t.news.news5.title}</h1>
                    </div>
                    <img src="home/news/5.png" alt="" className="w-full rounded-3xl" loading="lazy" />

                    <div className="mt-[32px] mb-[70px] text-white">
                        <center>
                            <p className="font-medium text-[32px]">{t.news.news5.whoWeAre}</p>
                        </center>
                        <p className="mt-[32px]">{t.news.news5.intro}</p>

                        <center>
                            <p className="font-medium text-[32px] mt-[60px] max-w-[750px] leading-[36px]">{t.news.news5.mission}</p>
                        </center>

                        <p className="mt-[24px]">
                            {t.news.news5.whatWeDo}
                            <br /><br />
                            {t.news.news5.whatWeDoIntro}
                        </p>

                        <div className="mt-[24px] flex flex-col gap-2.5">
                            <div className="flex items-center gap-2.5 px-[24px] py-[16px] bg-[#1D2023] rounded-[10px]">
                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="4" cy="4" r="4" fill="#A132C7" />
                                </svg>
                                <p>{t.news.news5.topUpBalance}</p>
                            </div>
                            <div className="flex items-center gap-2.5 px-[24px] py-[16px] bg-[#1D2023] rounded-[10px]">
                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="4" cy="4" r="4" fill="#A132C7" />
                                </svg>
                                <p>{t.news.news5.buyGameCurrency}</p>
                            </div>
                            <div className="flex items-center gap-2.5 px-[24px] py-[16px] bg-[#1D2023] rounded-[10px]">
                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="4" cy="4" r="4" fill="#A132C7" />
                                </svg>
                                <p>{t.news.news5.buyDigitalGoods}</p>
                            </div>
                            <div className="flex items-center gap-2.5 px-[24px] py-[16px] bg-[#1D2023] rounded-[10px]">
                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="4" cy="4" r="4" fill="#A132C7" />
                                </svg>
                                <p>{t.news.news5.allInOnePlace}</p>
                            </div>
                        </div>

                        <p className="font-medium text-[32px] mt-[60px] leading-[36px]">{t.news.news5.whyTrustUs}</p>

                        <ul className="list-decimal pl-[24px] pt-[32px]">
                            <li>
                                <b className="text-[#A132C7]">{t.news.news5.reliability}</b> <span dangerouslySetInnerHTML={{ __html: t.news.news5.reliabilityText }} />
                            </li>
                            <li>
                                <b className="text-[#A132C7]">{t.news.news5.speed}</b> <span dangerouslySetInnerHTML={{ __html: t.news.news5.speedText }} />
                            </li>
                            <li>
                                <b className="text-[#A132C7]">{t.news.news5.benefit}</b> <span dangerouslySetInnerHTML={{ __html: t.news.news5.benefitText }} />
                            </li>
                        </ul>

                        <p className="font-medium text-[32px] mt-[60px] leading-[36px]">{t.news.news5.howItWorks}</p>

                        <div className="mt-[24px] flex flex-col gap-2.5">
                            <div className="flex items-center gap-2.5 px-[24px] py-[16px] bg-[#1D2023] rounded-[10px]">
                                <b className="text-[24px] text-[#A132C7]">1.</b>
                                <p>{t.news.news5.step1}</p>
                            </div>
                            <div className="flex items-center gap-2.5 px-[24px] py-[16px] bg-[#1D2023] rounded-[10px]">
                                <b className="text-[24px] text-[#A132C7]">2.</b>
                                <p>{t.news.news5.step2}</p>
                            </div>
                            <div className="flex items-center gap-2.5 px-[24px] py-[16px] bg-[#1D2023] rounded-[10px]">
                                <b className="text-[24px] text-[#A132C7]">3.</b>
                                <p>{t.news.news5.step3}</p>
                            </div>
                            <div className="flex items-center gap-2.5 px-[24px] py-[16px] bg-[#1D2023] rounded-[10px]">
                                <b className="text-[24px] text-[#A132C7]">4.</b>
                                <p>{t.news.news5.step4}</p>
                            </div>
                        </div>

                        <div
                            className="mt-[60px] overflow-hidden relative rounded-3xl px-[32px] py-[32px] max-lg:px-[24px] max-lg:py-[24px] flex flex-col lg:flex-row items-center justify-between gap-[24px]"
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

                    <div className="pb-[88px] text-white">
                        <NewsBlock />
                    </div>
                </div>
            </div>
            <Footer />
            <SupportHelpModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
        </>
    );
}

export default AboutUs

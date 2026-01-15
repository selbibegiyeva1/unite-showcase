import { Link } from "react-router-dom"
import { useTranslations } from "../../translations"

import NewsBlock from "../../components/home/NewsBlock"
import Footer from "../../components/layout/Footer"

function News5() {
    const t = useTranslations();
    document.title = t.news.news5.documentTitle

    return (
        <div>
            <div className="px-4 max-lg:px-[64px] product">
                <div className="max-w-255 m-auto">
                    <div className="text-[15.67px] font-medium flex items-center gap-3.5">
                        <Link to="/" className="flex items-center gap-1 w-fit text-[#969FA8]">
                            <img src="/partner/grid.png" alt="grid" style={{ width: 24 }} loading="lazy" />
                            <span>{t.news.home}</span>
                            <img src="partner/arrow.png" alt="arrow" style={{ width: 24 }} loading="lazy" />
                        </Link>
                        <p className="text-white">{t.news.news}</p>
                    </div>

                    <div className="mt-[32px] mb-[40px]">
                        <p className="text-[#888BAA] text-[14px] font-medium">07.01.2026</p>
                        <p className="mt-[10px] flex text-white font-medium text-[32px] leading-9">{t.news.news5.title}</p>
                    </div>
                    <img src="home/news/5.png" alt="news" className="w-full rounded-3xl" loading="lazy" />

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
                                <b className="text-[#A132C7]">{t.news.news5.reliability}</b> {t.news.news5.reliabilityText}
                            </li>
                            <li>
                                <b className="text-[#A132C7]">{t.news.news5.speed}</b>: {t.news.news5.speedText}
                            </li>
                            <li>
                                <b className="text-[#A132C7]">{t.news.news5.benefit}</b> {t.news.news5.benefitText}
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
                                    {t.news.news5.bannerTitle}
                                </p>
                                <p className="my-[18px] max-w-[465px] text-[16px] leading-[22px] text-[#FFFFFF99] max-md:text-[14px]">
                                    {t.news.news5.bannerDescription}
                                </p>

                                <Link
                                    to="/news4"
                                    style={{ background: "linear-gradient(to right, #79109D, #A132C7)" }}
                                    className="inline-flex text-[14px] shadow-[0px_4px_0px_#580873] font-bold py-[11.5px] px-8.75 items-center justify-center rounded-[10px]"
                                >
                                    {t.news.news5.bannerButton}
                                </Link>
                            </div>

                            <div className="relative z-10 max-lg:w-[260px] lg:w-[320px] xl:w-[380px]">
                                <img
                                    src="/news/5/gamepad.png"
                                    alt="gamepad"
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
        </div>
    )
}

export default News5

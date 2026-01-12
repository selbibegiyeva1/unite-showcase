import React from "react"
import { Link } from "react-router-dom"
import { useTranslations } from "../../translations"

import NewsBlock from "../../components/home/NewsBlock"
import Footer from "../../components/layout/Footer"

function News2() {
    const t = useTranslations();
    document.title = `Unite Gaming Shop | ${t.news.news2.title}`

    return (
        <div>
            <div className="px-4 max-lg:px-[64px] product">
                <div className="max-w-255 m-auto">
                    <div className="text-[15.67px] font-medium flex items-center gap-3.5">
                        <Link to="/" className="flex items-center gap-1 w-fit text-[#969FA8]">
                            <img src="/partner/grid.png" alt="grid" style={{ width: 24 }} />
                            <span>{t.news.home}</span>
                            <img src="partner/arrow.png" alt="arrow" style={{ width: 24 }} />
                        </Link>
                        <p className="text-white">{t.news.news}</p>
                    </div>

                    <div className="mt-[32px] mb-[40px]">
                        <p className="text-[#888BAA] text-[14px] font-medium">07.01.2026</p>
                        <p className="mt-[10px] flex text-white font-medium text-[32px] leading-9">{t.news.news2.title}</p>
                    </div>
                    <img src="home/news/2.png" alt="news" className="w-full rounded-3xl" />

                    <div className="mt-[32px] mb-[70px] text-white">
                        <p>
                            {t.news.news2.intro.split('\n').map((line, lineIdx, lines) => (
                                <React.Fragment key={lineIdx}>
                                    {line.includes('AAA') ? (
                                        <>
                                            {line.split('AAA').map((part, partIdx, parts) => (
                                                <React.Fragment key={partIdx}>
                                                    {part}
                                                    {partIdx < parts.length - 1 && <b>AAA-релизы</b>}
                                                </React.Fragment>
                                            ))}
                                        </>
                                    ) : line.includes('Главные релизы') || line.includes('Main releases') ? (
                                        <b>{line}</b>
                                    ) : (
                                        line
                                    )}
                                    {lineIdx < lines.length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </p>
                        <br /><br /><br />
                        <div className="flex items-start gap-9 max-lg:flex-col">
                            <div>
                                <p className="text-[32px] font-medium leading-10.5">{t.news.news2.gta6Title}</p>
                                <p className="mt-7">
                                    {t.news.news2.gta6Desc.split('\n\n').map((para, idx, arr) => (
                                        <React.Fragment key={idx}>
                                            {para}
                                            {idx < arr.length - 1 && <><br /><br /></>}
                                        </React.Fragment>
                                    ))}
                                    <br /><br />
                                    <b>{t.news.news2.releaseDate} {t.news.news2.gta6Date}</b>
                                </p>
                            </div>
                            <img src="/news/2/1.png" alt="hollow-knight" className="max-w-[524px] rounded-3xl max-lg:max-w-full" />
                        </div>

                        <br /><br />

                        <div className="flex items-start gap-9 max-lg:flex-col">
                            <div>
                                <p className="text-[32px] font-medium leading-10.5">{t.news.news2.wolverineTitle}</p>
                                <p className="mt-7">
                                    {t.news.news2.wolverineDesc}
                                    <br /><br />
                                    <b>{t.news.news2.releaseDate} {t.news.news2.wolverineDate}</b>
                                </p>
                            </div>
                            <img src="/news/2/2.png" alt="hollow-knight" className="max-w-[524px] rounded-3xl max-lg:max-w-full" />
                        </div>

                        <br /><br />

                        <div className="flex items-start gap-9 max-lg:flex-col">
                            <div>
                                <p className="text-[32px] font-medium leading-10.5">{t.news.news2.firstLightTitle}</p>
                                <p className="mt-7">
                                    {t.news.news2.firstLightDesc}
                                    <br /><br />
                                    <b>{t.news.news2.releaseDate} {t.news.news2.firstLightDate}</b>
                                </p>
                            </div>
                            <img src="/news/2/3.png" alt="hollow-knight" className="max-w-[524px] rounded-3xl max-lg:max-w-full" />
                        </div>

                        <br /><br />

                        <div className="flex items-start gap-9 max-lg:flex-col">
                            <div>
                                <p className="text-[32px] font-medium leading-10.5">{t.news.news2.tombRaiderTitle}</p>
                                <p className="mt-7">
                                    {t.news.news2.tombRaiderDesc}
                                    <br /><br />
                                    <b>{t.news.news2.releaseDate} {t.news.news2.tombRaiderDate}</b>
                                </p>
                            </div>
                            <img src="/news/2/4.png" alt="hollow-knight" className="max-w-[524px] rounded-3xl max-lg:max-w-full" />
                        </div>

                        <br /><br />

                        <div className="flex items-start gap-9 max-lg:flex-col">
                            <div>
                                <p className="text-[32px] font-medium leading-10.5">{t.news.news2.marathonTitle}</p>
                                <p className="mt-7">
                                    {t.news.news2.marathonDesc}
                                    <br /><br />
                                    <b>{t.news.news2.releaseDate} {t.news.news2.marathonDate}</b>
                                </p>
                            </div>
                            <img src="/news/2/5.png" alt="hollow-knight" className="max-w-[524px] rounded-3xl max-lg:max-w-full" />
                        </div>

                        <br /><br />

                        <div className="flex items-start gap-9 max-lg:flex-col">
                            <div>
                                <p className="text-[32px] font-medium leading-10.5">{t.news.news2.warhammerTitle}</p>
                                <p className="mt-7">
                                    {t.news.news2.warhammerDesc}
                                    <br /><br />
                                    <b>{t.news.news2.releaseDate} {t.news.news2.warhammerDate}</b>
                                </p>
                            </div>
                            <img src="/news/2/6.png" alt="hollow-knight" className="max-w-[524px] rounded-3xl max-lg:max-w-full" />
                        </div>

                        <br /><br />

                        <div className="flex items-start gap-9 max-lg:flex-col">
                            <div>
                                <p className="text-[32px] font-medium leading-10.5">{t.news.news2.residentEvilTitle}</p>
                                <p className="mt-7">
                                    {t.news.news2.residentEvilDesc}
                                    <br /><br />
                                    <b>{t.news.news2.releaseDate} {t.news.news2.residentEvilDate}</b>
                                </p>
                            </div>
                            <img src="/news/2/8.png" alt="hollow-knight" className="max-w-[524px] rounded-3xl max-lg:max-w-full" />
                        </div>

                        <br /><br />

                        <div className="flex items-start gap-9 max-lg:flex-col">
                            <div>
                                <p className="text-[32px] font-medium leading-10.5">{t.news.news2.marvel1943Title}</p>
                                <p className="mt-7">
                                    {t.news.news2.marvel1943Desc}
                                    <br /><br />
                                    <b>{t.news.news2.releaseDate} {t.news.news2.marvel1943Date}</b>
                                </p>
                            </div>
                            <img src="/news/2/7.png" alt="hollow-knight" className="max-w-[524px] rounded-3xl max-lg:max-w-full" />
                        </div>

                        <br /><br />

                        <p className="mt-[10px] flex text-white font-medium text-[32px] leading-9">{t.news.news2.summary}</p>
                        <br />
                        <p>
                            {t.news.news2.summaryContent.split('\n\n').map((para, idx, arr) => (
                                <React.Fragment key={idx}>
                                    {para}
                                    {idx < arr.length - 1 && <><br /><br /></>}
                                </React.Fragment>
                            ))}
                        </p>
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

export default News2
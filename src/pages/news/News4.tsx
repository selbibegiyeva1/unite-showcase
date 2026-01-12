import React from "react"
import { Link } from "react-router-dom"
import { useTranslations } from "../../translations"

import NewsBlock from "../../components/home/NewsBlock"
import Footer from "../../components/layout/Footer"

function News4() {
    const t = useTranslations();
    document.title = "Unite Gaming Shop | Не нашел свою игру на сайте? Мы добавим ее для тебя!"

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
                        <p className="mt-[10px] flex text-white font-medium text-[32px] leading-9">{t.news.news4.title}</p>
                    </div>
                    <img src="home/news/4.png" alt="news" className="w-full rounded-3xl" />

                    <div className="mt-[32px] mb-[70px] text-white">
                        <p>
                            {t.news.news4.intro.split('\n\n').map((para, idx, arr) => (
                                <React.Fragment key={idx}>
                                    {para.split('\n').map((line, lineIdx, lines) => (
                                        <React.Fragment key={lineIdx}>
                                            {line}
                                            {lineIdx < lines.length - 1 && <br />}
                                        </React.Fragment>
                                    ))}
                                    {idx < arr.length - 1 && <><br /><br /></>}
                                </React.Fragment>
                            ))}
                            <br /><br />
                            <b>{t.news.news4.ifNotFound}</b>
                            <br /><br />
                            <ul className="list-decimal list-inside">
                                <li>{t.news.news4.step1}</li>
                                <li>{t.news.news4.step2}</li>
                                <li>{t.news.news4.step3}</li>
                            </ul>
                            <br />
                            {t.news.news4.done}
                            <br /><br /><br />
                            <b>{t.news.news4.whatsNext}</b>
                            <br /><br />
                            {t.news.news4.nextContent.split('\n\n').map((para, idx, arr) => (
                                <React.Fragment key={idx}>
                                    {para.split('\n').map((line, lineIdx, lines) => (
                                        <React.Fragment key={lineIdx}>
                                            {line}
                                            {lineIdx < lines.length - 1 && <br />}
                                        </React.Fragment>
                                    ))}
                                    {idx < arr.length - 1 && <><br /><br /></>}
                                </React.Fragment>
                            ))}
                        </p>

                        <center>
                            <a
                                href="https://forms.gle/YUvG1sbAXQtpMyL27"
                                target="_blank"
                                style={{ background: "linear-gradient(to right, #79109D, #A132C7)" }}
                                className="text-[14px] mt-[33px] w-fit shadow-[0px_4px_0px_#580873] font-bold py-[11.5px] px-8.75 flex items-center justify-center rounded-[10px]"
                            >
                                {t.news.news4.submitButton}
                            </a>
                        </center>
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

export default News4
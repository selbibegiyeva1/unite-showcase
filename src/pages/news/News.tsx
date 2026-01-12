import React from "react"
import { Link } from "react-router-dom"
import { useTranslations } from "../../translations"

import NewsBlock from "../../components/home/NewsBlock"
import Footer from "../../components/layout/Footer"

function News() {
    const t = useTranslations();
    document.title = `Unite Gaming Shop | ${t.news.news1.title}`

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
                        <p className="mt-[10px] flex text-white font-medium text-[32px] leading-9">{t.news.news1.title}</p>
                    </div>
                    <img src="home/news/1.png" alt="news" className="w-full rounded-3xl" />

                    <div className="mt-[32px] mb-[70px] text-white">
                        <p>
                            {t.news.news1.intro.split('\n\n').map((para, idx, arr) => (
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
                        <br /><br /><br />

                        {/* This divs 👇 */}
                        <div className="flex items-start gap-9 max-lg:flex-col">
                            <div>
                                <p className="text-[32px] font-medium leading-10.5">{t.news.news1.gameOfYear}</p>
                                <ul className="list-disc list-inside mt-7 flex">
                                    <li>{t.news.news1.gameOfYearDesc}</li>
                                </ul>
                            </div>
                            <img src="/news/1/1.png" alt="hollow-knight" className="max-w-[524px] rounded-3xl max-lg:max-w-full" />
                        </div>

                        <br /><br />

                        <div className="flex items-start gap-9 max-lg:flex-col">
                            <div>
                                <p className="text-[32px] font-medium leading-10.5">{t.news.news1.vrGameOfYear}</p>
                                <ul className="list-disc list-inside mt-7 flex">
                                    <li>{t.news.news1.vrGameOfYearDesc}</li>
                                </ul>
                            </div>
                            <img src="/news/1/2.png" alt="hollow-knight" className="max-w-[524px] rounded-3xl max-lg:max-w-full" />
                        </div>

                        <br /><br />

                        <div className="flex items-start gap-9 max-lg:flex-col">
                            <div>
                                <p className="text-[32px] font-medium leading-10.5">{t.news.news1.laborOfLove}</p>
                                <ul className="list-disc list-inside mt-7 flex">
                                    <li>{t.news.news1.laborOfLoveDesc}</li>
                                </ul>
                            </div>
                            <img src="/news/1/3.png" alt="hollow-knight" className="max-w-[524px] rounded-3xl max-lg:max-w-full" />
                        </div>

                        <br /><br />

                        <div className="flex items-start gap-9 max-lg:flex-col">
                            <div>
                                <p className="text-[32px] font-medium leading-10.5">{t.news.news1.bestSteamDeck}</p>
                                <ul className="list-disc list-inside mt-7 flex">
                                    <li>{t.news.news1.bestSteamDeckDesc}</li>
                                </ul>
                            </div>
                            <img src="/news/1/4.png" alt="hollow-knight" className="max-w-[524px] rounded-3xl max-lg:max-w-full" />
                        </div>

                        <br /><br />

                        <div className="flex items-start gap-9 max-lg:flex-col">
                            <div>
                                <p className="text-[32px] font-medium leading-10.5">{t.news.news1.betterWithFriends}</p>
                                <ul className="list-disc list-inside mt-7 flex">
                                    <li>{t.news.news1.betterWithFriendsDesc}</li>
                                </ul>
                            </div>
                            <img src="/news/1/5.png" alt="hollow-knight" className="max-w-[524px] rounded-3xl max-lg:max-w-full" />
                        </div>

                        <br /><br />

                        <div className="flex items-start gap-9 max-lg:flex-col">
                            <div>
                                <p className="text-[32px] font-medium leading-10.5">{t.news.news1.outstandingVisual}</p>
                                <ul className="list-disc list-inside mt-7 flex">
                                    <li>{t.news.news1.outstandingVisualDesc}</li>
                                </ul>
                            </div>
                            <img src="/news/1/6.png" alt="hollow-knight" className="max-w-[524px] rounded-3xl max-lg:max-w-full" />
                        </div>

                        <br /><br />

                        <div className="flex items-start gap-9 max-lg:flex-col">
                            <div>
                                <p className="text-[32px] font-medium leading-10.5">{t.news.news1.mostInnovative}</p>
                                <ul className="list-disc list-inside mt-7 flex">
                                    <li>{t.news.news1.mostInnovativeDesc}</li>
                                </ul>
                            </div>
                            <img src="/news/1/7.png" alt="hollow-knight" className="max-w-[524px] rounded-3xl max-lg:max-w-full" />
                        </div>

                        <br /><br />

                        <div className="flex items-start gap-9 max-lg:flex-col">
                            <div>
                                <p className="text-[32px] font-medium leading-10.5">{t.news.news1.bestSoundtrack}</p>
                                <ul className="list-disc list-inside mt-7 flex">
                                    <li>{t.news.news1.bestSoundtrackDesc}</li>
                                </ul>
                            </div>
                            <img src="/news/1/8.png" alt="hollow-knight" className="max-w-[524px] rounded-3xl max-lg:max-w-full" />
                        </div>

                        <br /><br />

                        <div className="flex items-start gap-9 max-lg:flex-col">
                            <div>
                                <p className="text-[32px] font-medium leading-10.5">{t.news.news1.outstandingStory}</p>
                                <ul className="list-disc list-inside mt-7 flex">
                                    <li>{t.news.news1.outstandingStoryDesc}</li>
                                </ul>
                            </div>
                            <img src="/news/1/9.png" alt="hollow-knight" className="max-w-[524px] rounded-3xl max-lg:max-w-full" />
                        </div>

                        <br /><br />

                        <div className="flex items-start gap-9 max-lg:flex-col">
                            <div>
                                <p className="text-[32px] font-medium leading-10.5">{t.news.news1.sitBack}</p>
                                <ul className="list-disc list-inside mt-7 flex">
                                    <li>{t.news.news1.sitBackDesc}</li>
                                </ul>
                            </div>
                            <img src="/news/1/10.png" alt="hollow-knight" className="max-w-[524px] rounded-3xl max-lg:max-w-full" />
                        </div>

                        <br /><br />

                        <p className="mt-[10px] flex text-white font-medium text-[32px] leading-9">{t.news.news1.saleEnded}</p>
                        <br />
                        <p>
                            {t.news.news1.saleEndedContent.split('\n\n').map((para, idx, arr) => {
                                const lines = para.split('\n');
                                const listItems = lines.filter(l => 
                                    l.startsWith('Быстро:') || l.startsWith('Fast:') || 
                                    l.startsWith('Удобно:') || l.startsWith('Convenient:') ||
                                    l.startsWith('Надежно:') || l.startsWith('Reliable:')
                                );
                                const regularLines = lines.filter(l => !listItems.includes(l));
                                
                                if (listItems.length > 0) {
                                    return (
                                        <React.Fragment key={idx}>
                                            {regularLines.map((line, lineIdx) => (
                                                <React.Fragment key={lineIdx}>
                                                    {line}
                                                    {lineIdx < regularLines.length - 1 && <br />}
                                                </React.Fragment>
                                            ))}
                                            <br /><br />
                                            <ul>
                                                {listItems.map((item, itemIdx) => (
                                                    <li key={itemIdx} className="list-disc list-inside">{item}</li>
                                                ))}
                                            </ul>
                                            {idx < arr.length - 1 && <><br /><br /></>}
                                        </React.Fragment>
                                    );
                                }
                                return (
                                    <React.Fragment key={idx}>
                                        {lines.map((line, lineIdx) => (
                                            <React.Fragment key={lineIdx}>
                                                {line}
                                                {lineIdx < lines.length - 1 && <br />}
                                            </React.Fragment>
                                        ))}
                                        {idx < arr.length - 1 && <><br /><br /></>}
                                    </React.Fragment>
                                );
                            })}
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

export default News
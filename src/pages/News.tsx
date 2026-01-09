import { Link } from "react-router-dom"

import NewsBlock from "../components/home/NewsBlock"
import Footer from "../components/layout/Footer"

function News() {
    document.title = "Unite Gaming Shop | News"

    return (
        <div>
            <div className="px-4 max-lg:px-[64px] product">
                <div className="max-w-255 m-auto">
                    <div className="text-[15.67px] font-medium flex items-center gap-3.5">
                        <Link to="/" className="flex items-center gap-1 w-fit text-[#969FA8]">
                            <img src="/partner/grid.png" alt="grid" style={{ width: 24 }} />
                            <span>Главная</span>
                            <img src="partner/arrow.png" alt="arrow" style={{ width: 24 }} />
                        </Link>
                        <p className="text-white">Новости</p>
                    </div>

                    <div className="mt-[32px] mb-[40px]">
                        <p className="text-[#888BAA] text-[14px] font-medium">23.05.2024</p>
                        <p className="mt-[10px] flex text-white font-medium text-[32px] leading-9">Топ-20 лучших игр для ПК</p>
                    </div>
                    <img src="/news/news.png" alt="news" className="w-full rounded-3xl" />

                    <div className="mt-[32px] mb-[70px] text-white">
                        <p>
                            Из года в год разработчики игр на ПК всё активнее радуют геймеров качественным контентом. И пока профи с нетерпением
                            ожидают конкретных релизов, новички и любители теряются в океане сиквелов, ремейков и оригинальных новинок.
                            Мы собрали топ-20 лучших игр, чтобы сэкономить ваше время и облегчить поиск по-настоящему крутых сюжетов.
                            <br />
                            <br />
                            Играя в эти игры, вы не пропустите ничего важного. Это действительно классные проекты, которые стоит попробовать.
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
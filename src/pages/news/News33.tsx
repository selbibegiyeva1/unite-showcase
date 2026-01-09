import { Link } from "react-router-dom"

import NewsBlock from "../../components/home/NewsBlock"
import Footer from "../../components/layout/Footer"

function News33() {
    document.title = "Unite Gaming Shop | Оплата товаров теперь доступна онлайн"

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
                        <p className="text-[#888BAA] text-[14px] font-medium">07.01.2026</p>
                        <p className="mt-[10px] flex text-white font-medium text-[32px] leading-9">Оплата товаров теперь доступна онлайн</p>
                    </div>
                    <img src="home/news/3.png" alt="news" className="w-full rounded-3xl" />

                    <div className="mt-[32px] mb-[70px] text-white">
                        <p className="flex text-white font-medium text-[32px] leading-9">Уважаемые пользователи!</p>
                        <br />
                        <p>
                            По многочисленным просьбам мы добавили онлайн-оплату через банковскую карту (эквайринг), чтобы процесс покупки товаров и сервисов стал ещё удобнее и быстрее.
                            <br /><br />
                            Кроме того, мы активно расширяем сеть офлайн-точек по всем велаятам, чтобы у вас было больше возможностей для оплаты рядом с домом.
                            <br /><br />
                            В ближайшее время также планируем запустить оплату через мобильного оператора. Данный способ будет доступен с ограничениями по сумме — подробности сообщим дополнительно.
                            <br /><br />
                            Мы продолжаем работать над улучшением сервиса и благодарим вас за обратную связь и доверие.Следите за обновлениями!
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

export default News33
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
                        <p className="mt-[10px] flex text-white font-medium text-[32px] leading-9">Не нашел свою игру на сайте? Мы добавим ее для тебя!</p>
                    </div>
                    <img src="home/news/4.png" alt="news" className="w-full rounded-3xl" />

                    <div className="mt-[32px] mb-[70px] text-white">
                        <p>
                            Привет, геймер!
                            <br /><br />
                            Часто бывает: заходишь на сайт, чтобы пополнить баланс в любимой игре, а ее нет в списке. Обидно, правда? Мы хотим это исправить, и ты нам в этом поможешь!
                            <br /><br />
                            Наш сайт создан для тебя, и мы хотим, чтобы здесь было всё, что тебе нужно для комфортной игры. Поэтому мы запускаем новую фишку: теперь ты можешь напрямую влиять на то, какие игры и сервисы появятся у нас в будущем.
                            <br />
                            Как это работает? Всё очень просто!
                            <br /><br />
                            <b>Если ты не нашел на нашем сайте нужную игру, сервис или платформу для пополнения:</b>
                            <br /><br />
                            <ul className="list-decimal list-inside">
                                <li>Перейди на нашу специальную форму (ниже) или просто напиши нам на support.unite-gaming@lotta-tm.com</li>
                                <li>Напиши название игры или сервиса , которую ты ищешь.</li>
                                <li>Нажми "Отправить".</li>
                            </ul>
                            <br />
                            Готово! Твой голос учтен.
                            <br /><br /><br />
                            <b>Что будет дальше?</b>
                            <br /><br />
                            Мы будем внимательно следить за всеми вашими заявками. Как только мы увидим, что какую-то игру или сервис просит много людей, мы сразу же начнем работать над ее добавлением на наш сайт!
                            <br /><br />
                            Обо всех новых играх, которые появятся по вашим просьбам, мы будем громко сообщать в наших новостях и соцсетях.
                            <br />
                            Так что, возможно, именно твоя заявка поможет сотням других игроков быстрее и проще совершать покупки.
                            <br />
                            Твой голос реально важен. Именно ты помогаешь нам становиться лучше и удобнее для тысяч других геймеров!
                        </p>

                        <center>
                            <a
                                href="https://forms.gle/YUvG1sbAXQtpMyL27"
                                target="_blank"
                                style={{ background: "linear-gradient(to right, #79109D, #A132C7)" }}
                                className="text-[14px] mt-[33px] w-fit shadow-[0px_4px_0px_#580873] font-bold py-[11.5px] px-8.75 flex items-center justify-center rounded-[10px]"
                            >
                                ОСТАВИТЬ СВОЮ ЗАЯВКУ ЗДЕСЬ
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
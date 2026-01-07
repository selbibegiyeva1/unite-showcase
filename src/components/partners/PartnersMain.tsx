function PartnersMain() {
    return (
        <div className="bg-[#1C1D1D] p-8 rounded-[36px]">
            <b className="text-[32px] pb-6.5 flex text-white">Активные партнеры</b>

            <div className="grid grid-cols-3 gap-8 text-white">
                {Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className="bg-[#282730] px-6 pt-5 pb-8 rounded-3xl">
                        <div className="flex items-center gap-4 justify-between mb-2.5">
                            <b className="text-[24px] w-27.75 flex leading-8">Juwan Tourism</b>
                            <img src="/partner/unnamed.png" style={{ width: 70, borderRadius: 10 }} alt="unnamed" />
                        </div>

                        <div className="flex items-center text-[14px] gap-4 justify-between py-4.5 border-b border-b-[#FFFFFF26]">
                            <b>Город</b>
                            <p className="text-[#FFFFFF99] font-medium">Ашхабад</p>
                        </div>
                        <div className="flex items-center text-[14px] gap-4 justify-between py-4.5 border-b border-b-[#FFFFFF26]">
                            <b>Адрес</b>
                            <p className="text-[#FFFFFF99] font-medium text-right w-41.5">Ул. Чехово, Дом Yasyl Yayla, 18 этаж, 9 кабинет</p>
                        </div>
                        <div className="flex items-center text-[14px] gap-4 justify-between py-4.5">
                            <b>Номер</b>
                            <p className="text-[#FFFFFF99] font-medium">+993 65 45 84 54</p>
                        </div>

                        <button className="uppercase bg-[#79109D] w-full p-[11.5px] rounded-[10px] font-bold text-[14px] mt-6 cursor-pointer">на карте</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PartnersMain
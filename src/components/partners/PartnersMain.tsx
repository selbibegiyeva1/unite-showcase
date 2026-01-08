import type { Partner } from "../../hooks/partners/usePartnersMap"

type PartnersMainProps = {
    partners: Partner[]
    onPartnerSelect?: (partnerId: string) => void
}

function PartnersMain({ partners, onPartnerSelect }: PartnersMainProps) {
    if (partners.length === 0) {
        return (
            <div className="bg-[#1C1D1D] p-8 rounded-[36px]">
                <b className="text-[32px] pb-6.5 flex text-white">Активные партнеры</b>
                <div className="text-center py-10 text-[#969FA8]">Нет доступных партнёров</div>
            </div>
        )
    }

    return (
        <div className="bg-[#1C1D1D] p-8 rounded-[36px]">
            <b className="text-[32px] pb-6.5 flex text-white">Активные партнеры</b>

            <div className="grid grid-cols-3 gap-7.5 text-white max-medium:grid-cols-3 max-medium:gap-4 max-small:grid-cols-1">
                {partners.map((partner) => (
                    <div key={partner.id} className="bg-[#282730] px-6 pt-5 pb-8 rounded-3xl flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-2.5">
                                <b className="text-[24px] w-27.75 flex leading-7">{partner.name}</b>
                                <div className="w-17.5 h-17.5 overflow-hidden rounded-[10px]">
                                    <img
                                        src={partner.logo_url || "/partner/unnamed.png"}
                                        className="w-full h-full object-cover"
                                        alt={partner.name}
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement
                                            target.src = "/partner/unnamed.png"
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center text-[14px] gap-4 justify-between py-4.5 border-b border-b-[#FFFFFF26]">
                                <b>Город</b>
                                <p className="text-[#FFFFFF99] font-medium">{partner.city || "—"}</p>
                            </div>
                            <div className="flex items-center text-[14px] gap-4 justify-between py-4.5 border-b border-b-[#FFFFFF26]">
                                <b>Адрес</b>
                                <p className="text-[#FFFFFF99] font-medium text-right w-41.5">{partner.location_note || partner.city || "—"}</p>
                            </div>
                            <div className="flex items-center text-[14px] gap-4 justify-between py-4.5">
                                <b>Номер</b>
                                <p className="text-[#FFFFFF99] font-medium text-right">{partner.phone_support || "—"}</p>
                            </div>
                        </div>

                        <a
                            href="#map"
                            onClick={() => onPartnerSelect?.(partner.id)}
                            className="uppercase bg-[#79109D] mt-6 w-full p-[11.5px] rounded-[10px] font-bold text-[14px] flex items-center justify-center cursor-pointer hover:bg-[#8a1aad] transition-colors"
                        >
                            на карте
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PartnersMain
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import Map, { type PartnerLocation } from "../components/partners/Map"
import PartnersList from "../components/partners/PartnersList"
import PartnersMain from "../components/partners/PartnersMain"
import NewsBlock from "../components/home/NewsBlock"
import Faq from "../components/home/Faq"
import Footer from "../components/layout/Footer"
import { usePartnersMap } from "../hooks/partners/usePartnersMap"

function Partners() {
    document.title = "Unite Gaming Shop | Partners"

    const { data, isLoading, error } = usePartnersMap()
    const locations: PartnerLocation[] = data?.locations ?? []
    const [selectedId, setSelectedId] = useState<string | null>(null)

    // Update selectedId when data loads
    useEffect(() => {
        if (locations.length > 0 && !selectedId) {
            setSelectedId(locations[0].id)
        }
    }, [locations, selectedId])

    return (
        <div className="px-4" id="map">
            <div className="max-w-255 m-auto">
                <div className="text-[15.67px] font-medium flex items-center gap-3.5">
                    <Link to="/" className="flex items-center gap-1 w-fit text-[#969FA8]">
                        <img src="/partner/grid.png" alt="grid" style={{ width: 24 }} />
                        <span>Главная</span>
                        <img src="partner/arrow.png" alt="arrow" style={{ width: 24 }} />
                    </Link>
                    <p className="text-white">Как пополнить баланс?</p>
                </div>

                <b className="text-[32px] py-8 flex text-white">Пополнение через партнёров</b>

                {isLoading ? (
                    <div className="text-white text-center py-10">Загрузка партнёров...</div>
                ) : error ? (
                    <div className="text-red-400 text-center py-10">
                        Ошибка загрузки партнёров: {error instanceof Error ? error.message : "Неизвестная ошибка"}
                    </div>
                ) : (
                    <>
                        <div className="flex gap-8 pb-10">
                            <Map locations={locations} selectedId={selectedId} onSelect={setSelectedId} />
                            <PartnersList locations={locations} selectedId={selectedId} onSelect={setSelectedId} />
                        </div>

                        <div className="pb-15">
                            <PartnersMain 
                                partners={data?.partners ?? []} 
                                onPartnerSelect={setSelectedId}
                            />
                        </div>
                    </>
                )}

                <div className="pb-15 text-white">
                    <NewsBlock />
                </div>

                <div className="pb-46 text-white">
                    <Faq />
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Partners

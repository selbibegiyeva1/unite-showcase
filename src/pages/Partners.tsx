import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useTranslations } from "../translations"

import Map, { type PartnerLocation } from "../components/partners/Map"
import PartnersList from "../components/partners/PartnersList"
import PartnersMain from "../components/partners/PartnersMain"
import NewsBlock from "../components/home/NewsBlock"
import Faq from "../components/home/Faq"
import Footer from "../components/layout/Footer"
import { usePartnersMap } from "../hooks/partners/usePartnersMap"

function Partners() {
    document.title = "Unite Gaming Shop | Partners"
    const t = useTranslations()

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
        <div id="map">
            <div className="max-w-255 m-auto px-4 max-lg:px-[64px] max-lg:m-0 product">
                <div className="text-[15.67px] font-medium flex items-center gap-3.5">
                    <Link to="/" className="flex items-center gap-1 w-fit text-[#969FA8]">
                        <img src="/partner/grid.png" alt="grid" style={{ width: 24 }} />
                        <span>{t.partners.home}</span>
                        <img src="partner/arrow.png" alt="arrow" style={{ width: 24 }} />
                    </Link>
                    <p className="text-white">{t.partners.howToTopUp}</p>
                </div>

                <b className="text-[32px] py-8 flex text-white partner-h">{t.partners.topUpThroughPartners}</b>

                {isLoading ? (
                    <div className="text-white text-center py-10">{t.partners.loadingPartners}</div>
                ) : error ? (
                    <div className="text-red-400 text-center py-10">
                        {t.partners.errorLoadingPartners}{error instanceof Error ? error.message : t.partners.unknownError}
                    </div>
                ) : (
                    <>
                        <div className="flex gap-8 pb-10 max-medium:grid max-medium:grid-cols-2 max-small:grid-cols-1">
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

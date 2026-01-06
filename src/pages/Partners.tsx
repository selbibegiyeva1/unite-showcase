import { useState } from "react"
import { Link } from "react-router-dom"

import Map, { type PartnerLocation } from "../components/partners/Map"
import PartnersList from "../components/partners/PartnersList"
import PartnersMain from "../components/partners/PartnersMain"
import News from "../components/home/News"
import Faq from "../components/home/Faq"
import Footer from "../components/layout/Footer"

const MOCK_LOCATIONS: PartnerLocation[] = [
    {
        id: "p1",
        name: "Juwan Tourism",
        address: "Ashgabat, Magtymguly Ave 123",
        lat: 37.9601,
        lng: 58.3261,
    },
    {
        id: "p2",
        name: "DN Tours",
        address: "Ashgabat, Bitarap Türkmenistan St 45",
        lat: 37.9439,
        lng: 58.3782,
    },
    {
        id: "p3",
        name: "KK Tours",
        address: "Ashgabat, Atamurat Niyazov Ave 9",
        lat: 37.9353,
        lng: 58.3899,
    },
    {
        id: "p4",
        name: "Kemal Turizm",
        address: "Ashgabat, Turkmenbashi Ave 77",
        lat: 37.9835,
        lng: 58.3569,
    },
    {
        id: "p5",
        name: "Downtown Partner",
        address: "Ashgabat, Kopetdag District",
        lat: 37.9132,
        lng: 58.3446,
    },
    {
        id: "p6",
        name: "North Partner",
        address: "Ashgabat, near Hayat Market",
        lat: 38.0029,
        lng: 58.3225,
    },
]

function Partners() {
    document.title = "Unite Gaming Shop | Partners"

    const [selectedId, setSelectedId] = useState<string | null>(MOCK_LOCATIONS[0]?.id ?? null)

    return (
        <div className="px-4">
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

                <div className="flex gap-8 pb-10">
                    <Map locations={MOCK_LOCATIONS} selectedId={selectedId} onSelect={setSelectedId} />
                    <PartnersList locations={MOCK_LOCATIONS} selectedId={selectedId} onSelect={setSelectedId} />
                </div>

                <div className="pb-15">
                    <PartnersMain />
                </div>

                <div className="pb-15 text-white">
                    <News />
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

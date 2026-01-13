import { useEffect, useMemo, useRef, useState } from "react"
import { useTranslations } from "../../translations"
import type { PartnerLocation } from "./Map"

type PartnersListProps = {
    locations: PartnerLocation[]
    selectedId: string | null
    onSelect: (id: string | null) => void
}

function PartnersList({ locations, selectedId, onSelect }: PartnersListProps) {
    const t = useTranslations()
    const [query, setQuery] = useState("")
    const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({})

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return locations
        return locations.filter((l) => {
            return (
                l.name.toLowerCase().includes(q) ||
                l.address.toLowerCase().includes(q)
            )
        })
    }, [locations, query])

    useEffect(() => {
        if (!selectedId) return
        const el = itemRefs.current[selectedId]
        el?.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }, [selectedId])

    return (
        <div className="p-6 w-100 bg-[#1D2023] rounded-[28.8px] text-white max-medium:w-full">
            <b className="text-[24px] nap-h">{t.partners.allPartners}</b>

            <div className="mt-5 flex items-center gap-2.5 px-5 rounded-[14px] bg-[#282730]">
                <img src="/partner/search.png" alt="search" style={{ width: 24 }} loading="lazy" />
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t.partners.searchPartners}
                    className="w-full outline-none text-white py-3.75 text-[16px]"
                />
            </div>

            <div className="mt-3.5 h-60 overflow-y-auto scrollbar-partners pr-4">
                {filtered.length === 0 ? (
                    <div className="text-[#969FA8] py-6 text-center">{t.partners.nothingFound}</div>
                ) : (
                    <div className="flex flex-col">
                        {filtered.map((loc) => {
                            const active = loc.id === selectedId
                            return (
                                <button
                                    key={loc.id}
                                    ref={(el) => {
                                        itemRefs.current[loc.id] = el
                                    }}
                                    onClick={() => onSelect(loc.id)}
                                    className={[
                                        "w-full text-left py-[13px] px-3.5 rounded-[10px] transition cursor-pointer",
                                        "border border-transparent hover:bg-white/5",
                                        active ? "bg-white/8 border-white/10" : "bg-transparent",
                                    ].join(" ")}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="min-w-0">
                                            <div className="font-bold flex items-center gap-2.5">
                                                {loc.logo_url && (
                                                    <img
                                                        src={loc.logo_url}
                                                        alt={loc.name}
                                                        className="w-10 h-10 object-cover rounded"
                                                        loading="lazy"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement
                                                            target.style.display = "none"
                                                        }}
                                                    />
                                                )}
                                                <p>{loc.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PartnersList

import { useEffect, useMemo, useState } from "react"
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api"

export type PartnerLocation = {
    id: string
    name: string
    address: string
    lat: number
    lng: number
    logo_url?: string
}

type MapProps = {
    locations: PartnerLocation[]
    selectedId: string | null
    onSelect: (id: string | null) => void
}

function Map({ locations, selectedId, onSelect }: MapProps) {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined

    const { isLoaded, loadError } = useJsApiLoader({
        id: "unite-google-maps",
        googleMapsApiKey: apiKey ?? "",
    })

    const [map, setMap] = useState<google.maps.Map | null>(null)

    const selected = useMemo(
        () => locations.find((l) => l.id === selectedId) ?? null,
        [locations, selectedId]
    )

    const defaultCenter = useMemo(() => {
        if (selected) return { lat: selected.lat, lng: selected.lng }
        if (locations[0]) return { lat: locations[0].lat, lng: locations[0].lng }
        return { lat: 37.0902, lng: -95.7129 }
    }, [locations, selected])

    useEffect(() => {
        if (!map || !selected) return
        map.panTo({ lat: selected.lat, lng: selected.lng })
        map.setZoom(14)
    }, [map, selected])

    return (
        <div className="p-6 w-147 bg-[#1D2023] rounded-[28.8px] text-white">
            <b className="text-[24px]">Пополни баланс у ближайшего партнера</b>

            <div className="mt-8.25 rounded-[18px] overflow-hidden border border-white/5 bg-black/20">
                {!apiKey ? (
                    <div className="h-85 flex items-center justify-center text-[#969FA8] px-6 text-center">
                        Не удалось загрузить ключ API!
                    </div>
                ) : loadError ? (
                    <div className="h-85 flex items-center justify-center text-[#969FA8] px-6 text-center">
                        Не удалось загрузить Google Maps!
                    </div>
                ) : !isLoaded ? (
                    <div className="h-85 flex items-center justify-center text-[#969FA8]">
                        Загрузка...
                    </div>
                ) : (
                    <div>
                        <GoogleMap
                            mapContainerStyle={{ width: "100%", height: 316 }}
                            center={defaultCenter}
                            zoom={12}
                            onLoad={(m) => setMap(m)}
                            onUnmount={() => setMap(null)}
                            options={{
                                disableDefaultUI: true,
                                zoomControl: true,
                                clickableIcons: false,
                            }}
                        >
                            {locations.map((loc) => (
                                <MarkerF
                                    key={loc.id}
                                    position={{ lat: loc.lat, lng: loc.lng }}
                                    onClick={() => onSelect(loc.id)}
                                    options={{
                                        zIndex: loc.id === selectedId ? 999 : 1,
                                    }}
                                />
                            ))}
                        </GoogleMap>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Map

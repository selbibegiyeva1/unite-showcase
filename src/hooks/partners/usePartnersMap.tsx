import { useQuery } from "@tanstack/react-query";
import type { PartnerLocation } from "../../components/partners/Map";

export type PartnerMapData = {
    name: string;
    phone_support: string;
    logo_url: string;
    city: string;
    latitude: string;
    longitude: string;
    location_note: string;
    show_on_map: boolean;
};

export type Partner = PartnerMapData & {
    id: string;
};

type PartnersMapResponse = {
    locations: PartnerLocation[];
    partners: Partner[];
};

async function fetchPartnersMap(): Promise<PartnersMapResponse> {
    const API_HOST = import.meta.env.VITE_API_HOST as string | undefined;
    const BEARER = import.meta.env.VITE_PARTNER_BEARER as string | undefined;

    if (!API_HOST) throw new Error("Missing API host");
    if (!BEARER) throw new Error("Missing token");

    const url = `${API_HOST}/v1/partners/map`;

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${BEARER}`,
            Accept: "application/json",
        },
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Failed to load partners map (${res.status}). ${text}`);
    }

    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("Unexpected response: expected an array");

    const filtered = data.filter((x: PartnerMapData) => x.show_on_map === true);

    const locations: PartnerLocation[] = filtered
        .map((x: PartnerMapData, index: number): PartnerLocation | null => {
            const lat = parseFloat(x?.latitude ?? "0");
            const lng = parseFloat(x?.longitude ?? "0");
            if (!x.name || isNaN(lat) || isNaN(lng)) return null;
            return {
                id: `partner-${index}-${x.name}`,
                name: String(x.name),
                address: String(x?.location_note ?? x?.city ?? ""),
                lat,
                lng,
                logo_url: x?.logo_url,
            };
        })
        .filter((x): x is PartnerLocation => x !== null);

    const partners: Partner[] = filtered.map((x: PartnerMapData, index: number): Partner => ({
        ...x,
        id: `partner-${index}-${x.name}`,
    }));

    return { locations, partners };
}

export function usePartnersMap() {
    return useQuery({
        queryKey: ["partners-map"],
        queryFn: fetchPartnersMap,
    });
}

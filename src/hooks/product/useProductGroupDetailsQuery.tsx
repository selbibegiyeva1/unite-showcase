import { useQuery } from "@tanstack/react-query";
import type { ProductGroupCategory } from "../home/useProductGroupsQuery";

export type ProductGroupDetails = {
    image: string;
    icon: string;
    group: string;
    category: ProductGroupCategory;
    short_info: string;
    forms: unknown;
};

async function fetchProductGroupDetails(group: string): Promise<ProductGroupDetails> {
    const API_HOST = import.meta.env.VITE_API_HOST as string | undefined;
    const BEARER = import.meta.env.VITE_PARTNER_BEARER as string | undefined;

    if (!API_HOST) throw new Error("Missing API host");
    if (!BEARER) throw new Error("Missing token");
    if (!group) throw new Error("Missing group");

    const url = `${API_HOST}/v1/partner/catalog/product/group/form?group=${encodeURIComponent(group)}`;

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${BEARER}`,
            Accept: "application/json",
        },
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Failed to load product group details (${res.status}). ${text}`);
    }

    const x = await res.json();

    return {
        image: String(x?.image ?? ""),
        icon: String(x?.icon ?? ""),
        group: String(x?.group ?? group),
        category: x?.category === "business" ? "business" : "games",
        short_info: String(x?.short_info ?? ""),
        forms: x?.forms,
    };
}

export function useProductGroupDetailsQuery(group: string | null) {
    return useQuery({
        queryKey: ["product-group-details", group],
        queryFn: () => fetchProductGroupDetails(group as string),
        enabled: Boolean(group),
    });
}

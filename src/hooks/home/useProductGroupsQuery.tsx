import { useQuery } from "@tanstack/react-query";

export type ProductGroupCategory = "games" | "business";

export type ProductGroup = {
    group_name: string;
    category: ProductGroupCategory;
    icon_url: string;
};

async function fetchAllProductGroups(): Promise<ProductGroup[]> {
    const API_HOST = import.meta.env.VITE_API_HOST as string | undefined;
    const BEARER = import.meta.env.VITE_PARTNER_BEARER as string | undefined;

    if (!API_HOST) throw new Error("Missing API host");
    if (!BEARER) throw new Error("Missing token");

    const url = `${API_HOST}/v1/partner/catalog/product/groups`;

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${BEARER}`,
            Accept: "application/json",
        },
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Failed to load product groups (${res.status}). ${text}`);
    }

    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("Unexpected response: expected an array");

    return data
        .map((x: any): ProductGroup => ({
            group_name: String(x?.group_name ?? ""),
            category: x?.category === "business" ? "business" : "games",
            icon_url: String(x?.icon_url ?? ""),
        }))
        .filter((x): x is ProductGroup => Boolean(x.group_name && x.icon_url));
}

export function useProductGroupsQuery() {
    return useQuery({
        queryKey: ["product-groups"],
        queryFn: fetchAllProductGroups,
    });
}

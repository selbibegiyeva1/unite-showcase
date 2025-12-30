import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ProductGroupCategory } from "../home/useProductGroupsQuery";

export type TopUpMode = "topup" | "voucher";

export type FormFieldOption = {
    name: string;
    value: string | number;
    product?: string;
    price?: number;
    region?: string;
    name_prefix?: string;
    type?: string;
};

export type FormField = {
    name: string;
    type: "text" | "options" | string;
    label: string;
    options?: FormFieldOption[];
};

export type ProductGroupForms = {
    voucher_fields: FormField[];
    topup_fields: FormField[];
};

export type ProductGroupDetails = {
    image: string;
    icon: string;
    group: string;
    category: ProductGroupCategory;
    short_info: string;
    forms: ProductGroupForms;
};

export type RateResponse = { amount_tmt: number; topup_amount_usd: number };

function asArray<T>(v: unknown): T[] {
    return Array.isArray(v) ? (v as T[]) : [];
}

function toNumberOrUndef(v: any): number | undefined {
    if (typeof v === "number" && Number.isFinite(v)) return v;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
}

function normalizeField(raw: any): FormField | null {
    if (!raw || typeof raw !== "object") return null;

    const name = String(raw.name ?? "");
    const type = String(raw.type ?? "");
    const label = String(raw.label ?? "");

    if (!name || !type || !label) return null;

    const options = asArray<any>(raw.options).map((o) => ({
        name: String(o?.name ?? o?.product ?? ""),
        value: (o?.value ?? "") as string | number,
        product: o?.product != null ? String(o.product) : undefined,
        price: toNumberOrUndef(o?.price),
        region: o?.region != null ? String(o.region) : undefined,
        name_prefix: o?.name_prefix != null ? String(o.name_prefix) : undefined,
        type: o?.type != null ? String(o.type) : undefined,
    }));

    return {
        name,
        type: type as FormField["type"],
        label,
        ...(options.length ? { options } : {}),
    };
}

function normalizeForms(rawForms: any): ProductGroupForms {
    const voucher_fields = asArray<any>(rawForms?.voucher_fields)
        .map(normalizeField)
        .filter(Boolean) as FormField[];

    const topup_fields = asArray<any>(rawForms?.topup_fields)
        .map(normalizeField)
        .filter(Boolean) as FormField[];

    return { voucher_fields, topup_fields };
}

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
        forms: normalizeForms(x?.forms),
    };
}

async function fetchRate(amountTmt: number): Promise<RateResponse> {
    const API_HOST = import.meta.env.VITE_API_HOST as string | undefined;
    const BEARER = import.meta.env.VITE_PARTNER_BEARER as string | undefined;

    if (!API_HOST) throw new Error("Missing API host");
    if (!BEARER) throw new Error("Missing token");

    const url = `${API_HOST}/v1/partner/steam/rate?amount_tmt=${encodeURIComponent(String(amountTmt))}`;

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${BEARER}`,
            Accept: "application/json",
        },
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Rate failed (${res.status}). ${text}`);
    }

    return res.json();
}

type Params = {
    mode?: TopUpMode;
    productId?: string | number | null;
};

export function useProductGroupDetailsQuery(group: string | null, params?: Params) {
    const detailsQuery = useQuery({
        queryKey: ["product-group-details", group],
        queryFn: () => fetchProductGroupDetails(group as string),
        enabled: Boolean(group),
    });

    const amountTmt = useMemo(() => {
        const data = detailsQuery.data;
        if (!data) return null;

        const mode = params?.mode;
        const productId = params?.productId;
        if (!mode || productId == null) return null;

        if (data.group === "Steam" && mode === "topup") {
            const v = Number(productId);
            return Number.isFinite(v) ? v : null;
        }

        const fields = mode === "voucher" ? data.forms.voucher_fields : data.forms.topup_fields;
        const productField = fields.find((f) => f.name === "product_id");
        const opt = productField?.options?.find((o) => String(o.value) === String(productId));
        return typeof opt?.price === "number" ? opt.price : null;
    }, [detailsQuery.data, params?.mode, params?.productId]);

    const rateQuery = useQuery({
        queryKey: ["rate", amountTmt],
        queryFn: () => fetchRate(amountTmt as number),
        enabled: typeof amountTmt === "number" && Number.isFinite(amountTmt) && amountTmt > 0,
        staleTime: 60_000,
    });

    return {
        ...detailsQuery,
        amountTmt,
        rateQuery,
    };
}

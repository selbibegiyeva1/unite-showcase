import type { FormField } from "../hooks/product/useProductGroupDetailsQuery";

export type TopUpMode = "topup" | "voucher";

export type AcquiringPaymentResponse = {
    status: boolean;
    payment_url?: string;
    comment?: string;
};

function env() {
    const API_HOST = import.meta.env.VITE_API_HOST as string | undefined;
    const BEARER = import.meta.env.VITE_PARTNER_BEARER as string | undefined;

    if (!API_HOST) throw new Error("Missing API host");
    if (!BEARER) throw new Error("Missing token");

    return { API_HOST, BEARER };
}

function resolvePath(groupName: string, mode: TopUpMode) {
    if (groupName === "Steam" && mode === "topup") return "/v1/products/steam/pay/acquiring";
    if (mode === "voucher") return "/v1/products/voucher/pay/acquiring";
    return "/v1/products/topup/pay/acquiring";
}

function toNumberIfNumeric(v: any) {
    if (typeof v === "number" && Number.isFinite(v)) return v;
    const n = Number(v);
    return Number.isFinite(n) ? n : v;
}

function buildPayload(args: {
    groupName: string;
    mode: TopUpMode;
    fields: FormField[];
    values: Record<string, any>;
    amountTmt: number | null;
}) {
    const { groupName, mode, fields, values, amountTmt } = args;

    if (groupName === "Steam" && mode === "topup") {
        const amount = Number(values.product_id ?? amountTmt ?? 0);

        return {
            steam_username: String(values.steam_username ?? ""),
            amount_tmt: Number.isFinite(amount) ? amount : 0,
            email: String(values.email ?? ""),
            bank: String(values.bank ?? ""),
        };
    }

    const payload: Record<string, any> = {};

    const region = values.region_value ?? values.region_label ?? values.region;
    if (region != null && region !== "") payload.region = String(region);

    if (values.product_id != null) payload.product_id = toNumberIfNumeric(values.product_id);

    for (const f of fields) {
        const v = values[f.name];
        if (v === undefined) continue;
        payload[f.name] = toNumberIfNumeric(v);
    }

    payload.bank = String(values.bank ?? "");

    return payload;
}

export async function createAcquiringPayment(args: {
    groupName: string;
    mode: TopUpMode;
    fields: FormField[];
    values: Record<string, any>;
    amountTmt: number | null;
}): Promise<AcquiringPaymentResponse> {
    const { API_HOST, BEARER } = env();
    const url = `${API_HOST}${resolvePath(args.groupName, args.mode)}`;

    const res = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${BEARER}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(buildPayload(args)),
    });

    const json = (await res.json().catch(() => null)) as AcquiringPaymentResponse | null;

    if (!res.ok) {
        const msg =
            (json && (json.comment || JSON.stringify(json))) ||
            (await res.text().catch(() => "")) ||
            `HTTP ${res.status}`;
        throw new Error(msg);
    }

    if (!json?.status) throw new Error(json?.comment || "Payment creation failed");

    return json;
}

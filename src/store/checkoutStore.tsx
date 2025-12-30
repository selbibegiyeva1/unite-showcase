import { create } from "zustand";
import type { FormField } from "../hooks/product/useProductGroupDetailsQuery";
import { createAcquiringPayment, type TopUpMode } from "../api/payments";

type Values = Record<string, any>;
type SetValuesArg = Values | ((prev: Values) => Values);

type CheckoutStore = {
    groupName: string | null;

    mode: TopUpMode;
    values: Values;

    banksOpen: boolean;
    paying: boolean;
    payError: string;

    ensureGroup: (groupName: string) => void;

    setMode: (mode: TopUpMode) => void;
    setValues: (arg: SetValuesArg) => void;

    openBanks: () => void;
    closeBanks: () => void;
    selectBank: (bank: string) => void;

    clearPayError: () => void;

    submitPayment: (args: {
        groupName: string;
        fields: FormField[];
        amountTmt: number | null;
    }) => Promise<void>;
};

const baseValues = (keepBank?: any): Values => ({
    region_value: "",
    region_label: "",
    product_id: null,
    confirmed: false,
    bank: keepBank ?? null,
});

export const useCheckoutStore = create<CheckoutStore>((set, get) => ({
    groupName: null,

    mode: "topup",
    values: baseValues(),

    banksOpen: false,
    paying: false,
    payError: "",

    ensureGroup: (groupName) => {
        const current = get().groupName;
        if (current === groupName) return;

        const keepBank = get().values.bank;

        set({
            groupName,
            mode: "topup",
            values: baseValues(keepBank),
            banksOpen: false,
            paying: false,
            payError: "",
        });
    },

    setMode: (mode) => set({ mode }),

    setValues: (arg) =>
        set((state) => {
            const next = typeof arg === "function" ? arg(state.values) : { ...state.values, ...arg };
            return { values: next };
        }),

    openBanks: () => set({ banksOpen: true }),
    closeBanks: () => set({ banksOpen: false }),

    selectBank: (bank) =>
        set((state) => ({
            values: { ...state.values, bank },
            banksOpen: false,
        })),

    clearPayError: () => set({ payError: "" }),

    submitPayment: async ({ groupName, fields, amountTmt }) => {
        const { paying, mode, values } = get();
        if (paying) return;

        set({ paying: true, payError: "" });

        try {
            const resp = await createAcquiringPayment({
                groupName,
                mode,
                fields,
                values,
                amountTmt,
            });

            if (!resp.payment_url) throw new Error(resp.comment || "No payment_url returned");

            window.location.assign(resp.payment_url);
        } catch (e: any) {
            set({ paying: false, payError: String(e?.message ?? "Payment error") });
        }
    },
}));

import React, { useEffect, useMemo } from "react";
import type { ProductGroupForms, FormFieldOption } from "../../hooks/product/useProductGroupDetailsQuery";
import RegionSelect from "./RegionSelect";

export type TopUpMode = "topup" | "voucher";

type Props = {
    groupName: string;
    forms: ProductGroupForms;

    mode: TopUpMode;
    setMode: (m: TopUpMode) => void;

    values: Record<string, any>;
    setValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
};

const STEAM_TOPUP_NOMINALS_TMT = [20, 40, 100, 150, 200, 500, 1000];

function FormOne({ groupName, forms, mode, setMode, values, setValues }: Props) {
    const voucherAvailable = (forms?.voucher_fields?.length ?? 0) > 0;
    const topupAvailable = (forms?.topup_fields?.length ?? 0) > 0;

    const showModeSwitch = voucherAvailable && topupAvailable;

    const isSteamTopup = groupName === "Steam" && mode === "topup";

    const fields = mode === "voucher" ? forms.voucher_fields : forms.topup_fields;

    const regionField = fields.find((f) => f.name === "region");
    const productField = fields.find((f) => f.name === "product_id");

    const productOptions: FormFieldOption[] = (productField?.options ?? []).filter(
        (o) => o && o.value !== undefined && o.value !== null
    );

    const selectedRegionValue = String(values.region_value ?? "");
    const selectedRegionLabel = String(values.region_label ?? "");

    const nominals = useMemo(() => {
        if (isSteamTopup) {
            return STEAM_TOPUP_NOMINALS_TMT.map((amt) => ({
                value: amt,
                product: `${amt} TMT`,
                price: amt,
                region: "Любой",
                type: "TOPUP",
            })) as FormFieldOption[];
        }

        if (!productOptions.length) return [];

        // Check if all products have region "Любой" (Any) - special case
        const allHaveAnyRegion = productOptions.every(
            (o) => String(o.region ?? "").trim() === "Любой" || String(o.region ?? "").trim() === "Any"
        );
        
        // If all products have "Любой" region, show them all regardless of selected region
        if (allHaveAnyRegion && productOptions.length > 0) {
            return productOptions;
        }

        if (selectedRegionLabel) {
            const byLabel = productOptions.filter((o) => String(o.region ?? "") === selectedRegionLabel);
            if (byLabel.length) return byLabel;
        }

        if (selectedRegionValue) {
            const byValue = productOptions.filter((o) => String(o.region ?? "") === selectedRegionValue);
            if (byValue.length) return byValue;
        }

        return [];
    }, [isSteamTopup, productOptions, selectedRegionLabel, selectedRegionValue]);

    useEffect(() => {
        if (!nominals.length) return;

        const active = values.product_id;
        const exists = nominals.some((n) => n.value === active);
        if (exists) return;

        setValues((prev) => ({
            ...prev,
            product_id: nominals[0].value,
        }));
    }, [nominals, values.product_id, setValues]);

    const isVoucherActive = mode === "voucher";

    return (
        <div className="flex flex-col gap-8 p-8 bg-[#1D1D22] rounded-4xl w-full">
            {showModeSwitch ? (
                <div className="flex flex-col gap-4">
                    <b className="text-[24px]">Выберите способо пополнения</b>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                setMode("topup");
                                setValues((prev) => ({
                                    ...prev,
                                    region_value: "",
                                    region_label: "",
                                    product_id: null,
                                }));
                            }}
                            className={`
                                cursor-pointer px-6 py-[11.5px] rounded-[10px] text-[14px] font-bold transition-all duration-200
                                ${mode === "topup" ? "bg-[#79109D] text-white" : "bg-[#2F2F33] text-white/60"}
                            `}
                        >
                            Пополнение
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setMode("voucher");
                                setValues((prev) => ({
                                    ...prev,
                                    region_value: "",
                                    region_label: "",
                                    product_id: null,
                                }));
                            }}
                            className={`
                                cursor-pointer px-6 py-[11.5px] rounded-[10px] text-[14px] font-bold transition-all duration-200
                                relative flex items-center gap-2
                                ${isVoucherActive ? "bg-[#79109D] text-white" : "bg-[#2F2F33] text-white/60"}
                            `}
                        >
                            Ваучер

                            <img
                                src="/product/voucher.png"
                                alt="voucher"
                                className={`w-5 ${isVoucherActive ? "peer" : ""} ${!isVoucherActive ? "opacity-60" : ""}`}
                            />

                            <p
                                className={`
                                    bg-[#2F2F36] p-4 w-72.5 text-left rounded-2xl text-[14px] font-medium
                                    absolute top-0 left-35 z-10
                                    ${isVoucherActive
                                        ? `
                                                opacity-0 translate-y-1 pointer-events-none
                                                transition-all duration-150
                                                peer-hover:opacity-100 peer-hover:translate-y-0 peer-hover:pointer-events-auto
                                            `
                                        : `opacity-0 pointer-events-none`
                                    }
                                `}
                            >
                                Ваучер - уникальная комбинация из цифр и букв. У ваучера есть денежный номинал, который зачисляется на
                                игровой кошелёк при активации.
                            </p>
                        </button>
                    </div>
                </div>
            ) : null}

            <RegionSelect
                mode={mode}
                regionOptions={regionField?.options}
                productOptions={productOptions}
                values={values}
                setValues={setValues}
            />

            {nominals.length ? (
                <div className="flex flex-col gap-4">
                    <b className="text-[24px]">Выберите номинал</b>

                    <div className="flex gap-3 flex-wrap">
                        {nominals.map((n) => {
                            const isActive = n.value === values.product_id;
                            const label = n.product ?? String(n.value);

                            return (
                                <button
                                    key={String(n.value)}
                                    type="button"
                                    onClick={() => setValues((prev) => ({ ...prev, product_id: n.value }))}
                                    className={`
                                        cursor-pointer px-6 py-[11.5px] rounded-[10px] text-[14px] font-bold transition-all duration-200
                                        ${isActive ? "bg-[#79109D] hover:bg-[#8a1aad] transition-colors text-white" : "bg-[#2F2F33] text-white/60"}
                                    `}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default FormOne;

import React, { useEffect, useMemo } from "react";
import type { ProductGroupForms, FormFieldOption } from "../../hooks/product/useProductGroupDetailsQuery";

export type TopUpMode = "topup" | "voucher";

type Props = {
    forms: ProductGroupForms;

    mode: TopUpMode;
    setMode: (m: TopUpMode) => void;

    values: Record<string, any>;
    setValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
};

type RegionItem = { label: string; value: string };

function uniqBy<T>(arr: T[], keyFn: (x: T) => string) {
    const seen = new Set<string>();
    const out: T[] = [];
    for (const a of arr) {
        const k = keyFn(a);
        if (!k || seen.has(k)) continue;
        seen.add(k);
        out.push(a);
    }
    return out;
}

function FormOne({ forms, mode, setMode, values, setValues }: Props) {
    const voucherAvailable = (forms?.voucher_fields?.length ?? 0) > 0;
    const topupAvailable = (forms?.topup_fields?.length ?? 0) > 0;

    const showModeSwitch = voucherAvailable && topupAvailable;

    const fields = mode === "voucher" ? forms.voucher_fields : forms.topup_fields;

    const regionField = fields.find((f) => f.name === "region");
    const productField = fields.find((f) => f.name === "product_id");

    const productOptions: FormFieldOption[] = (productField?.options ?? []).filter(
        (o) => o && o.value !== undefined && o.value !== null
    );

    const selectedRegionValue = String(values.region_value ?? "");
    const selectedRegionLabel = String(values.region_label ?? "");

    const regions: RegionItem[] = useMemo(() => {
        if (regionField?.options?.length) {
            return regionField.options.map((o) => ({
                label: String(o.name),
                value: String(o.value),
            }));
        }

        const derived = uniqBy(
            productOptions
                .map((o) => String(o.region ?? ""))
                .filter(Boolean)
                .map((r) => ({ label: r, value: r })), 
            (x) => x.value
        );

        return derived;
    }, [regionField?.options, productOptions]);

    useEffect(() => {
        if (!regions.length) return;

        const matchByValue = regions.find((r) => r.value === selectedRegionValue);
        const matchByLabel = regions.find((r) => r.label === selectedRegionLabel);

        const next = matchByValue ?? matchByLabel ?? regions[0];

        const valueValid = Boolean(matchByValue);
        const labelValid = Boolean(matchByLabel);

        if (!selectedRegionValue || !selectedRegionLabel || !valueValid || !labelValid) {
            setValues((prev) => ({
                ...prev,
                region_value: next.value,
                region_label: next.label,
                product_id: null,
            }));
        }
    }, [mode, regions]);

    const nominals = useMemo(() => {
        if (!productOptions.length) return [];

        if (selectedRegionLabel) {
            const byLabel = productOptions.filter((o) => String(o.region ?? "") === selectedRegionLabel);
            if (byLabel.length) return byLabel;
        }

        if (selectedRegionValue) {
            const byValue = productOptions.filter((o) => String(o.region ?? "") === selectedRegionValue);
            if (byValue.length) return byValue;
        }

        return [];
    }, [productOptions, selectedRegionLabel, selectedRegionValue]);

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

    const selectValue = useMemo(() => {
        if (!regions.length) return "";
        const match = regions.find((r) => r.value === selectedRegionValue);
        return match ? match.value : regions[0].value;
    }, [regions, selectedRegionValue]);

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
                                    bg-[#2F2F36] p-4 w-72.5
                                    text-left rounded-2xl text-[14px] font-medium
                                    absolute top-0 left-35 z-10
                                    ${isVoucherActive
                                        ? `
                                        opacity-0 translate-y-1 pointer-events-none
                                        transition-all duration-150
                                        peer-hover:opacity-100 peer-hover:translate-y-0 peer-hover:pointer-events-auto
                                    `
                                        : `
                                        opacity-0 pointer-events-none
                                    `
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

            {regions.length ? (
                <div className="flex flex-col gap-4">
                    <b className="text-[24px]">Выберите регион</b>

                    <div className="border border-[#FFFFFF1A] rounded-2xl relative">
                        <select
                            value={selectValue}
                            onChange={(e) => {
                                const next = regions.find((r) => r.value === e.target.value) ?? regions[0];
                                setValues((prev) => ({
                                    ...prev,
                                    region_value: next.value,
                                    region_label: next.label,
                                    product_id: null,
                                }));
                            }}
                            className="w-full bg-[#1D1D22] appearance-none text-[14px] cursor-pointer rounded-2xl outline-0 font-medium px-4 py-3.5"
                        >
                            {regions.map((r) => (
                                <option key={r.value} value={r.value}>
                                    {r.label}
                                </option>
                            ))}
                        </select>

                        <img
                            src="/product/arrow-down-simple.png"
                            alt="arrow-down-simple"
                            className="absolute top-1/2 right-4 -translate-y-1/2 w-4 pointer-events-none"
                        />
                    </div>
                </div>
            ) : null}

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
                                        ${isActive ? "bg-[#79109D] text-white" : "bg-[#2F2F33] text-white/60"}
                                    `}
                                    title={n.name_prefix ?? ""}
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

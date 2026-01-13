import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "../../translations";
import type { FormFieldOption } from "../../hooks/product/useProductGroupDetailsQuery";

type TopUpMode = "topup" | "voucher";

type RegionItem = { label: string; value: string };

type Props = {
    mode: TopUpMode;
    regionOptions?: FormFieldOption[];
    productOptions: FormFieldOption[];
    values: Record<string, any>;
    setValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
};

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

const FLAG_BASE_DIRS = ["/product/flags/"];

const FALLBACK_FLAG_SRC = "/product/flags/Earth.webp";

function uniqStrings(arr: string[]) {
    const seen = new Set<string>();
    return arr.filter((x) => (x && !seen.has(x) ? (seen.add(x), true) : false));
}

function camelToKebab(s: string) {
    return s.replace(/([a-z])([A-Z])/g, "$1-$2");
}

function fileUrl(base: string, filename: string) {
    return `${base}${encodeURIComponent(filename)}.png`;
}

function buildFlagCandidates(region: RegionItem) {
    const labelRaw = String(region.label ?? "").trim();
    const valueRaw = String(region.value ?? "").trim();

    const valueLower = valueRaw.toLowerCase();
    const valueKebab = camelToKebab(valueRaw);
    const valueKebabLower = valueKebab.toLowerCase();

    const aliases: Record<string, string[]> = {

    };

    const names = uniqStrings([
        labelRaw,
        ...(aliases[labelRaw] ?? []),

        valueRaw,
        valueLower,
        valueKebab,
        valueKebabLower,
    ]).filter(Boolean);

    const paths: string[] = [];
    for (const base of FLAG_BASE_DIRS) {
        for (const n of names) paths.push(fileUrl(base, n));
    }

    paths.push(FALLBACK_FLAG_SRC);
    return paths;
}

function FlagImg({ region, className }: { region: RegionItem; className?: string }) {
    const candidates = useMemo(() => buildFlagCandidates(region), [region.label, region.value]);
    const [idx, setIdx] = useState(0);

    useEffect(() => setIdx(0), [region.label, region.value]);

    const src = candidates[idx] ?? FALLBACK_FLAG_SRC;

    return (
        <img
            src={src}
            alt={region.label}
            className={className}
            loading="lazy"
            onError={() => {
                if (idx < candidates.length - 1) setIdx((i) => i + 1);
            }}
        />
    );
}

function RegionDropdown({ regions, value, selectedRegionLabel, onChange }: {
    regions: RegionItem[];
    value: string;
    selectedRegionLabel: string;
    onChange: (next: RegionItem) => void;
}) {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const listRef = useRef<HTMLDivElement | null>(null);

    const selected = useMemo(() => regions.find((r) => r.value === value) ?? regions[0], [regions, value]);

    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(() => {
        const i = regions.findIndex((r) => r.value === selected?.value);
        return i >= 0 ? i : 0;
    });

    useEffect(() => {
        if (!open) return;

        const onDown = (e: MouseEvent) => {
            const el = rootRef.current;
            if (!el) return;
            if (e.target instanceof Node && !el.contains(e.target)) setOpen(false);
        };

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };

        document.addEventListener("mousedown", onDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const idx = regions.findIndex((r) => r.value === selected?.value);
        setActiveIndex(idx >= 0 ? idx : 0);
    }, [open, regions, selected?.value]);

    const commitIndex = useCallback(
        (idx: number) => {
            const next = regions[idx];
            if (!next) return;
            onChange(next);
            setOpen(false);
        },
        [regions, onChange]
    );

    useEffect(() => {
        if (!open) return;
        const el = listRef.current;
        if (!el) return;
        const opt = el.querySelector<HTMLButtonElement>(`button[data-idx="${activeIndex}"]`);
        opt?.scrollIntoView({ block: "nearest" });
    }, [open, activeIndex]);

    return (
        <div ref={rootRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="w-full bg-[#1D1D22] cursor-pointer rounded-2xl outline-0 font-medium px-4 py-3.5 flex items-center justify-between"
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <div className="flex items-center gap-3 min-w-0">
                    <FlagImg region={selected} className="w-7 h-5 rounded-[3px] shrink-0" />
                    <span className="truncate">{selected?.label ?? "-"}</span>

                    {selectedRegionLabel === "СНГ" ? (
                        <span className="relative shrink-0">
                            <img src="/product/region.png" alt="region" className="w-5 peer" loading="lazy" />
                            <span
                                className="
                                    absolute top-8.75 left-0 z-50
                                    bg-[#2F2F36] p-4 w-72.5 text-left rounded-2xl text-[14px] font-medium
                                    opacity-0 translate-y-1 pointer-events-none
                                    transition-all duration-150
                                    peer-hover:opacity-100 peer-hover:translate-y-0 peer-hover:pointer-events-auto
                                "
                            >
                                Азербайджан, Армения, Беларусь, Казахстан, Киргизия, Молдова, Таджикистан, Туркменистан, Узбекистан
                            </span>
                        </span>
                    ) : null}
                </div>

                <img
                    src="/product/arrow-down-simple.png"
                    alt="arrow"
                    className={`w-4 shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
                    loading="lazy"
                />
            </button>

            <div
                ref={listRef}
                role="listbox"
                aria-hidden={!open}
                className={`
                    absolute left-0 right-0 mt-2 z-50
                    bg-[#1D1D22] border border-[#FFFFFF1A]
                    rounded-2xl overflow-hidden
                    shadow-[0_12px_30px_rgba(0,0,0,0.35)]
                    max-h-72 overflow-y-auto
                    flex flex-col gap-2.5 p-5
                    scrollbar-regions
                    transition-all duration-150
                    ${open
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-1 pointer-events-none"}
                `}
            >
                {open
                    ? regions.map((r, idx) => (
                        <button
                            key={r.value}
                            type="button"
                            role="option"
                            aria-selected={r.value === selected?.value}
                            data-idx={idx}
                            onMouseEnter={() => setActiveIndex(idx)}
                            onClick={() => commitIndex(idx)}
                            className={`
                                  w-full flex items-center gap-3 text-left
                                  px-4 py-3.5 text-[14px] font-medium
                                  hover:bg-[#2F2F33] cursor-pointer rounded-lg transition-all
                              `}
                        >
                            <FlagImg region={r} className="w-7 h-5 rounded-[3px] shrink-0" />
                            <span className="truncate">{r.label}</span>
                        </button>
                    ))
                    : null}
            </div>
        </div>
    );
}

export default function RegionSelect({ mode, regionOptions, productOptions, values, setValues }: Props) {
    const t = useTranslations();
    const selectedRegionValue = String(values.region_value ?? "");
    const selectedRegionLabel = String(values.region_label ?? "");

    const regions: RegionItem[] = useMemo(() => {
        if (regionOptions?.length) {
            return regionOptions.map((o) => ({
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
    }, [regionOptions, productOptions]);

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
    }, [mode, regions, selectedRegionValue, selectedRegionLabel, setValues]);

    const selectValue = useMemo(() => {
        if (!regions.length) return "";
        const match = regions.find((r) => r.value === selectedRegionValue);
        return match ? match.value : regions[0].value;
    }, [regions, selectedRegionValue]);

    if (!regions.length) return null;

    return (
        <div className="flex flex-col gap-4">
            <b className="text-[24px]">{t.product.selectRegion}</b>

            <div className="border border-[#FFFFFF1A] rounded-2xl relative">
                <RegionDropdown
                    regions={regions}
                    value={selectValue}
                    selectedRegionLabel={selectedRegionLabel}
                    onChange={(next) => {
                        setValues((prev) => ({
                            ...prev,
                            region_value: next.value,
                            region_label: next.label,
                            product_id: null,
                        }));
                    }}
                />
            </div>
        </div>
    );
}

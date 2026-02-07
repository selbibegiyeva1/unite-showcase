import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from "../../translations";
import type { FormField } from "../../hooks/product/useProductGroupDetailsQuery";
import type { TopUpMode } from "./FormOne";

type Props = {
    groupName: string;
    mode: TopUpMode;
    fields: FormField[];
    values: Record<string, any>;
    setValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    errors: Record<string, string>;
    showErrors: boolean;
};

function FormTwo({ groupName, mode, fields, values, setValues, errors, showErrors }: Props) {
    const t = useTranslations();
    const isSteamTopup = groupName === "Steam" && mode === "topup";
    const isPhysicalProduct = groupName === "Физ. товары";
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLImageElement>(null);
    const hoverLeaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const openTooltip = () => {
        if (hoverLeaveTimeoutRef.current) {
            clearTimeout(hoverLeaveTimeoutRef.current);
            hoverLeaveTimeoutRef.current = null;
        }
        setIsTooltipOpen(true);
    };

    const handleTooltipMouseLeave = () => {
        hoverLeaveTimeoutRef.current = setTimeout(() => setIsTooltipOpen(false), 100);
    };

    const handleTooltipMouseEnter = () => {
        if (hoverLeaveTimeoutRef.current) {
            clearTimeout(hoverLeaveTimeoutRef.current);
            hoverLeaveTimeoutRef.current = null;
        }
    };

    useEffect(() => {
        if (!isTooltipOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsTooltipOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isTooltipOpen]);

    useEffect(() => {
        if (!isTooltipOpen) return;
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (
                tooltipRef.current &&
                !tooltipRef.current.contains(target) &&
                triggerRef.current &&
                !triggerRef.current.contains(target)
            ) {
                setIsTooltipOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isTooltipOpen]);

    useEffect(() => () => {
        if (hoverLeaveTimeoutRef.current) clearTimeout(hoverLeaveTimeoutRef.current);
    }, []);

    const err = (name: string) => (showErrors ? errors[name] : "");
    const inputCls = (name: string) =>
        `w-full outline-0 rounded-2xl appearance-none text-[14px] font-medium px-4 py-3.5 bg-[#1D1D22] border ${err(name) ? "border-red-500" : "border-[#FFFFFF1A]"
        }`;
    const alertCls = "mt-2 text-[12px] text-red-500 font-medium";

    if (isSteamTopup) {
        return (
            <div className="p-8 bg-[#1D1D22] rounded-4xl">
                <b className="text-[24px]">{t.product.accountTopUp}</b>

                <div className="mt-4 flex flex-col gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <p className="text-[#FFFFFF99] text-[14px]">{t.product.whereToSearch}</p>

                            <div
                                className="relative max-medium:static inline-block"
                                onMouseEnter={openTooltip}
                                onMouseLeave={handleTooltipMouseLeave}
                            >
                                <img
                                    ref={triggerRef}
                                    src="/product/region.png"
                                    alt="info"
                                    className="w-5 cursor-pointer"
                                    onClick={() => setIsTooltipOpen((prev) => !prev)}
                                />
                                {isTooltipOpen && (
                                    <>
                                        <div
                                            ref={tooltipRef}
                                            className={`
                                                max-medium:hidden
                                                absolute top-7 left-0 z-10
                                                bg-[#2F2F36] p-8 text-left rounded-2xl text-[14px] font-medium
                                                opacity-100 translate-y-0 pointer-events-auto
                                                transition-all duration-150
                                            `}
                                            onMouseEnter={handleTooltipMouseEnter}
                                            onMouseLeave={handleTooltipMouseLeave}
                                        >
                                            <p className="text-[24px] mb-6">{t.product.howToFindSteamLogin}</p>
                                            <ul className="mb-4 list-disc ml-5 flex flex-col gap-4">
                                                <li>{t.product.steamLoginInstruction1}</li>
                                                <li>{t.product.steamLoginInstruction2}</li>
                                            </ul>
                                            <img src="/product/steam.png" className="max-w-103.5" alt="steam" />
                                        </div>
                                        <div
                                            className="hidden max-medium:grid fixed top-0 left-0 bg-[#00000090] w-full h-screen z-60 place-items-center max-medium:px-[24px]"
                                            onMouseDown={() => setIsTooltipOpen(false)}
                                        >
                                            <div
                                                ref={tooltipRef}
                                                className="bg-[#2F2F36] px-8 pt-8 pb-12 rounded-3xl w-full max-w-lg"
                                                onMouseDown={(e) => e.stopPropagation()}
                                            >
                                                <div className="flex items-center gap-6 justify-between mb-6 pb-6 border-b border-b-[#FFFFFF26]">
                                                    <p className="text-[28px] font-medium leading-9.5">{t.product.howToFindSteamLogin}</p>
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsTooltipOpen(false)}
                                                        className="cursor-pointer"
                                                        aria-label="Close"
                                                    >
                                                        <div className="w-12">
                                                            <img src="/product/banks.png" className="w-full" alt="close" />
                                                        </div>
                                                    </button>
                                                </div>
                                                <ul className="mb-4 list-disc ml-5 flex flex-col gap-4 text-[14px] font-medium">
                                                    <li>{t.product.steamLoginInstruction1}</li>
                                                    <li>{t.product.steamLoginInstruction2}</li>
                                                </ul>
                                                <img src="/product/steam.png" className="w-full mt-4" alt="steam" />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <input
                            type="text"
                            id="field-steam_username"
                            value={String(values.steam_username ?? "")}
                            onChange={(e) => setValues((prev) => ({ ...prev, steam_username: e.target.value }))}
                            placeholder={t.product.enterSteamLogin}
                            className={inputCls("steam_username")}
                        />
                        {err("steam_username") ? <p className={alertCls}>{err("steam_username")}</p> : null}
                    </div>
                    <div>
                        <p className="text-[#FFFFFF99] text-[14px] mb-3">{t.product.email}</p>
                        <input
                            type="email"
                            id="field-email"
                            value={String(values.email ?? "")}
                            onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))}
                            placeholder={t.product.enterEmail}
                            className={inputCls("email")}
                        />
                        {err("email") ? <p className={alertCls}>{err("email")}</p> : null}
                    </div>
                </div>
            </div>
        );
    }

    const renderFields = fields.filter((f) => f.name !== "region" && f.name !== "product_id");

    if (isPhysicalProduct) {
        return (
            <div className="p-8 bg-[#1D1D22] rounded-4xl">
                <b className="text-[24px]">{t.product.checkout}</b>

                <div className="mt-4 flex flex-col gap-4">
                    <div className="flex flex-col justify-between">
                        <p className="text-[#FFFFFF99] text-[14px] mb-3">{t.product.phoneNumber}</p>
                        <input
                            type="text"
                            id="field-phone"
                            value={String(values.phone ?? "")}
                            onChange={(e) => setValues((prev) => ({ ...prev, phone: e.target.value }))}
                            placeholder={t.product.phoneNumber}
                            className={inputCls("phone")}
                        />
                        {err("phone") ? <p className={alertCls}>{err("phone")}</p> : null}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 bg-[#1D1D22] rounded-4xl">
            <b className="text-[24px]">{t.product.checkout}</b>

            <div
                className={`
                    mt-4 gap-4
                    ${renderFields.length > 1 ? "grid grid-cols-2 max-xsmall:grid-cols-1" : "flex flex-col"}
                `}
            >
                {renderFields.map((f) => {
                    if (f.type === "text") {
                        return (
                            <div key={f.name} className="flex flex-col justify-between">
                                <p className="text-[#FFFFFF99] text-[14px] mb-3">{f.label}</p>
                                <input
                                    type="text"
                                    id={`field-${f.name}`}
                                    value={String(values[f.name] ?? "")}
                                    onChange={(e) => setValues((prev) => ({ ...prev, [f.name]: e.target.value }))}
                                    placeholder={f.label}
                                    className={inputCls(f.name)}
                                />
                                {err(f.name) ? <p className={alertCls}>{err(f.name)}</p> : null}
                            </div>
                        );
                    }

                    if (f.type === "options") {
                        const opts = f.options ?? [];
                        return (
                            <div key={f.name}>
                                <p className="text-[#FFFFFF99] text-[14px] mb-3">{f.label}</p>
                                <div className="border border-[#FFFFFF1A] rounded-2xl relative">
                                    <select
                                        id={`field-${f.name}`}
                                        value={String(values[f.name] ?? (opts[0]?.value ?? ""))}
                                        onChange={(e) => setValues((prev) => ({ ...prev, [f.name]: e.target.value }))}
                                        className="w-full bg-[#1D1D22] appearance-none text-[14px] cursor-pointer outline-0 font-medium px-4 py-3.5 rounded-2xl"
                                    >
                                        {opts.map((o) => (
                                            <option key={String(o.value)} value={String(o.value)}>
                                                {o.name}
                                            </option>
                                        ))}
                                    </select>
                                    <img
                                        src="/product/arrow-down-simple.png"
                                        alt="arrow-down-simple"
                                        className="absolute top-1/2 right-4 -translate-y-1/2 w-4 pointer-events-none"
                                    />
                                </div>
                                {err(f.name) ? <p className={alertCls}>{err(f.name)}</p> : null}
                            </div>
                        );
                    }

                    return null;
                })}
            </div>
        </div>
    );
}

export default FormTwo;

import { useMemo } from "react";
import { useTranslations } from "../../translations";
import type { FormField } from "../../hooks/product/useProductGroupDetailsQuery";
import { useStripCurrencyFromNominal } from "../../hooks/product/useStripCurrencyFromNominal";
import type { TopUpMode } from "../../pages/Product";
import { useCheckoutStore } from "../../store/checkoutStore";

import { FaCheck } from "react-icons/fa6";
import { IconContext } from "react-icons";

type Props = {
    groupName: string;
    mode: TopUpMode;
    fields: FormField[];
    values: Record<string, any>;
    amountTmt: number | null;
    topupUsd: number | null;
    rateLoading: boolean;
    rateError: boolean;
    onOpenBanks: () => void;
    nominalLabel?: string | null;

    errors: Record<string, string>;
    showErrors: boolean;
    onValidate: () => boolean;
    setValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
};

function Total({ groupName, mode, fields, values, amountTmt, topupUsd, rateLoading, rateError, nominalLabel, onOpenBanks, setValues, errors, showErrors, onValidate }: Props) {
    const t = useTranslations();
    const stripCurrency = useStripCurrencyFromNominal();
    const enabled = typeof amountTmt === "number" && amountTmt > 0;

    const paying = useCheckoutStore((s) => s.paying);
    const payError = useCheckoutStore((s) => s.payError);
    const submitPayment = useCheckoutStore((s) => s.submitPayment);

    const topupUsdText = useMemo(() => {
        if (!enabled) return "-";
        if (rateLoading) return "...";
        if (rateError) return "-";
        return typeof topupUsd === "number" ? `~${topupUsd.toFixed(2)}` : "-";
    }, [enabled, rateLoading, rateError, topupUsd]);

    const region = String(values.region_label ?? values.region_value ?? "-");

    const resolvedFields: FormField[] = useMemo(() => {
        const isSteamTopup = groupName === "Steam" && mode === "topup";
        if (!isSteamTopup) return fields;

        return [
            { name: "steam_username", type: "text", label: t.product.whereToSearch },
            { name: "email", type: "text", label: t.product.email },
        ];
    }, [fields, groupName, mode, t]);

    const rows = useMemo(() => {
        return resolvedFields.map((f) => {
            if (f.type === "options") {
                const raw = values[f.name];
                const selected = f.options?.find((o) => String(o.value) === String(raw));
                const display = selected?.name ?? String(raw ?? "-");
                return { label: f.label, value: display };
            }

            const raw = values[f.name];
            const display = raw == null || raw === "" ? "-" : String(raw);
            return { label: f.label, value: display };
        });
    }, [resolvedFields, values]);

    const bankText = String(values.bank ?? t.product.selectBank);

    const bankErr = showErrors ? errors.bank : "";
    const confirmErr = showErrors ? errors.confirmed : "";
    const alertCls = "mt-2 text-[12px] text-red-500 font-medium";

    const isSteamTopup = groupName === "Steam" && mode === "topup";
    const strippedNominal = stripCurrency(nominalLabel ?? "");
    const creditText = isSteamTopup
        ? (topupUsdText !== "-" && topupUsdText !== "..."
            ? `${topupUsdText} ${t.product.conditionalUnit}`
            : topupUsdText)
        : strippedNominal ? `${strippedNominal} ${t.product.conditionalUnit}` : "-";

    const scrollToFirstError = () => {
        const errorKeys = Object.keys(errors);
        if (errorKeys.length === 0) return;

        for (const field of fields) {
            if (errors[field.name]) {
                const element = document.getElementById(`field-${field.name}`);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "center" });
                    if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement) {
                        element.focus();
                    }
                    return;
                }
            }
        }

        if (errors.bank) {
            const element = document.getElementById("field-bank");
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
                return;
            }
        }

        if (errors.confirmed) {
            const element = document.getElementById("field-confirmed");
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
                element.focus();
                return;
            }
        }
    };

    return (
        <form
            className="w-84 bg-[#1D1D22] rounded-4xl px-6 py-8 max-medium:w-full"
            onSubmit={async (e) => {
                e.preventDefault();
                if (!enabled || paying) return;

                const ok = onValidate();
                if (!ok) {
                    setTimeout(() => {
                        scrollToFirstError();
                    }, 100);
                    return;
                }

                await submitPayment({ groupName, fields, amountTmt });
            }}
        >
            <b className="text-[24px]">{t.product.payment}</b>

            <div
                id="field-bank"
                className={`
                    mt-4 mb-2 px-4 py-3 flex items-center justify-between cursor-pointer
                    bg-[#2E2E31] rounded-[10px] font-medium transition-all duration-150 hover:bg-[#3A3A3E]
                    border ${bankErr ? "border-red-500" : "border-[#FFFFFF1A]"}
                `}
                onClick={onOpenBanks}
            >
                <p className="overflow-hidden text-ellipsis whitespace-nowrap">{bankText}</p>
                <img src="/product/chevron-down.png" alt="chevron-down" className="w-6" />
            </div>
            {bankErr ? <p className={alertCls}>{bankErr}</p> : null}

            <div>
                <div className="total-div">
                    <p>{t.product.region}</p>
                    <p className='t-ellipsis' title={region}>
                        {region}
                    </p>
                </div>

                {rows.map((r) => (
                    <div key={r.label} className="total-div">
                        <p>{r.label}</p>
                        <p className='t-ellipsis' title={r.value}>
                            {r.value}
                        </p>
                    </div>
                ))}

                <div className="total-div">
                    <p className="whitespace-nowrap">{t.product.toBeCredited}</p>
                    <p className='t-ellipsis' title={creditText}>
                        {creditText}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between font-bold text-[20px] py-4">
                <p>{t.product.total}</p>
                <p className='t-ellipsis' title={enabled ? `${amountTmt} TMT` : "-"}>
                    {enabled ? `${amountTmt} TMT` : "-"}
                </p>
            </div>

            <div className="my-4 flex items-center gap-2.5 bg-[#2F2F36] rounded-[10px] px-4 py-3">
                <img src="/product/report.png" alt="report" className="w-6" />
                <p className="w-fit text-[14px] font-medium">{t.product.nonReturnable}</p>
            </div>

            <label className="text-[13.75px] font-medium flex items-center gap-2.5 cursor-pointer select-none">
                <div className="relative">
                    <input
                        type="checkbox"
                        id="field-confirmed"
                        checked={Boolean(values.confirmed)}
                        onChange={(e) => setValues((prev) => ({ ...prev, confirmed: e.target.checked }))}
                        className={`
                            peer min-h-6 min-w-6 cursor-pointer outline-none appearance-none rounded-sm border-2 bg-transparent
                            grid place-items-center transition-colors duration-150
                            checked:bg-[#A132C7] checked:border-[#A132C7]
                            ${confirmErr ? "border-red-500" : "border-[#FFFFFF26]"}
                        `}
                    />

                    <IconContext.Provider
                        value={{
                            className:
                                "pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity duration-150",
                            size: "12px",
                        }}
                    >
                        <FaCheck />
                    </IconContext.Provider>
                </div>
                <span>{t.product.confirmData}</span>
            </label>

            <button
                type="submit"
                disabled={!enabled || paying}
                style={{
                    background: "linear-gradient(to right, #79109D, #A132C7)",
                    opacity: enabled && !paying ? 1 : 0.6,
                }}
                className="text-[14px] my-4 w-full shadow-[0px_4px_0px_#580873]
                    font-bold py-[14.5px] cursor-pointer flex items-center justify-center rounded-[10px]"
            >
                {paying ? t.product.creatingPayment : enabled ? t.product.payAmountTmt.replace("{amount}", String(amountTmt)) : t.product.pay}
            </button>
            {payError ? <p className="mt-2 text-[12px] text-red-500 font-medium">{payError}</p> : null}
            <center>
                <p className="text-[12px] text-[#FFFFFF99] font-medium">
                    {groupName === "Steam"
                        ? t.product.steamBalanceMessage
                        : mode === "topup"
                            ? t.product.activationInstructionsMessage
                            : t.product.voucherActivationMessage}
                </p>
            </center>
        </form>
    );
}

export default Total;

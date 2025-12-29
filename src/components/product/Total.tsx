import { useMemo } from "react";
import type { FormField } from "../../hooks/product/useProductGroupDetailsQuery";
import type { TopUpMode } from "../../pages/Product";

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
};

function Total({ groupName, mode, fields, values, amountTmt, topupUsd, rateLoading, rateError, onOpenBanks }: Props) {
    const enabled = typeof amountTmt === "number" && amountTmt > 0;

    const topupUsdText = useMemo(() => {
        if (!enabled) return "-";
        if (rateLoading) return "...";
        if (rateError) return "-";
        return typeof topupUsd === "number" ? `~${topupUsd.toFixed(2)} $` : "-";
    }, [enabled, rateLoading, rateError, topupUsd]);

    const region = String(values.region_label ?? values.region_value ?? "-");

    const resolvedFields: FormField[] = useMemo(() => {
        const isSteamTopup = groupName === "Steam" && mode === "topup";
        if (!isSteamTopup) return fields;

        const hasSteamLogin = fields.some((f) => f.name === "steam_login");
        const hasEmail = fields.some((f) => f.name === "email");

        const extra: FormField[] = [];
        if (!hasSteamLogin) extra.push({ name: "steam_login", type: "text", label: "Логин в Steam" });
        if (!hasEmail) extra.push({ name: "email", type: "text", label: "Почта" });

        return [...extra, ...fields];
    }, [fields, groupName, mode]);

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

    const valueCls = "text-right max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap";
    const bankText = String(values.bank ?? "Выбрать банк");

    return (
        <form className="w-84 bg-[#1D1D22] rounded-4xl px-6 py-8">
            <b className="text-[24px]">Оплата</b>

            <div
                className="my-4 px-4 py-3 flex items-center justify-between cursor-pointer
          bg-[#2E2E31] border border-[#FFFFFF1A] rounded-[10px] font-medium
          transition-all duration-150
          hover:bg-[#3A3A3E]"
                onClick={onOpenBanks}
            >
                <p className="overflow-hidden text-ellipsis whitespace-nowrap">{bankText}</p>
                <img src="/product/chevron-down.png" alt="chevron-down" className="w-6" />
            </div>

            <div>
                <div className="total-div">
                    <p>Регион</p>
                    <p className={valueCls} title={region}>
                        {region}
                    </p>
                </div>

                {rows.map((r) => (
                    <div key={r.label} className="total-div">
                        <p>{r.label}</p>
                        <p className={valueCls} title={r.value}>
                            {r.value}
                        </p>
                    </div>
                ))}

                <div className="total-div">
                    <p>К зачислению</p>
                    <p className={valueCls} title={topupUsdText}>
                        {topupUsdText}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between font-bold text-[20px] py-4">
                <p>Итого</p>
                <p className={valueCls} title={enabled ? `${amountTmt} TMT` : "—"}>
                    {enabled ? `${amountTmt} TMT` : "—"}
                </p>
            </div>

            <div className="my-4 flex items-center gap-2.5 bg-[#2F2F36] rounded-[10px] px-4 py-3">
                <img src="/product/report.png" alt="report" className="w-6" />
                <p className="w-fit text-[14px] font-medium">Товар возврату не подлежит</p>
            </div>

            <label className="text-[14px] font-medium flex items-center gap-3 cursor-pointer select-none">
                <input
                    type="checkbox"
                    className="
                        min-h-6 min-w-6 cursor-pointer outline-none
                        appearance-none rounded-sm
                        border-2 border-[#FFFFFF26] bg-transparent
                        grid place-items-center
                        transition-colors duration-150
                        checked:bg-[#A132C7] checked:border-[#A132C7]
                    "
                />
                <span>Я подтверждаю, что правильно указал все данные</span>
            </label>

            <button
                style={{ background: "linear-gradient(to right, #79109D, #A132C7)" }}
                className="text-[14px] my-4 w-full shadow-[0px_4px_0px_#580873]
                    font-bold py-[14.5px] cursor-pointer flex items-center justify-center rounded-[10px]"
            >
                {enabled ? `Оплатить ${amountTmt} TMT` : "Оплатить"}
            </button>

            <center>
                <p className="text-[12px] text-[#FFFFFF99] font-medium">
                    Баланс Steam будет пополнен в течение 15 минут после успешной оплаты.
                </p>
            </center>
        </form>
    );
}

export default Total;

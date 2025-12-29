import { useMemo } from "react";

type Props = {
    values: Record<string, any>;
    amountTmt: number | null;
    topupUsd: number | null;
    rateLoading: boolean;
    rateError: boolean;
};

function Total({ values, amountTmt, topupUsd, rateLoading, rateError }: Props) {
    const enabled = typeof amountTmt === "number" && amountTmt > 0;

    const topupUsdText = useMemo(() => {
        if (!enabled) return "-";
        if (rateLoading) return "...";
        if (rateError) return "-";
        return typeof topupUsd === "number" ? `~${topupUsd.toFixed(2)} $` : "-";
    }, [enabled, rateLoading, rateError, topupUsd]);

    const region = String(values.region_label ?? values.region_value ?? "");
    const login = String(values.login ?? values.steam_login ?? values.username ?? "");
    const email = String(values.email ?? "");

    return (
        <form className="w-84 bg-[#1D1D22] rounded-4xl px-6 py-8">
            <b className="text-[24px]">Оплата</b>

            <div
                className="my-4 px-4 py-3 flex items-center justify-between cursor-pointer
                    bg-[#2E2E31] border border-[#FFFFFF1A] rounded-[10px] font-medium
                    transition-all duration-150
                    hover:bg-[#3A3A3E] hover:border-[rgba(255,255,255,0.2)] active:translate-y-0"
            >
                <p>Выбрать банк</p>
                <img src="/product/chevron-down.png" alt="chevron-down" className="w-6" />
            </div>
            <div>
                <div className="total-div">
                    <p>Регион</p>
                    <p>СНГ</p>
                </div>
                <div className="total-div">
                    <p>Логин в Steam</p>
                    <p>ВТФкиллер</p>
                </div>
                <div className="total-div">
                    <p>Почта</p>
                    <p>ВТФкиллер@gmail.com</p>
                </div>
                <div className="total-div">
                    <p>К зачислению</p>
                    <p>{topupUsdText}</p>
                </div>
            </div>
            <div className="flex items-center justify-between font-bold text-[20px] py-4">
                <p>Итого</p>
                <p>{amountTmt != null ? `${amountTmt} TMT` : "-"}</p>
            </div>
            <div className="my-4 flex items-center gap-2.5 bg-[#2F2F36] rounded-[10px] px-4 py-3">
                <img src="/product/report.png" alt="report" className="w-6" />
                <p className="w-fit text-[14px] font-medium">Товар возврату не подлежит</p>
            </div>
            <div className="text-[14px] font-medium flex items-center gap-2.5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.75" y="0.75" width="22.5" height="22.5" rx="3.25" stroke="white" stroke-opacity="0.15" stroke-width="1.5" />
                </svg>
                <p>Я потдверждаю, что правильно указал все данные</p>
            </div>
            <button
                style={{ background: "linear-gradient(to right, #79109D, #A132C7)" }}
                className="text-[14px] my-4 w-full shadow-[0px_4px_0px_#580873] font-bold py-[14.5px] cursor-pointer flex items-center justify-center rounded-[10px]"
            >
                Оплатить 105 TMT
            </button>
            <center>
                <p className="text-[12px] text-[#FFFFFF99] font-medium">Баланс Steam будет пополнен в течение 15 минут после успешной оплаты.</p>
            </center>
        </form>
    )
}

export default Total
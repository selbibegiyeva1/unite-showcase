import { useState } from "react";

type TopUpMode = "topup" | "voucher";

function FormOne() {
    const [mode, setMode] = useState<TopUpMode>("topup");
    const isVoucherActive = mode === "voucher";

    const nominals = ["100TMT", "200TMT", "500TMT", "1000TMT"];
    const [activeNominal, setActiveNominal] = useState(nominals[0]);

    return (
        <div className="p-8 bg-[#1D1D22] rounded-4xl">
            <b className="text-[24px]">Выберите способо пополнения</b>

            <div className="flex gap-3 mt-4">
                <button
                    type="button"
                    onClick={() => setMode("topup")}
                    className={`switch ${mode === "topup" ? "switch--active" : "switch--inactive"}`}
                >
                    <span>Пополнение</span>
                </button>

                <button
                    type="button"
                    onClick={() => setMode("voucher")}
                    className={`switch ${isVoucherActive ? "switch--active" : "switch--inactive"} relative`}
                >
                    <span>Ваучер</span>

                    <img
                        src="/product/voucher.png"
                        alt="voucher"
                        className={`w-5 ${isVoucherActive ? "peer" : ""} ${!isVoucherActive ? "switch--inactive-img" : ""}`}
                    />

                    <p
                        className={`
                            bg-[#2F2F36] p-4 w-72.5
                            text-left rounded-2xl text-[14px] font-medium
                            absolute top-0 left-[129.60px] z-10
                            ${isVoucherActive ? `
                                opacity-0 translate-y-1 pointer-events-none
                                transition-all duration-150
                                peer-hover:opacity-100 peer-hover:translate-y-0 peer-hover:pointer-events-auto
                            ` : `
                                opacity-0 pointer-events-none
                            `}
                        `}
                    >
                        Ваучер - уникальная комбинация из цифр и букв. У ваучера есть денежный номинал,
                        который зачисляется на игровой кошелёк при активации.
                    </p>
                </button>
            </div>

            <div className="mt-8">
                <b className="text-[24px]">Выберите регион</b>
                <div className="mt-4 border border-[#FFFFFF1A] rounded-2xl relative">
                    <select className="w-full appearance-none text-[14px] cursor-pointer outline-0 font-medium px-4 py-3.5">
                        <option>Турция</option>
                    </select>
                    <img
                        src="/product/arrow-down-simple.png"
                        alt="arrow-down-simple"
                        className="absolute top-1/2 right-4 -translate-y-1/2 w-4 pointer-events-none"
                    />
                </div>
            </div>

            <div className="mt-8">
                <b className="text-[24px]">Выберите номинал</b>

                <div className="mt-4 flex gap-3 flex-wrap">
                    {nominals.map((n) => {
                        const isActive = activeNominal === n;

                        return (
                            <button
                                key={n}
                                type="button"
                                onClick={() => setActiveNominal(n)}
                                className={`
                  cursor-pointer px-6 py-[11.5px] rounded-[10px] text-[14px] font-bold transition-all duration-200
                  ${isActive ? "bg-[#79109D] text-white" : "bg-[#2F2F33] text-white/60"}
                `}
                            >
                                {n}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default FormOne;

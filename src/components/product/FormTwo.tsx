import React from "react";
import type { FormField } from "../../hooks/product/useProductGroupDetailsQuery";
import type { TopUpMode } from "./FormOne";

type Props = {
    groupName: string;
    mode: TopUpMode;
    fields: FormField[];
    values: Record<string, any>;
    setValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
};

function FormTwo({ groupName, mode, fields, values, setValues }: Props) {
    const isSteamTopup = groupName === "Steam" && mode === "topup";

    if (isSteamTopup) {
        return (
            <div className="p-8 bg-[#1D1D22] rounded-4xl">
                <b className="text-[24px]">Пополнение аккаунта</b>

                <div className="mt-4 flex flex-col gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <p className="text-[#FFFFFF99] text-[14px]">Где искать</p>

                            <div className="relative">
                                <img
                                    src="/product/region.png"
                                    alt="info"
                                    className="w-5 peer"
                                />
                                <p
                                    className={`
                                        absolute top-6 left-0 z-10
                                        bg-[#2F2F36] p-4 w-72.5 text-left rounded-2xl text-[14px] font-medium
                                        opacity-0 translate-y-1 pointer-events-none
                                        transition-all duration-150
                                        peer-hover:opacity-100 peer-hover:translate-y-0 peer-hover:pointer-events-auto
                                    `}
                                >
                                    Введите логин Steam (не никнейм). Его можно посмотреть в профиле или в клиенте Steam.
                                </p>
                            </div>
                        </div>
                        <input
                            type="text"
                            value={String(values.steam_login ?? "")}
                            onChange={(e) => setValues((prev) => ({ ...prev, steam_login: e.target.value }))}
                            placeholder="Введите логин в Steam"
                            className="w-full border border-[#FFFFFF1A] outline-0 rounded-2xl appearance-none text-[14px] font-medium px-4 py-3.5 bg-[#1D1D22]"
                        />
                    </div>

                    <div>
                        <p className="text-[#FFFFFF99] text-[14px] mb-3">Почта</p>
                        <input
                            type="text"
                            value={String(values.email ?? "")}
                            onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))}
                            placeholder="Введите свой e-mail"
                            className="w-full border border-[#FFFFFF1A] outline-0 rounded-2xl appearance-none text-[14px] font-medium px-4 py-3.5 bg-[#1D1D22]"
                        />
                    </div>
                </div>
            </div>
        );
    }

    const renderFields = fields.filter((f) => f.name !== "region" && f.name !== "product_id");

    return (
        <div className="p-8 bg-[#1D1D22] rounded-4xl">
            <b className="text-[24px]">Оформление покупки</b>

            <div
                className={`
                    mt-4 gap-4
                    ${renderFields.length > 1 ? "grid grid-cols-2" : "flex flex-col"}
                `}
            >
                {renderFields.map((f) => {
                    if (f.type === "text") {
                        return (
                            <div key={f.name} className="flex flex-col justify-between">
                                <p className="text-[#FFFFFF99] text-[14px] mb-3">{f.label}</p>
                                <input
                                    type="text"
                                    value={String(values[f.name] ?? "")}
                                    onChange={(e) => setValues((prev) => ({ ...prev, [f.name]: e.target.value }))}
                                    placeholder={f.label}
                                    className="w-full border border-[#FFFFFF1A] outline-0 rounded-2xl appearance-none text-[14px] font-medium px-4 py-3.5 bg-[#1D1D22]"
                                />
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

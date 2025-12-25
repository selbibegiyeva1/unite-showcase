import type { FormField } from "../../hooks/product/useProductGroupDetailsQuery";

type Props = {
    fields: FormField[];
    values: Record<string, any>;
    setValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
};

function FormTwo({ fields, values, setValues }: Props) {
    const renderFields = fields.filter((f) => f.name !== "region" && f.name !== "product_id");

    return (
        <div className="p-8 bg-[#1D1D22] rounded-4xl">
            <b className="text-[24px]">Оформление покупки</b>

            <div className="mt-4 flex flex-col gap-4">
                {renderFields.map((f) => {
                    if (f.type === "text") {
                        return (
                            <div key={f.name}>
                                <p className="text-[#FFFFFF99] text-[14px] mb-3">{f.label}</p>
                                <input
                                    type="text"
                                    value={String(values[f.name] ?? "")}
                                    onChange={(e) => setValues((prev) => ({ ...prev, [f.name]: e.target.value }))}
                                    placeholder={f.label}
                                    className="w-full border border-[#FFFFFF1A] outline-0 rounded-2xl appearance-none text-[14px] font-medium px-4 py-3.5"
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
                                        className="w-full appearance-none text-[14px] cursor-pointer outline-0 font-medium px-4 py-3.5"
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

                    return (
                        <div key={f.name}>
                            <p className="text-[#FFFFFF99] text-[14px] mb-3">{f.label}</p>
                            <input
                                type="text"
                                value={String(values[f.name] ?? "")}
                                onChange={(e) => setValues((prev) => ({ ...prev, [f.name]: e.target.value }))}
                                placeholder={f.label}
                                className="w-full border border-[#FFFFFF1A] outline-0 rounded-2xl appearance-none text-[14px] font-medium px-4 py-3.5"
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default FormTwo;

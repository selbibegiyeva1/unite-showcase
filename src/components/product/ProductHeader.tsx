type ProductHeaderProps = {
    icon?: string | null;
    group?: string | null;
    short_info?: string | null;
};

export function ProductHeader({ icon, group, short_info }: ProductHeaderProps) {
    if (!group && !icon && !short_info) return null;

    return (
        <div className="w-167 px-8 pt-8 pb-11 bg-[#1D1D22] rounded-4xl">
            <div className="flex items-center gap-7.25">
                {icon ? (
                    <img src={icon} alt={group ?? "Product"} className="w-40 rounded-3xl" />
                ) : null}
                <div>
                    <h1 className="text-2xl font-bold">Пополнение баланса {group}</h1>
                    <div className="bg-[#79109D] w-fit flex items-center gap-1 px-[19.5px] py-1.5 rounded-[10px] mt-3">
                        <img src="/product/globe.png" alt="globe" className="w-5" />
                        <p className="text-[12px] font-bold">Для аккаунтов любого региона</p>
                    </div>
                    {short_info ? <p className="mt-4.5 text-[13px] font-medium text-[#FFFFFF99]">{short_info}</p> : null}
                </div>
            </div>
        </div>
    );
}

type ProductHeaderProps = {
    icon?: string | null;
    group?: string | null;
    short_info?: string | null;
    showAnyRegionBadge?: boolean;
};

export function ProductHeader({ icon, group, short_info, showAnyRegionBadge }: ProductHeaderProps) {
    if (!group && !icon && !short_info) return null;

    return (
        <div className="px-8 py-8 bg-[#1D1D22] rounded-4xl">
            <div className="flex items-center gap-7.25">
                {icon ? (
                    <img
                        src={icon}
                        alt={group ?? "Product"}
                        className="w-40 rounded-3xl"
                        loading="lazy"
                        onError={(e) => {
                            const img = e.currentTarget;
                            if (img.dataset.fallbackApplied) return;
                            img.dataset.fallbackApplied = "1";
                            img.src = "/product/alt.png";
                        }}
                    />
                ) : (
                    <img src="/product/alt.png" alt={group ?? "Product"} className="w-40 rounded-3xl" loading="lazy" />
                )}

                <div>
                    <h1 className="text-2xl font-bold">{group}</h1>

                    {showAnyRegionBadge ? (
                        <div className="bg-[#79109D] w-fit flex items-center gap-3 leading-4 px-[19.5px] py-1.5 rounded-[10px] mt-3">
                            <img src="/product/globe.png" alt="globe" className="w-5" loading="lazy" />
                            <p className="text-[12px] font-bold">Для аккаунтов любого региона</p>
                        </div>
                    ) : null}

                    {short_info ? (
                        <p className="mt-4.5 text-[13px] font-medium text-[#FFFFFF99]">{short_info}</p>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

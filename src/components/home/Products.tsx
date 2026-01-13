import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useProductGroupsQuery, type ProductGroupCategory } from "../../hooks/home/useProductGroupsQuery";
import { useTranslations } from "../../translations";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Products() {
    const t = useTranslations();
    const [activeCategory, setActiveCategory] = useState<ProductGroupCategory>("games");
    const { data, isLoading, isError, error, refetch } = useProductGroupsQuery();

    const activeGroups = useMemo(() => {
        const groups = data ?? [];
        return groups.filter((g) => g.category === activeCategory);
    }, [data, activeCategory]);

    return (
        <div className="max-w-255 m-auto max-lg:px-[48px] product">
            <div className="flex gap-2">
                <button
                    type="button"
                    className={`switch ${activeCategory === "games" ? "switch--active" : "switch--inactive"}`}
                    onClick={() => setActiveCategory("games")}
                >
                    <img
                        src="/home/toy.png"
                        alt="toy"
                        style={{ width: 22 }}
                        className={activeCategory !== "games" ? "switch--inactive-img" : ""}
                        loading="lazy"
                    />
                    <span>{t.products.games}</span>
                </button>
                <button
                    type="button"
                    className={`switch ${activeCategory === "business" ? "switch--active" : "switch--inactive"}`}
                    onClick={() => setActiveCategory("business")}
                >
                    <img
                        src="/home/desktop.png"
                        alt="desktop"
                        style={{ width: 22 }}
                        className={activeCategory !== "business" ? "switch--inactive-img" : ""}
                        loading="lazy"
                    />
                    <span>{t.products.programs}</span>
                </button>
            </div>

            <div className="mt-4">
                {isLoading && (
                    <div className="grid grid-cols-4 gap-6 mt-6 max-lg:grid-cols-3">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="flex flex-col gap-3">
                                <div className="max-w-57.5 rounded-2xl overflow-hidden">
                                    <Skeleton baseColor="#2F2F33" highlightColor="#47474e" height={231} />
                                </div>
                                <center>
                                    <Skeleton baseColor="#2F2F33" highlightColor="#47474e" borderRadius={8} width={120} height={21} />
                                </center>
                            </div>
                        ))}
                    </div>
                )}
                {isError && (
                    <div>
                        <div style={{ color: "red" }}>
                            {(error as Error)?.message ?? "Error"}
                        </div>
                        <button type="button" onClick={() => refetch()}>
                            Retry
                        </button>
                    </div>
                )}

                {!isLoading && !isError && (
                    <div className="grid grid-cols-4 gap-6 mt-6 max-lg:grid-cols-3 products-grid">
                        {activeGroups.map((g) => (
                            <Link
                                to={`/product?group=${encodeURIComponent(g.group_name)}`}
                                key={`${g.category}:${g.group_name}`}
                                className="flex flex-col gap-3 group"
                            >
                                <div className="overflow-hidden rounded-2xl">
                                    <img
                                        src={g.icon_url}
                                        alt="product"
                                        className="rounded-2xl transition-transform duration-300 group-hover:scale-110"
                                        loading="lazy"
                                        onError={(e) => {
                                            const img = e.currentTarget;
                                            if (img.dataset.fallbackApplied) return;
                                            img.dataset.fallbackApplied = "1";
                                            img.src = "/product/alt.png";
                                        }}
                                    />
                                </div>
                                <center>
                                    <span className="font-bold">{g.group_name}</span>
                                </center>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useProductGroupsQuery, type ProductGroupCategory } from "../../hooks/home/useProductGroupsQuery";
import { useTranslations } from "../../translations";
import SupportHelpModal from "../product/SupportHelpModal";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type ExtendedCategory = ProductGroupCategory | "other";

const OTHER_SERVICES = [
    { name: "Adobe", src: "/home/static/Adobe.png" },
    { name: "Canva", src: "/home/static/Canva.png" },
    { name: "ChatGPT Plus", src: "/home/static/ChatGPT Plus.png" },
    { name: "Cursor", src: "/home/static/Cursor.png" },
    { name: "Figma", src: "/home/static/Figma.png" },
    { name: "Gemini", src: "/home/static/Gemini.png" },
    { name: "Google Play", src: "/home/static/Google Play.png" },
    { name: "Kling", src: "/home/static/Kling.png" },
    { name: "Perplexity", src: "/home/static/Perplexity.png" },
    { name: "Runway", src: "/home/static/Runway.png" },
    { name: "Suno AI", src: "/home/static/Suno AI.png" },
];

export default function Products() {
    const t = useTranslations();
    const [activeCategory, setActiveCategory] = useState<ExtendedCategory>("games");
    const [isSupportOpen, setIsSupportOpen] = useState(false);
    const { data, isLoading, isError, error, refetch } = useProductGroupsQuery();

    const activeGroups = useMemo(() => {
        if (activeCategory === "other") return [];

        const groups = data ?? [];
        return groups.filter((g) => g.category === activeCategory);
    }, [data, activeCategory]);

    const isOther = activeCategory === "other";

    return (
        <div className="max-w-255 m-auto max-lg:px-[48px] product">
            <div className="flex gap-2 flex-wrap">
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
                <button
                    type="button"
                    className={`switch ${activeCategory === "other" ? "switch--active" : "switch--inactive"}`}
                    onClick={() => setActiveCategory("other")}
                >
                    <img
                        src="/home/add-block.png"
                        alt="other services"
                        style={{ width: 22 }}
                        className={activeCategory !== "other" ? "switch--inactive-img" : ""}
                        loading="lazy"
                    />
                    <span>{t.products.otherServices}</span>
                </button>
            </div>

            <div className="mt-4">
                {!isOther && isLoading && (
                    <div className="grid grid-cols-4 gap-6 mt-6 max-lg:grid-cols-3 max-[500px]:gap-4 products-grid">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="flex flex-col gap-3 max-[500px]:gap-2">
                                <div className="max-w-57.5 rounded-2xl overflow-hidden w-full">
                                    <Skeleton baseColor="#2F2F33" highlightColor="#47474e" height={231} className="max-[500px]:h-auto max-[500px]:aspect-square" />
                                </div>
                                <center>
                                    <Skeleton baseColor="#2F2F33" highlightColor="#47474e" borderRadius={8} width={120} height={21} className="max-[500px]:w-20 max-[500px]:h-4" />
                                </center>
                            </div>
                        ))}
                    </div>
                )}
                {!isOther && isError && (
                    <div>
                        <div style={{ color: "red" }}>
                            {(error as Error)?.message ?? "Error"}
                        </div>
                        <button type="button" onClick={() => refetch()}>
                            Retry
                        </button>
                    </div>
                )}

                {!isOther && !isLoading && !isError && (
                    <div className="grid grid-cols-4 gap-6 mt-6 max-lg:grid-cols-3 max-[500px]:gap-4 products-grid">
                        {activeGroups.map((g) => (
                            <Link
                                to={`/product?group=${encodeURIComponent(g.group_name)}`}
                                key={`${g.category}:${g.group_name}`}
                                className="flex flex-col gap-3 max-[500px]:gap-2 group"
                            >
                                <div className="overflow-hidden rounded-2xl">
                                    <img
                                        src={g.icon_url}
                                        alt="product"
                                        className="w-full h-auto rounded-2xl transition-transform duration-300 group-hover:scale-110"
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
                                    <span className="font-bold text-sm">{g.group_name}</span>
                                </center>
                            </Link>
                        ))}
                    </div>
                )}

                {isOther && (
                    <>
                        <div className="grid grid-cols-4 gap-6 mt-6 max-lg:grid-cols-3 max-[500px]:gap-4 products-grid">
                            {OTHER_SERVICES.map((service) => (
                                <button
                                    key={service.name}
                                    type="button"
                                    onClick={() => setIsSupportOpen(true)}
                                    className="flex flex-col gap-3 max-[500px]:gap-2 text-left group cursor-pointer active:cursor-grabbing"
                                >
                                    <div className="overflow-hidden rounded-2xl">
                                        <img
                                            src={service.src}
                                            alt={service.name}
                                            className="w-full h-auto rounded-2xl group-hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                    </div>
                                    <center>
                                        <span className="font-bold text-sm">{service.name}</span>
                                    </center>
                                </button>
                            ))}
                        </div>
                        <SupportHelpModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
                    </>
                )}
            </div>
        </div>
    );
}

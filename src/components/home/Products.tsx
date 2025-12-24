import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useProductGroupsQuery, type ProductGroupCategory } from "../../hooks/home/useProductGroupsQuery";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Products() {
    const [activeCategory, setActiveCategory] = useState<ProductGroupCategory>("games");
    const { data, isLoading, isError, error, refetch } = useProductGroupsQuery();

    const activeGroups = useMemo(() => {
        const groups = data ?? [];
        return groups.filter((g) => g.category === activeCategory);
    }, [data, activeCategory]);

    return (
        <div className="max-w-255 m-auto">
            <div className="flex gap-2">
                <button
                    type="button"
                    className={`switch ${activeCategory === "games" ? "switch--active" : "switch--inactive"}`}
                    onClick={() => setActiveCategory("games")}
                >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.16667 6.41634C9.16667 7.93512 7.93545 9.16634 6.41667 9.16634C4.89788 9.16634 3.66667 7.93512 3.66667 6.41634C3.66667 4.89756 4.89788 3.66634 6.41667 3.66634C7.93545 3.66634 9.16667 4.89756 9.16667 6.41634Z" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.8333 12.833H18.3333V18.333H12.8333V12.833Z" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5.04167 14.208L2.75 15.583L5.04167 16.958L6.41667 19.2497L7.79167 16.958L10.0833 15.583L7.79167 14.208L6.41667 11.9163L5.04167 14.208Z" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M15.5833 3.20801L19.25 9.16634H11.9167L15.5833 3.20801Z" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span>Игры</span>
                </button>
                <button
                    type="button"
                    className={`switch ${activeCategory === "business" ? "switch--active" : "switch--inactive"}`}
                    onClick={() => setActiveCategory("business")}
                >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.08333 18.583H10.75M13.4167 18.583H10.75M10.75 18.583V15.958M10.75 15.958H16.75C17.8546 15.958 18.75 15.0626 18.75 13.958V6.58301C18.75 5.47844 17.8546 4.58301 16.75 4.58301H4.75C3.64543 4.58301 2.75 5.47844 2.75 6.58301V13.958C2.75 15.0626 3.64543 15.958 4.75 15.958H10.75Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span>Программы</span>
                </button>
            </div>

            <div className="mt-4">
                {isLoading && (
                    <div className="grid grid-cols-4 gap-6 mt-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="flex flex-col gap-3">
                                <div className="max-w-57.75 rounded-2xl overflow-hidden">
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
                    <div className="grid grid-cols-4 gap-6 mt-6">
                        {activeGroups.map((g) => (
                            <Link to='/product' key={`${g.category}:${g.group_name}`} className="flex flex-col gap-3">
                                <img src={g.icon_url} alt="product" className="max-w-57.75 rounded-2xl" />
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

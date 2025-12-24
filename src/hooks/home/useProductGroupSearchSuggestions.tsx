import { useMemo } from "react";
import { useProductGroupsQuery, type ProductGroupCategory } from "./useProductGroupsQuery";

export type ProductGroupSuggestion = {
    group_name: string;
    icon_url: string;
    category: ProductGroupCategory;
};

export function useProductGroupSearchSuggestions(query: string, limit = 8) {
    const { data, isLoading, isError } = useProductGroupsQuery();

    const suggestions = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return [];

        const groups = (data ?? []) as ProductGroupSuggestion[];

        const scored = groups
            .map((g) => {
                const name = g.group_name.toLowerCase();
                const idx = name.indexOf(q);
                if (idx === -1) return null;
                return { g, score: idx === 0 ? 0 : 1, idx };
            })
            .filter(Boolean) as Array<{ g: ProductGroupSuggestion; score: number; idx: number }>;

        scored.sort((a, b) => a.score - b.score || a.idx - b.idx || a.g.group_name.localeCompare(b.g.group_name));

        return scored.slice(0, limit).map((x) => x.g);
    }, [data, query, limit]);

    return { suggestions, isLoading, isError };
}

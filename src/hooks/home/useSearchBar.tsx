import { useEffect, useRef, useState } from "react";
import { useProductGroupSearchSuggestions } from "./useProductGroupSearchSuggestions";

export function useSearchBar(maxSuggestions = 8) {
    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const { suggestions } = useProductGroupSearchSuggestions(value, maxSuggestions);

    useEffect(() => {
        const q = value.trim();
        setOpen(Boolean(q) && suggestions.length > 0);
        setActiveIndex(-1);
    }, [value, suggestions.length]);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleFocus = () => {
        if (value.trim() && suggestions.length > 0) {
            setOpen(true);
        }
    };

    const handleSuggestionClick = () => {
        setOpen(false);
        setValue("");
    };

    return {
        value,
        open,
        activeIndex,
        suggestions,
        wrapperRef,
        handleChange,
        handleFocus,
        handleSuggestionClick,
    };
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { useSearchBar } from "../../hooks/home/useSearchBar";
import { useTranslations } from "../../translations";
import SupportHelpModal from "../product/SupportHelpModal";

interface SearchBarProps {
    maxSuggestions?: number;
    className?: string;
    inputClassName?: string;
    placeholder?: string;
    onSuggestionClick?: () => void;
}

function SearchBar({ maxSuggestions = 8, className = "", inputClassName = "", placeholder = "Поиск по сайту", onSuggestionClick }: SearchBarProps) {
    const t = useTranslations();
    const { value, open, activeIndex, suggestions, isLoading, wrapperRef, handleChange, handleFocus, handleSuggestionClick } = useSearchBar(maxSuggestions);
    const [isSupportOpen, setIsSupportOpen] = useState(false);

    const hasQuery = Boolean(value.trim());
    const showNoResults = open && hasQuery && !isLoading && suggestions.length === 0;

    const handleClick = () => {
        handleSuggestionClick();
        onSuggestionClick?.();
    };

    return (
        <div ref={wrapperRef} className={`relative ${className}`}>
            <div className={`flex items-center gap-2 px-4 py-2 bg-[#2F2F36] rounded-[10px] ${inputClassName}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M13.3891 13.3891L19 19M9.5 15C12.5376 15 15 12.5376 15 9.5C15 6.46243 12.5376 4 9.5 4C6.46243 4 4 6.46243 4 9.5C4 12.5376 6.46243 15 9.5 15Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                <input
                    type="text"
                    placeholder={placeholder}
                    className="outline-0 w-full text-[14px] font-medium bg-transparent"
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                    onFocus={handleFocus}
                />
            </div>

            {open && (
                <div className="absolute left-0 right-0 mt-2 bg-[#1E1E23] border border-[#2D2D2D] rounded-[10px] overflow-hidden shadow-lg z-60">
                    {showNoResults ? (
                        <div className="px-10 py-12.5 text-center">
                            <p className="text-[14px] text-white/70">{t.navbar.searchNoResults}</p>
                            <p className="py-2 text-[18px] font-bold leading-6">{t.support.searchTitle}</p>
                            <center>
                                <button
                                    type="button"
                                    onClick={() => setIsSupportOpen(true)}
                                    style={{ background: "linear-gradient(to right, #79109D, #A132C7)" }}
                                    className="text-[14px] cursor-pointer w-full shadow-[0px_4px_0px_#580873] font-bold py-[11.5px] px-8.75 flex items-center justify-center rounded-[10px]"
                                >
                                    {t.support.searchButton}
                                </button>
                            </center>
                        </div>
                    ) : (
                        suggestions.map((s, idx) => (
                            <Link
                                key={`${s.category}:${s.group_name}`}
                                to={`/product?group=${encodeURIComponent(s.group_name)}`}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={handleClick}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition ${idx === activeIndex ? "bg-[#2F2F36]" : "bg-transparent"
                                    }`}
                            >
                                <img src={s.icon_url} alt={s.group_name} style={{ width: 24, height: 24, borderRadius: 5 }} />
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[14px] font-bold leading-5 line-clamp-1">{s.group_name}</span>
                                    <span className="text-[12px] text-white/60 leading-4">
                                        {s.category === "games" ? "Игры" : "Программы"}
                                    </span>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            )}
            <SupportHelpModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
        </div>
    );
}

export default SearchBar;

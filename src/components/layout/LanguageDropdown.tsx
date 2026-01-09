import { useEffect, useMemo, useRef, useState, useCallback } from "react";

type LangOption = { label: string; value: string };

const LANGUAGES: LangOption[] = [
    { label: "RU", value: "RU" },
    { label: "EN", value: "EN" },
    { label: "TM", value: "TM" },
];

type LanguageDropdownProps = {
    className?: string;
    dropdownClassName?: string;
};

function LanguageDropdown({ className = "", dropdownClassName = "" }: LanguageDropdownProps) {
    const [lang, setLang] = useState<LangOption["value"]>("RU");
    const [langOpen, setLangOpen] = useState(false);
    const [langActiveIndex, setLangActiveIndex] = useState(0);
    const langRef = useRef<HTMLDivElement | null>(null);

    const selectedLang = useMemo(
        () => LANGUAGES.find((l) => l.value === lang) ?? LANGUAGES[0],
        [lang]
    );

    const commitLangIndex = useCallback((idx: number) => {
        const next = LANGUAGES[idx];
        if (!next) return;
        setLang(next.value);
        setLangOpen(false);
    }, []);

    useEffect(() => {
        if (!langOpen) return;
        const idx = LANGUAGES.findIndex((l) => l.value === lang);
        setLangActiveIndex(idx >= 0 ? idx : 0);
    }, [langOpen, lang]);

    useEffect(() => {
        if (!langOpen) return;

        const onDown = (e: MouseEvent) => {
            const el = langRef.current;
            if (!el) return;
            if (e.target instanceof Node && !el.contains(e.target)) setLangOpen(false);
        };

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setLangOpen(false);
        };

        document.addEventListener("mousedown", onDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [langOpen]);

    return (
        <div ref={langRef} className={`relative ${className}`}>
            <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                className="outline-0 font-bold text-[15px] cursor-pointer rounded-[10px] px-4 py-3 flex items-center gap-2"
            >
                <span>{selectedLang.label}</span>
                <img
                    src="/product/arrow-down-simple.png"
                    alt="arrow"
                    className={`w-4 transition-transform duration-150 ${langOpen ? "rotate-180" : ""}`}
                />
            </button>

            <div
                role="listbox"
                aria-hidden={!langOpen}
                className={`
                    absolute right-0 mt-2 z-60 min-w-30
                    bg-[#1E1E23] border border-[#2D2D2D]
                    rounded-[10px] overflow-hidden shadow-lg
                    max-h-56 overflow-y-auto
                    scrollbar-regions
                    transition-all duration-150
                    ${langOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-1 pointer-events-none"}
                    ${dropdownClassName}
                `}
            >
                {langOpen
                    ? LANGUAGES.map((l, idx) => (
                        <button
                            key={l.value}
                            type="button"
                            role="option"
                            aria-selected={l.value === lang}
                            onMouseEnter={() => setLangActiveIndex(idx)}
                            onClick={() => commitLangIndex(idx)}
                            className={`w-full text-left px-4 py-3 font-bold text-[15px] cursor-pointer transition ${idx === langActiveIndex ? "bg-[#2F2F36]" : "bg-transparent"
                                }`}
                        >
                            {l.label}
                        </button>
                    ))
                    : null}
            </div>
        </div>
    );
}

export default LanguageDropdown;

import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useProductGroupSearchSuggestions } from "../../hooks/home/useProductGroupSearchSuggestions";

type LangOption = { label: string; value: string };

function Navbar() {
    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const [lang, setLang] = useState<LangOption["value"]>("RU");
    const [langOpen, setLangOpen] = useState(false);
    const [langActiveIndex, setLangActiveIndex] = useState(0);
    const langRef = useRef<HTMLDivElement | null>(null);

    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const { suggestions } = useProductGroupSearchSuggestions(value, 8);

    const languages: LangOption[] = useMemo(
        () => [
            { label: "RU", value: "RU" },
            { label: "EN", value: "EN" },
            { label: "TM", value: "TM" },
        ],
        []
    );

    const selectedLang = useMemo(
        () => languages.find((l) => l.value === lang) ?? languages[0],
        [languages, lang]
    );

    useEffect(() => {
        const q = value.trim();
        setOpen(Boolean(q) && suggestions.length > 0);
        setActiveIndex(-1);
    }, [value, suggestions.length]);

    const commitLangIndex = useCallback(
        (idx: number) => {
            const next = languages[idx];
            if (!next) return;
            setLang(next.value);
            setLangOpen(false);
        },
        [languages]
    );

    useEffect(() => {
        if (!langOpen) return;
        const idx = languages.findIndex((l) => l.value === lang);
        setLangActiveIndex(idx >= 0 ? idx : 0);
    }, [langOpen, languages, lang]);

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
        <div className="bg-[#222228CC] backdrop-blur-3xl border-b border-[#2D2D2D] px-4 text-white 
            fixed left-0 top-0 w-full z-60 
            max-lg:px-[40px] navbar"
        >
            <nav className="m-auto max-w-255 h-18 flex items-center gap-6">
                <Link to="/">
                    <img src="/logo.png" style={{ width: 63 }} alt="logo" />
                </Link>

                <div ref={wrapperRef} className="relative w-87.5 max-nav:w-[200px] max-small:hidden">
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#2F2F36] rounded-[10px]">
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
                            placeholder="Поиск по сайту"
                            className="outline-0 w-full text-[14px] font-medium bg-transparent"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onFocus={() => {
                                if (value.trim() && suggestions.length) setOpen(true);
                            }}
                        />
                    </div>

                    {open && (
                        <div className="absolute left-0 right-0 mt-2 bg-[#1E1E23] border border-[#2D2D2D] rounded-[10px] overflow-hidden shadow-lg">
                            {suggestions.map((s, idx) => (
                                <Link
                                    key={`${s.category}:${s.group_name}`}
                                    to={`/product?group=${encodeURIComponent(s.group_name)}`}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => {
                                        setOpen(false);
                                        setValue("");
                                    }}
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
                            ))}
                        </div>
                    )}
                </div>

                <Link to="/partners" className="text-[14px] font-bold max-small:hidden">
                    Партнеры
                </Link>

                <div className="ml-auto flex items-center gap-5">
                    <div ref={langRef} className="relative">
                        <button
                            type="button"
                            onClick={() => setLangOpen((v) => !v)}
                            aria-haspopup="listbox"
                            aria-expanded={langOpen}
                            className=" outline-0 font-bold text-[15px] cursor-pointer rounded-[10px] px-4 py-3 flex items-center gap-2"
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
                            `}
                        >
                            {langOpen
                                ? languages.map((l, idx) => (
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

                    <img src="/menu.png" alt="" className="max-small:block hidden w-6 cursor-pointer" />

                    <a
                        href="https://unite-gaming.com/"
                        target="_blank"
                        className="bg-[#79109D] hover:bg-[#8a1aad] max-small:hidden transition-colors px-4 py-3 rounded-[10px] text-[14px] font-bold leading-5"
                    >
                        Перейти в Unite Gaming
                    </a>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;

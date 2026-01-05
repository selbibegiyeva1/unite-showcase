import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useProductGroupSearchSuggestions } from "../../hooks/home/useProductGroupSearchSuggestions";

function Navbar() {
    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const navigate = useNavigate();
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const { suggestions } = useProductGroupSearchSuggestions(value, 8);

    useEffect(() => {
        const q = value.trim();
        setOpen(Boolean(q) && suggestions.length > 0);
        setActiveIndex(-1);
    }, [value, suggestions.length]);

    useEffect(() => {
        const onDown = (e: MouseEvent) => {
            if (!wrapperRef.current) return;
            if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, []);

    const goToGroup = (group: string) => {
        setOpen(false);
        setValue("");
        navigate(`/product?group=${encodeURIComponent(group)}`);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
            if (suggestions.length) setOpen(true);
            return;
        }

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter") {
            if (activeIndex >= 0 && suggestions[activeIndex]) {
                e.preventDefault();
                goToGroup(suggestions[activeIndex].group_name);
            }
        } else if (e.key === "Escape") {
            setOpen(false);
        }
    };

    return (
        <div className="bg-[#222228CC] backdrop-blur-3xl border-b border-[#2D2D2D] px-4 text-white fixed left-0 top-0 w-full z-60">
            <nav className="m-auto max-w-255 h-18 flex items-center gap-6">
                <Link to="/">
                    <img src="/logo.png" style={{ width: 63 }} alt="logo" />
                </Link>

                <div ref={wrapperRef} className="relative w-87.5">
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
                            onKeyDown={onKeyDown}
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
                                        <span className="text-[14px] font-bold leading-5 line-clamp-1">
                                            {s.group_name}
                                        </span>
                                        <span className="text-[12px] text-white/60 leading-4">
                                            {s.category === "games" ? "Игры" : "Программы"}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <Link to="/partners" className="text-[14px] font-bold">
                    Партнеры
                </Link>

                <div className="ml-auto">
                    <select className="bg-[#1E1E23 outline-0] font-bold text-[15px] cursor-pointer">
                        <option value="RU">RU</option>
                        <option value="ENG">ENG</option>
                        <option value="TKM">TKM</option>
                    </select>
                    <a
                        href="#"
                        className="bg-[#79109D] ml-5 px-4 py-3 rounded-[10px] text-[14px] font-bold leading-5"
                    >
                        Перейти в Unite Gaming
                    </a>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;

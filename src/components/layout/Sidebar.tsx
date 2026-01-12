import { Link } from "react-router-dom";

import LanguageDropdown from "./LanguageDropdown";
import SearchBar from "./SearchBar";
import NewsBlock from "../home/NewsBlock";
import { useTranslations } from "../../translations";

interface SidebarProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

function Sidebar({ isSidebarOpen, toggleSidebar }: SidebarProps) {
    const t = useTranslations();
    
    return (
        <div className={`fixed top-0 left-0 w-full flex flex-col justify-between px-6 pb-[42px] h-full bg-[#18181B] z-70 text-white ${isSidebarOpen ? "block" : "hidden"}`}>
            <div>
                <div className="flex items-center justify-between h-[72px]">
                    <Link to="/" onClick={toggleSidebar}>
                        <img src="/logo.png" style={{ width: 63 }} alt="logo" />
                    </Link>
                    <div className="flex items-center gap-6">
                        <LanguageDropdown />
                        <img src="/product/banks.png" onClick={toggleSidebar} alt="" className="w-[32px] cursor-pointer" />
                    </div>
                </div>

                <div className="pt-4">
                    <SearchBar onSuggestionClick={toggleSidebar} placeholder={t.navbar.searchPlaceholder} />
                </div>

                <ul className="pt-[34px]">
                    <li>
                        <Link to="/" className="font-medium" onClick={toggleSidebar}>
                            <span>{t.news.home}</span>
                        </Link>
                    </li>
                    <li className="mt-[24px]">
                        <Link to="/partners" className="font-medium" onClick={toggleSidebar}>
                            <span>{t.navbar.partners}</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="mt-[50px]">
                <NewsBlock compact onNewsClick={toggleSidebar} isVisible={isSidebarOpen} />
                <a
                    href="https://unite-gaming.com/"
                    target="_blank"
                    className="bg-[#79109D] flex items-center justify-center mt-[32px] hover:bg-[#8a1aad] w-full transition-colors p-3.5 rounded-[10px] text-[14px] font-bold leading-5"
                >
                    {t.navbar.goToUniteGaming}
                </a>
            </div>
        </div>
    )
}

export default Sidebar
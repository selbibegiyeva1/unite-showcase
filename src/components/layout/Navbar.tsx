import { Link } from "react-router-dom";
import LanguageDropdown from "./LanguageDropdown";
import SearchBar from "./SearchBar";
import { useTranslations } from "../../translations";

interface NavbarProps {
    toggleSidebar: () => void;
}

function Navbar({ toggleSidebar }: NavbarProps) {
    const t = useTranslations();

    return (
        <div className="bg-[#222228CC] backdrop-blur-3xl border-b border-[#2D2D2D] px-4 text-white 
            fixed left-0 top-0 w-full z-60 
            max-lg:px-[40px] navbar"
        >
            <nav className="m-auto max-w-255 h-18 flex items-center gap-6">
                <Link to="/">
                    <img src="/logo.png" style={{ width: 63 }} alt="logo" />
                </Link>

                <SearchBar className="w-87.5 max-nav:w-[200px] max-small:w-full" placeholder={t.navbar.searchPlaceholder} />

                <Link to="/partners" className="nav-link-underline text-[14px] font-bold hover:text-[#A132C7] transition-colors">
                    {t.navbar.partners}
                </Link>
                <Link to="/about" className="nav-link-underline text-[14px] font-bold hover:text-[#A132C7] transition-colors">
                    {t.navbar.aboutUs}
                </Link>

                <div className="ml-auto flex items-center">
                    <LanguageDropdown />

                    <div className="nav-gap flex items-center" style={{ width: 30 }}>
                        <img src="/menu.png" onClick={toggleSidebar} alt="" className="max-small:block max-small:gap-6 hidden cursor-pointer" />
                    </div>

                    <a
                        href="https://unite-gaming.com/"
                        target="_blank"
                        className="bg-[#79109D] hover:bg-[#8a1aad] max-small:hidden transition-colors px-4 py-3 rounded-[10px] text-[14px] font-bold leading-5"
                    >
                        {t.navbar.goToUniteGaming}
                    </a>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;

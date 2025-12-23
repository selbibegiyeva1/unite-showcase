import { Link } from "react-router-dom"

function Navbar() {
    return (
        <div className="bg-[#1E1E23] border-b border-[#2D2D2D] px-4 text-white">
            <nav className="m-auto max-w-255 h-18 flex items-center gap-6">
                <Link to='/'>
                    <img src="/logo.png" style={{ width: 63 }} alt="logo" />
                </Link>

                <div className="flex items-center gap-2 w-87.5 px-4 py-2 bg-[#2F2F36] rounded-[10px]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.3891 13.3891L19 19M9.5 15C12.5376 15 15 12.5376 15 9.5C15 6.46243 12.5376 4 9.5 4C6.46243 4 4 6.46243 4 9.5C4 12.5376 6.46243 15 9.5 15Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <input type="text" placeholder="Search..." className="outline-0 w-full text-[14px] font-medium" />
                </div>

                <Link to='/partners' className="text-[14px] font-bold">Партнеры</Link>

                <div className="ml-auto">
                    <select className="bg-[#1E1E23 outline-0] font-bold text-[15px] cursor-pointer">
                        <option value="RU">RU</option>
                        <option value="ENG">ENG</option>
                        <option value="TKM">TKM</option>
                    </select>
                    <a href="#" className="bg-[#79109D] ml-5 px-4 py-3 rounded-[10px] text-[14px] font-bold leading-5">Перейти в Unite Gaming</a>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
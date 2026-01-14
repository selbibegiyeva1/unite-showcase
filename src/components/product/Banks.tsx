import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslations } from "../../translations";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    selectedBank: string | null;
    onSelect: (bank: string) => void;
};

function Banks({ isOpen, onClose, selectedBank, onSelect }: Props) {
    const t = useTranslations();

    useEffect(() => {
        if (!isOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const Row = ({ title, value, disabled }: {
        title: string;
        value?: string;
        disabled?: boolean;
    }) => {
        const checked = value ? selectedBank === value : false;

        return (
            <li
                role={disabled ? undefined : "button"}
                tabIndex={disabled ? -1 : 0}
                onClick={() => {
                    if (disabled || !value) return;
                    onSelect(value);
                }}
                onKeyDown={(e) => {
                    if (disabled || !value) return;
                    if (e.key === "Enter" || e.key === " ") onSelect(value);
                }}
                className={`
                    bg-[#36363C] px-4 py-[14.5px] rounded-lg hover:bg-[#45454D] transition-all duration-200 ease-out
                    ${disabled ? "opacity-40 cursor-not-allowed select-none" : "cursor-pointer"}
                `}
            >
                <div className="flex items-center gap-3">
                    <span
                        className={`
                    min-w-4 min-h-4 rounded-full border-2
                    ${checked ? "bg-[#79109D] border-[#79109D]" : "bg-transparent border-white"}
                `}
                    />
                    <span>{title}</span>
                </div>
            </li>
        );
    };

    return (
        <div
            className="fixed top-0 left-0 bg-[#00000090] w-full h-screen z-60 grid place-items-center max-medium:px-[24px]"
            onMouseDown={onClose}
        >
            <div
                className="bg-[#2F2F36] px-8 pt-8 pb-12 rounded-3xl w-150 max-medium:w-full"
                onMouseDown={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between gap-6 mb-6.5">
                    <p className="text-[24px] font-medium leading-9.5">{t.product.selectYourBank}</p>

                    <button type="button" onClick={onClose} className="cursor-pointer" aria-label="Close">
                        <div className="w-8">
                            <img src="/product/banks.png" className="w-full" alt="close" loading="lazy" />
                        </div>
                    </button>
                </div>

                <ul className="flex flex-col gap-2.5">
                    <Row title="Rysgal" value="Rysgal" />
                    <Row title="Senagat" value="Senagat" />
                    <Row title={t.product.otherBanks} disabled />
                    <Row title="TDDYIB" value="TDDYIB" disabled />
                </ul>

                <div className="mt-6">
                    <div className="flex items-center justify-center gap-4 mb-5">
                        <div className="w-full h-px bg-[#FFFFFF26]" />
                        <p className="text-center text-[#FFFFFF99] text-[14px] text-nowrap">{t.product.or}</p>
                        <div className="w-full h-px bg-[#FFFFFF26]" />
                    </div>
                    <Link
                        to="/partners"
                        onClick={onClose}
                        style={{
                            background: "linear-gradient(to right, #79109D, #A132C7)",
                        }}
                        className="text-[14px] w-full shadow-[0px_4px_0px_#580873] font-bold py-[14.5px] cursor-pointer flex items-center justify-center rounded-[10px]"
                    >
                        {t.partners.topUpThroughPartners}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Banks;

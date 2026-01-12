import { useEffect } from "react";
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

    const Row = ({ title, value, disabled, isSection }: {
        title: string;
        value?: string;
        disabled?: boolean;
        isSection?: boolean;
    }) => {
        if (isSection) {
            return (
                <li className="opacity-40 select-none flex items-center justify-between">
                    <span>{title}</span>
                    <span className="w-6 h-6 rounded-full border border-white/20" />
                </li>
            );
        }

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
                    flex items-center justify-between
                    ${disabled ? "opacity-40 cursor-not-allowed select-none" : "cursor-pointer"}
                `}
            >
                <span>{title}</span>

                <span
                    className={`
                    w-6 h-6 rounded-full border
                    ${checked ? "bg-[#79109D] border-[#79109D]" : "bg-transparent border-white/30"}
                `}
                />
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
                <div className="flex items-center justify-between gap-6 mb-6 pb-6 border-b border-b-[#FFFFFF26]">
                    <p className="text-[28px] font-medium leading-9.5">{t.product.selectYourBank}</p>

                    <button type="button" onClick={onClose} className="cursor-pointer w-12" aria-label="Close">
                        <div className="w-12">
                            <img src="/product/banks.png" className="w-full" alt="close" />
                        </div>
                    </button>
                </div>

                <ul className="banks flex flex-col gap-7.5">
                    <Row title="Rysgal" value="Rysgal" />
                    <Row title="Senagat" value="Senagat" />
                    <Row title={t.product.otherBanks} isSection />
                    <Row title="TDDYIB" value="TDDYIB" disabled />
                </ul>
            </div>
        </div>
    );
}

export default Banks;

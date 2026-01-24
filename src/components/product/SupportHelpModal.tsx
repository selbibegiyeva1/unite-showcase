import { useEffect } from "react";
import { useTranslations } from "../../translations";

type SupportHelpModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

function SupportHelpModal({ isOpen, onClose }: SupportHelpModalProps) {
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

    return (
        <div
            className="text-white fixed top-0 left-0 bg-[#00000090] w-full h-screen z-60 grid place-items-center max-medium:px-[24px]"
            onMouseDown={onClose}
        >
            <div
                className="bg-[#2F2F36] px-8 pt-8 pb-10 rounded-3xl w-[456px] max-medium:w-full"
                onMouseDown={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between gap-6 mb-6.5">
                    <p className="text-[24px] font-medium leading-8">
                        {t.support.modalTitle}
                    </p>

                    <button type="button" onClick={onClose} className="cursor-pointer" aria-label="Close">
                        <div className="w-8">
                            <img src="/product/banks.png" className="w-full" alt="close" loading="lazy" />
                        </div>
                    </button>
                </div>

                <p className="text-[13px] font-medium leading-5 text-[#FFFFFFB3]">
                    {t.support.modalDescription}
                </p>

                <div className="mt-6 font-bold flex flex-col gap-5">
                    <a href="tel:+99362423118" className="flex items-center gap-2 hover:text-[#A132C7] transition-colors">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="32" rx="12" fill="white" />
                            <path d="M9.44423 10.9685C10.2376 16.8128 15.1872 21.7625 21.0315 22.5558C21.9762 22.684 22.8013 21.9937 22.9882 21.0589L23.2004 19.9979C23.3773 19.1135 22.9404 18.2202 22.1337 17.8168L21.3319 17.416C20.6572 17.0786 19.8376 17.272 19.385 17.8756C19.0902 18.2687 18.6166 18.5083 18.1635 18.3184C16.606 17.6655 14.3345 15.394 13.6816 13.8365C13.4917 13.3834 13.7313 12.9098 14.1244 12.615C14.728 12.1624 14.9214 11.3428 14.584 10.6681L14.1832 9.86632C13.7798 9.05963 12.8865 8.62271 12.0021 8.79959L10.9411 9.01178C10.0063 9.19875 9.31599 10.0238 9.44423 10.9685Z" stroke="#2F2F36" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p>+993 (62) 42-31-18</p>
                    </a>
                    <a href="mailto:support@unite-gaming.com" className="flex items-center gap-2 hover:text-[#A132C7] transition-colors">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="32" rx="12" fill="white" />
                            <path d="M8.5 12.6667L14.8906 16.9271C15.5624 17.375 16.4376 17.375 17.1094 16.9271L23.5 12.6667M10.5 21.8334H21.5C22.6046 21.8334 23.5 20.938 23.5 19.8334V12.1667C23.5 11.0622 22.6046 10.1667 21.5 10.1667H10.5C9.39543 10.1667 8.5 11.0622 8.5 12.1667V19.8334C8.5 20.938 9.39543 21.8334 10.5 21.8334Z" stroke="#2F2F36" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p>support@unite-gaming.com</p>
                    </a>
                    <a href="https://t.me/unite_shop" target="_blank" className="flex items-center gap-2 hover:text-[#A132C7] transition-colors">
                        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M31 15.5C31 24.0604 24.0604 31 15.5 31C6.93959 31 0 24.0604 0 15.5C0 6.93959 6.93959 0 15.5 0C24.0604 0 31 6.93959 31 15.5ZM16.0554 11.4428C14.5478 12.0698 11.5348 13.3677 7.01619 15.3364C6.28245 15.6282 5.89808 15.9136 5.86309 16.1927C5.80396 16.6644 6.39467 16.8502 7.19906 17.1031C7.30848 17.1375 7.42186 17.1732 7.53809 17.211C8.32949 17.4682 9.39407 17.7692 9.9475 17.7811C10.4495 17.792 11.0098 17.585 11.6284 17.1602C15.8502 14.3104 18.0296 12.8699 18.1664 12.8389C18.2629 12.817 18.3967 12.7894 18.4873 12.87C18.578 12.9505 18.569 13.1031 18.5594 13.144C18.5009 13.3935 16.1822 15.5492 14.9822 16.6648C14.6081 17.0126 14.3428 17.2593 14.2885 17.3156C14.167 17.4418 14.0432 17.5612 13.9241 17.6759C13.1889 18.3847 12.6376 18.9162 13.9547 19.7842C14.5876 20.2013 15.0941 20.5462 15.5994 20.8903C16.1512 21.2661 16.7016 21.6409 17.4137 22.1077C17.5952 22.2267 17.7685 22.3502 17.9372 22.4705C18.5794 22.9283 19.1564 23.3397 19.8692 23.2741C20.2834 23.236 20.7112 22.8465 20.9285 21.685C21.4419 18.9399 22.4513 12.9922 22.6845 10.5413C22.705 10.3265 22.6793 10.0517 22.6586 9.93108C22.638 9.81044 22.5948 9.63856 22.438 9.51132C22.2523 9.36063 21.9656 9.32885 21.8374 9.33111C21.2544 9.34138 20.36 9.65239 16.0554 11.4428Z" fill="white" />
                        </svg>
                        <p>@unite_shop</p>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default SupportHelpModal;


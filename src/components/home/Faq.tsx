import { useState, useMemo } from "react";
import { useTranslations } from "../../translations";
import type { TopUpMode } from "../../pages/Product";

type FaqItem = {
    q: string;
    a: React.ReactNode;
};

type FaqProps = {
    groupName?: string;
    mode?: TopUpMode;
};


function formatAnswer(answer: string): React.ReactNode {
    const paragraphs = answer.split("\n\n");
    const answerParts: React.ReactNode[] = [];
    
    paragraphs.forEach((para, paraIdx) => {
        if (paraIdx > 0) {
            answerParts.push(<br key={`br-para-${paraIdx}`} />);
            answerParts.push(<br key={`br-para2-${paraIdx}`} />);
        }
        
        const lines = para.split("\n").filter(l => l.trim() !== "");
        const isBoldSection = para.trim().startsWith("Важно:") || 
                             para.trim().startsWith("Important:") ||
                             para.trim().startsWith("Если вы ошиблись") ||
                             para.trim().startsWith("If you made a mistake");
        
        lines.forEach((line, lineIdx) => {
            if (lineIdx > 0) {
                answerParts.push(<br key={`br-line-${paraIdx}-${lineIdx}`} />);
            }
            
            if (isBoldSection) {
                answerParts.push(<b key={`text-${paraIdx}-${lineIdx}`}>{line}</b>);
            } else {
                answerParts.push(<span key={`text-${paraIdx}-${lineIdx}`}>{line}</span>);
            }
        });
    });
    
    return (
        <p className="mt-2.5 text-[14px] font-light">
            {answerParts}
        </p>
    );
}

function Faq({ groupName, mode }: FaqProps = {}) {
    const t = useTranslations();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs: FaqItem[] = useMemo(() => {
        // Use Steam-specific FAQs if on Steam product page
        if (groupName === "Steam" && mode) {
            const steamFaqs = mode === "voucher" ? t.faq.steamVoucher : t.faq.steamTopup;
            return steamFaqs.map((item) => ({
                q: item.q,
                a: formatAnswer(item.a)
            }));
        }

        // Default to translation-based FAQs
        return t.faq.items.map((item) => ({
            q: item.q,
            a: formatAnswer(item.a)
        }));
    }, [t, groupName, mode]);

    const toggle = (idx: number) => {
        setOpenIndex((prev) => (prev === idx ? null : idx));
    };

    return (
        <div className="max-w-255 m-auto">
            <b className="text-[32px]">{t.faq.title}</b>

            <div className="mt-6 flex flex-col gap-2.5">
                {faqs.map((item, idx) => {
                    const isOpen = openIndex === idx;

                    return (
                        <div
                            key={item.q}
                            className="px-5 py-6 bg-[#1D2023] rounded-[20px] cursor-pointer"
                            onClick={() => toggle(idx)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") toggle(idx);
                            }}
                            aria-expanded={isOpen}
                        >
                            <div className="flex items-center justify-between">
                                <p className="font-medium text-[#FAFAFA]">{item.q}</p>

                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                >
                                    <path
                                        d="M18.9882 9C19.8882 9 20.3382 10.077 19.7022 10.706L16.5722 13.802C14.4182 15.934 13.3402 17 12.0002 17C10.6602 17 9.58319 15.934 7.42719 13.802L4.29819 10.706C3.66119 10.076 4.11219 9 5.01319 9C5.28019 9 5.53719 9.105 5.72719 9.293L8.85719 12.388C9.97519 13.494 10.6722 14.178 11.2462 14.611C11.7632 15.001 11.9432 15.001 11.9972 15.001H12.0032C12.0562 15.001 12.2372 15.001 12.7542 14.611C13.3282 14.179 14.0262 13.494 15.1442 12.388L18.2732 9.293C18.4636 9.10498 18.7206 8.99969 18.9882 9Z"
                                        fill="#626C77"
                                    />
                                </svg>
                            </div>

                            {isOpen ? item.a : null}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Faq;

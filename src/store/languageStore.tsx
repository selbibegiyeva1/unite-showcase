import { create } from "zustand";

export type LangValue = "RU" | "EN" | "TM";

const STORAGE_KEY = "language-storage";

const getStoredLang = (): LangValue => {
    if (typeof window === "undefined") return "RU";
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "RU" || stored === "EN" || stored === "TM") {
        return stored;
    }
    return "RU";
};

interface LanguageStore {
    lang: LangValue;
    setLang: (lang: LangValue) => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
    lang: getStoredLang(),
    setLang: (lang) => {
        if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEY, lang);
        }
        set({ lang });
    },
}));

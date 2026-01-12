import { useLanguageStore } from "../store/languageStore";
import { RU } from "./RU";
import { EN } from "./EN";

export type Translations = typeof RU;

export function useTranslations(): Translations {
    const lang = useLanguageStore((s) => s.lang);
    
    if (lang === "EN") {
        return EN;
    }
    
    return RU;
}

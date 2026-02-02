import { useCallback } from "react";

/**
 * Common currency codes that may appear in nominal names from the backend.
 */
const CURRENCY_CODES =
    "USD|EUR|Euro|RM|WON|PH|Rupee IN|AUD|R|Yen|AU|BR|UK|CAD|HUF|CZK|TL|AT|RON|Pound|NZD|Rp|EU|Twd|MYR|GBP|HKD|KW|RUB|Baht|PLN|TRY|CNY|JPY|INR|KZT|UZS|AZN|GEL|KGS|TJS|UAH|BYN|AMD|SGD|THB|IDR|PHP|VND|BRL|MXN|ARS|CLP|COP|PEN|AED|SAR|QAR|KWD|BHD|OMR|IRR|EGP|ZAR|NGN|KES|GHS";

/** Currency as standalone word (with spaces) */
const CURRENCY_WORD_PATTERN = new RegExp(`\\s*\\b(${CURRENCY_CODES})\\b\\s*`, "gi");
/** Currency attached after digits, e.g. "50000COP" */
const CURRENCY_AFTER_DIGIT_PATTERN = new RegExp(`(?<=[0-9])(${CURRENCY_CODES})(?=\\s|$|[0-9])`, "gi");
/** Currency attached before digits, e.g. "COP50000" */
const CURRENCY_BEFORE_DIGIT_PATTERN = new RegExp(`(?<=^|\\s)(${CURRENCY_CODES})(?=[0-9])`, "gi");
const DOLLAR_SYMBOL_PATTERN = /\s*\$\s*/g;
const EURO_SYMBOL_PATTERN = /\s*€\s*/g;
const POUND_SYMBOL_PATTERN = /\s*£\s*/g;

/**
 * Strips currency codes (USD, EU, MYR, COP, etc.) and $ symbol from a nominal name string.
 * Handles both standalone ("50000 COP") and attached ("50000COP") formats.
 * Trims leading/trailing spaces and collapses multiple spaces.
 */
function stripCurrencyFromString(name: string): string {
    if (typeof name !== "string") return String(name ?? "");
    return name
        .replace(CURRENCY_WORD_PATTERN, " ")
        .replace(CURRENCY_AFTER_DIGIT_PATTERN, "")
        .replace(CURRENCY_BEFORE_DIGIT_PATTERN, "")
        .replace(DOLLAR_SYMBOL_PATTERN, " ")
        .replace(EURO_SYMBOL_PATTERN, " ")
        .replace(POUND_SYMBOL_PATTERN, " ")
        .replace(/\s+/g, " ")
        .trim();
}

/**
 * Hook that returns a memoized function to remove currency codes from nominal names.
 * Use when displaying nominal labels that come from the backend with embedded currency (e.g. "100 USD", "50 EU").
 */
export function useStripCurrencyFromNominal() {
    return useCallback(stripCurrencyFromString, []);
}

/**
 * Standalone utility (for use outside React components).
 */
export { stripCurrencyFromString };

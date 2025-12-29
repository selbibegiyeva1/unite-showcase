import { useCallback, useMemo, useState } from "react";
import type { FormField } from "./useProductGroupDetailsQuery";

type Errors = Record<string, string>;

function isEmpty(v: unknown) {
    if (v == null) return true;
    if (typeof v === "string") return v.trim() === "";
    return false;
}

type Params = {
    requiredFields: FormField[];
    values: Record<string, any>;
};

export function useCheckoutValidation({ requiredFields, values }: Params) {
    const [submitted, setSubmitted] = useState(false);

    const errors: Errors = useMemo(() => {
        const e: Errors = {};

        for (const f of requiredFields) {
            const raw = values[f.name];

            if (f.type === "options") {
                if (isEmpty(raw)) e[f.name] = "Выберите значение";
            } else {
                if (isEmpty(raw)) e[f.name] = "Обязательное поле";
            }
        }

        if (isEmpty(values.bank)) e.bank = "Выберите банк";
        if (!values.confirmed) e.confirmed = "Подтвердите правильность данных";

        return e;
    }, [requiredFields, values]);

    const showErrors = submitted;

    const validateNow = useCallback(() => {
        setSubmitted(true);
        return Object.keys(errors).length === 0;
    }, [errors]);

    const resetSubmitted = useCallback(() => setSubmitted(false), []);

    return {
        errors,
        showErrors,
        validateNow,
        resetSubmitted,
    };
}

import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useProductGroupDetailsQuery } from "../hooks/product/useProductGroupDetailsQuery";
import type { ProductGroupForms, FormField } from "../hooks/product/useProductGroupDetailsQuery";
import { useCheckoutValidation } from "../hooks/product/useCheckoutValidation";
import { useCheckoutStore } from "../store/checkoutStore";

import { ProductHeader } from "../components/product/ProductHeader";
import FormOne from "../components/product/FormOne";
import FormTwo from "../components/product/FormTwo";
import Total from "../components/product/Total";
import Banks from "../components/product/Banks";

import NewsBlock from "../components/home/NewsBlock";
import Faq from "../components/home/Faq";
import Footer from "../components/layout/Footer";
import ProductLoading from "../components/product/ProductLoading";

export type TopUpMode = "topup" | "voucher";

function Product() {
    const [params] = useSearchParams();
    const group = params.get("group");

    const mode = useCheckoutStore((s) => s.mode);
    const values = useCheckoutStore((s) => s.values);
    const setMode = useCheckoutStore((s) => s.setMode);
    const setValues = useCheckoutStore((s) => s.setValues);

    const banksOpen = useCheckoutStore((s) => s.banksOpen);
    const openBanks = useCheckoutStore((s) => s.openBanks);
    const closeBanks = useCheckoutStore((s) => s.closeBanks);
    const selectBank = useCheckoutStore((s) => s.selectBank);

    const ensureGroup = useCheckoutStore((s) => s.ensureGroup);

    const { data, isLoading, isError, error, refetch, amountTmt, rateQuery } =
        useProductGroupDetailsQuery(group, { mode, productId: values.product_id });

    const forms: ProductGroupForms | null = data?.forms ?? null;

    const groupName = data?.group ?? group ?? "";

    useEffect(() => {
        if (groupName) ensureGroup(groupName);
    }, [groupName, ensureGroup]);

    const voucherAvailable = Boolean(forms?.voucher_fields?.length);
    const topupAvailable = Boolean(forms?.topup_fields?.length);

    const onlyMode =
        voucherAvailable && !topupAvailable ? "voucher" :
            topupAvailable && !voucherAvailable ? "topup" :
                null;

    useEffect(() => {
        if (onlyMode) setMode(onlyMode);
        else if (!voucherAvailable && topupAvailable) setMode("topup");
        else if (!topupAvailable && voucherAvailable) setMode("voucher");
    }, [onlyMode, voucherAvailable, topupAvailable, setMode]);

    const activeFields = useMemo(() => {
        if (!forms) return [];
        return mode === "voucher" ? forms.voucher_fields : forms.topup_fields;
    }, [forms, mode]);

    const nominalLabel = useMemo(() => {
        const productField = activeFields.find((f) => f.name === "product_id");
        const opt = productField?.options?.find((o) => String(o.value) === String(values.product_id));

        return opt?.name ? String(opt.name) : "-";
    }, [activeFields, values.product_id]);

    useEffect(() => {
        setValues((prev) => ({
            ...prev,
            region_value: prev.region_value ?? "",
            region_label: prev.region_label ?? "",
            product_id: prev.product_id ?? null,
            confirmed: prev.confirmed ?? false,
            bank: prev.bank ?? null,
        }));
    }, [mode, setValues]);

    const isSteamTopup = groupName === "Steam" && mode === "topup";

    const steamTopupFields: FormField[] = useMemo(() => ([
        { name: "steam_username", type: "text", label: "Где искать" },
        { name: "email", type: "text", label: "Почта" },
    ]), []);

    const checkoutFields: FormField[] = useMemo(() => {
        if (isSteamTopup) return steamTopupFields;
        return activeFields.filter((f) => f.name !== "region" && f.name !== "product_id");
    }, [activeFields, isSteamTopup, steamTopupFields]);

    const requiredFields: FormField[] = useMemo(() => {
        if (isSteamTopup) return steamTopupFields;

        return activeFields.filter((f) => f.name !== "region" && f.name !== "product_id");
    }, [activeFields, isSteamTopup, steamTopupFields]);

    useEffect(() => {
        if (isLoading) {
            document.title = "Loading...";
            return;
        }

        const name = groupName || group || "Product";
        document.title = `Unite Gaming Shop | ${name}`;
    }, [isLoading, groupName, group]);

    const validation = useCheckoutValidation({ requiredFields, values });

    const showAnyRegionBadge = useMemo(() => {
        if (!forms) return false;

        const fields = mode === "voucher" ? forms.voucher_fields : forms.topup_fields;

        const regionField = fields.find((f) => f.name === "region");
        const regionOptions = regionField?.options ?? [];
        const hasAnyInRegionOptions = regionOptions.some((o) => {
            const name = String(o?.name ?? "").trim().toLowerCase();
            const value = String(o?.value ?? "").trim().toLowerCase();
            return name === "любой" || value === "any";
        });

        return hasAnyInRegionOptions;
    }, [forms, mode]);

    if (isLoading) return (
        <div className="max-lg:px-[48px]">
            <ProductLoading />
        </div>
    );

    if (isError) {
        return (
            <div className="text-white px-4 max-w-255 m-auto">
                <div style={{ color: "red" }}>{(error as Error)?.message ?? "Error"}</div>
                <button type="button" onClick={() => refetch()}>Retry</button>
            </div>
        );
    }

    return (
        <div className="text-white">
            <div className="max-w-255 m-auto px-4 product-page">
                <div className="flex items-start gap-4 pb-15 max-lg:px-[48px] max-medium:flex-col product">
                    <div className="flex flex-col gap-4 w-167 max-medium:w-full">
                        <ProductHeader
                            icon={data?.icon}
                            group={data?.group}
                            short_info={data?.short_info}
                            showAnyRegionBadge={showAnyRegionBadge}
                        />

                        <FormOne
                            groupName={groupName}
                            forms={data!.forms}
                            mode={mode}
                            setMode={setMode}
                            values={values}
                            setValues={setValues}
                        />

                        <FormTwo
                            groupName={groupName}
                            mode={mode}
                            fields={activeFields}
                            values={values}
                            setValues={setValues}
                            errors={validation.errors}
                            showErrors={validation.showErrors}
                        />
                    </div>

                    <div className="sticky top-0">
                        <Total
                            groupName={groupName}
                            mode={mode}
                            fields={checkoutFields}
                            values={values}
                            setValues={setValues}
                            amountTmt={amountTmt}
                            topupUsd={rateQuery.data?.topup_amount_usd ?? null}
                            rateLoading={rateQuery.isLoading}
                            rateError={rateQuery.isError}
                            nominalLabel={nominalLabel}
                            onOpenBanks={openBanks}
                            errors={validation.errors}
                            showErrors={validation.showErrors}
                            onValidate={validation.validateNow}
                        />
                    </div>
                </div>

                <Banks
                    isOpen={banksOpen}
                    onClose={closeBanks}
                    selectedBank={values.bank ?? null}
                    onSelect={(bank) => {
                        selectBank(bank);
                        validation.resetSubmitted();
                    }}
                />

                <div className="pb-15 max-lg:px-[48px] product"><NewsBlock /></div>
                <div className="pb-46 max-lg:px-[48px] product"><Faq /></div>
            </div>
            <Footer />
        </div>
    );
}

export default Product;

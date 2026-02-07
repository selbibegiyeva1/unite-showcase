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
import PHYSICAL_PRODUCTS from "../data/physicalProducts.json";

export type TopUpMode = "topup" | "voucher";

function Product() {
    const [params] = useSearchParams();
    const group = params.get("group");
    const productParam = params.get("product");

    const mode = useCheckoutStore((s) => s.mode);
    const values = useCheckoutStore((s) => s.values);
    const setMode = useCheckoutStore((s) => s.setMode);
    const setValues = useCheckoutStore((s) => s.setValues);

    const banksOpen = useCheckoutStore((s) => s.banksOpen);
    const openBanks = useCheckoutStore((s) => s.openBanks);
    const closeBanks = useCheckoutStore((s) => s.closeBanks);
    const selectBank = useCheckoutStore((s) => s.selectBank);

    const ensureGroup = useCheckoutStore((s) => s.ensureGroup);

    const isPhysicalProduct = group === "Физ. товары";
    
    const physicalProduct = useMemo(() => {
        if (!isPhysicalProduct || !productParam) return null;
        return PHYSICAL_PRODUCTS.find((p) => p.name === productParam) ?? null;
    }, [isPhysicalProduct, productParam]);

    const { data, isLoading, isError, error, refetch, amountTmt: backendAmountTmt, rateQuery } =
        useProductGroupDetailsQuery(isPhysicalProduct ? null : group, { mode, productId: values.product_id });

    const forms: ProductGroupForms | null = isPhysicalProduct ? {
        voucher_fields: [
            {
                name: "product_id",
                type: "options",
                label: "Доступные вариант",
                options: physicalProduct ? (
                    physicalProduct.nominals.length > 0
                        ? physicalProduct.nominals.map((nominal) => ({
                            name: nominal,
                            value: nominal,
                            price: physicalProduct.price,
                        }))
                        : [{ name: physicalProduct.name, value: physicalProduct.name, price: physicalProduct.price }]
                ) : [],
            },
        ],
        topup_fields: [],
    } : (data?.forms ?? null);

    const groupName = isPhysicalProduct ? "Физ. товары" : (data?.group ?? group ?? "");

    // Calculate amountTmt for physical products
    const amountTmt = useMemo(() => {
        if (!isPhysicalProduct) return backendAmountTmt;
        if (!physicalProduct || !values.product_id) return null;
        
        const productField = forms?.voucher_fields?.find((f) => f.name === "product_id");
        const selectedOption = productField?.options?.find((o) => String(o.value) === String(values.product_id));
        
        return typeof selectedOption?.price === "number" ? selectedOption.price : null;
    }, [isPhysicalProduct, physicalProduct, values.product_id, forms, backendAmountTmt]);

    useEffect(() => {
        if (groupName) ensureGroup(groupName);
    }, [groupName, ensureGroup]);

    const voucherAvailable = Boolean(forms?.voucher_fields?.length);
    const topupAvailable = Boolean(forms?.topup_fields?.length);

    const isRoblox = groupName === "Roblox";

    const onlyMode =
        isRoblox ? "voucher" :
        voucherAvailable && !topupAvailable ? "voucher" :
            topupAvailable && !voucherAvailable ? "topup" :
                null;

    useEffect(() => {
        if (isRoblox) {
            setMode("voucher");
        } else if (onlyMode) {
            setMode(onlyMode);
        } else if (!voucherAvailable && topupAvailable) {
            setMode("topup");
        } else if (!topupAvailable && voucherAvailable) {
            setMode("voucher");
        }
    }, [isRoblox, onlyMode, voucherAvailable, topupAvailable, setMode]);

    const activeFields = useMemo(() => {
        if (!forms) return [];
        return mode === "voucher" ? forms.voucher_fields : forms.topup_fields;
    }, [forms, mode]);

    const nominalLabel = useMemo(() => {
        if (isPhysicalProduct) {
            const productField = activeFields.find((f) => f.name === "product_id");
            const opt = productField?.options?.find((o) => String(o.value) === String(values.product_id));
            return opt?.name ? String(opt.name) : (physicalProduct?.name ?? "-");
        }
        const productField = activeFields.find((f) => f.name === "product_id");
        const opt = productField?.options?.find((o) => String(o.value) === String(values.product_id));

        return opt?.name ? String(opt.name) : "-";
    }, [activeFields, values.product_id, isPhysicalProduct, physicalProduct]);

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
        if (isPhysicalProduct) {
            return [{ name: "phone", type: "text", label: "Номер телефона" }];
        }
        if (isSteamTopup) return steamTopupFields;

        return activeFields.filter((f) => f.name !== "region" && f.name !== "product_id");
    }, [activeFields, isSteamTopup, steamTopupFields, isPhysicalProduct]);

    useEffect(() => {
        if (isPhysicalProduct) {
            const name = physicalProduct?.name || groupName || "Product";
            document.title = `Unite Gaming Shop | ${name}`;
            return;
        }

        if (isLoading) {
            document.title = "Loading...";
            return;
        }

        const name = groupName || group || "Product";
        document.title = `Unite Gaming Shop | ${name}`;
    }, [isLoading, groupName, group, isPhysicalProduct, physicalProduct]);

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

    useEffect(() => {
        if (isPhysicalProduct && physicalProduct && !values.product_id && forms) {
            const productField = forms.voucher_fields?.find((f) => f.name === "product_id");
            const firstOption = productField?.options?.[0];
            if (firstOption) {
                setValues((prev) => ({
                    ...prev,
                    product_id: firstOption.value,
                }));
            }
        }
    }, [isPhysicalProduct, physicalProduct, values.product_id, forms, setValues]);

    if (!isPhysicalProduct && isLoading) return (
        <div className="max-lg:px-[48px]"> 
            <ProductLoading />
        </div>
    );

    if (!isPhysicalProduct && isError) {
        return (
            <div className="text-white px-4 max-w-255 m-auto">
                <div style={{ color: "red" }}>{(error as Error)?.message ?? "Error"}</div>
                <button type="button" onClick={() => refetch()}>Retry</button>
            </div>
        );
    }

    if (isPhysicalProduct && !physicalProduct) {
        return (
            <div className="text-white px-4 max-w-255 m-auto">
                <div style={{ color: "red" }}>Product not found</div>
            </div>
        );
    }

    return (
        <div className="text-white px-4 max-lg:px-0">
            <div className="max-w-255 m-auto product-page">
                <div className="flex items-start gap-4 pb-15 max-lg:px-[48px] max-medium:flex-col product">
                    <div className="flex flex-col gap-4 w-167 max-medium:w-full">
                        <ProductHeader
                            icon={isPhysicalProduct && physicalProduct ? physicalProduct.src : data?.icon}
                            group={isPhysicalProduct && physicalProduct ? physicalProduct.name : groupName}
                            short_info={isPhysicalProduct && physicalProduct ? physicalProduct.description : (data?.short_info ?? "")}
                            showAnyRegionBadge={showAnyRegionBadge}
                        />

                        <FormOne
                            groupName={groupName}
                            forms={forms!}
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
                        isPhysicalProduct={isPhysicalProduct}
                    />
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
                <div className="pb-46 max-lg:px-[48px] product"><Faq groupName={groupName} mode={mode} /></div>
            </div>
            <Footer />
        </div>
    );
}

export default Product;

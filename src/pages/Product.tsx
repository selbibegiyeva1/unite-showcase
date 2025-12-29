import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProductGroupDetailsQuery } from "../hooks/product/useProductGroupDetailsQuery";
import type { ProductGroupForms, FormField } from "../hooks/product/useProductGroupDetailsQuery";

import { ProductHeader } from "../components/product/ProductHeader";
import FormOne from "../components/product/FormOne";
import FormTwo from "../components/product/FormTwo";
import Total from "../components/product/Total";
import Banks from "../components/product/Banks";

import News from "../components/home/News";
import Faq from "../components/home/Faq";
import Footer from "../components/layout/Footer";

export type TopUpMode = "topup" | "voucher";

function Product() {
    const [params] = useSearchParams();
    const group = params.get("group");

    const [mode, setMode] = useState<TopUpMode>("topup");
    const [values, setValues] = useState<Record<string, any>>({});
    const [banksOpen, setBanksOpen] = useState(false);

    const { data, isLoading, isError, error, refetch, amountTmt, rateQuery } =
        useProductGroupDetailsQuery(group, { mode, productId: values.product_id });

    const forms: ProductGroupForms | null = data?.forms ?? null;

    const voucherAvailable = Boolean(forms?.voucher_fields?.length);
    const topupAvailable = Boolean(forms?.topup_fields?.length);

    const onlyMode: TopUpMode | null =
        voucherAvailable && !topupAvailable ? "voucher" :
            topupAvailable && !voucherAvailable ? "topup" :
                null;

    useEffect(() => {
        if (onlyMode) setMode(onlyMode);
        else if (!voucherAvailable && topupAvailable) setMode("topup");
        else if (!topupAvailable && voucherAvailable) setMode("voucher");
    }, [onlyMode, voucherAvailable, topupAvailable]);


    const activeFields = useMemo(() => {
        if (!forms) return [];
        return mode === "voucher" ? forms.voucher_fields : forms.topup_fields;
    }, [forms, mode]);

    useEffect(() => {
        setValues((prev) => ({
            ...prev,
            region: prev.region ?? "",
            product_id: prev.product_id ?? null,
        }));
    }, [mode]);

    useEffect(() => {
        if (isLoading) {
            document.title = "Loading...";
            return;
        }
        const name = data?.group ?? group ?? "Product";
        document.title = `Unite Gaming Shop | ${name}`;
    }, [isLoading, data?.group, group]);

    const showAnyRegionBadge = useMemo(() => {
        if (!forms) return false;

        const checkFields = (fields: any[]) => {
            const regionField = fields?.find((f) => f.name === "region");
            const opts = regionField?.options ?? [];
            if (opts.length !== 1) return false;

            return String(opts[0]?.name ?? "") === "Любой";
        };

        return checkFields(forms.topup_fields) || checkFields(forms.voucher_fields);
    }, [forms]);

    const groupName = data?.group ?? group ?? "";

    const checkoutFields: FormField[] = useMemo(() => {
        return activeFields.filter((f) => f.name !== "region" && f.name !== "product_id");
    }, [activeFields]);

    if (isLoading) return <div className="text-white px-4 max-w-255 m-auto">Loading…</div>;

    if (isError) {
        return (
            <div className="text-white px-4 max-w-255 m-auto">
                <div style={{ color: "red" }}>{(error as Error)?.message ?? "Error"}</div>
                <button type="button" onClick={() => refetch()}>Retry</button>
            </div>
        );
    }

    return (
        <div className="text-white px-4">
            <div className="max-w-255 m-auto">
                <div className="flex items-start gap-4 pb-15">
                    <div className="flex flex-col gap-4 w-167">
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
                        />
                    </div>

                    <Total
                        groupName={groupName}
                        mode={mode}
                        fields={checkoutFields}
                        values={values}
                        amountTmt={amountTmt}
                        topupUsd={rateQuery.data?.topup_amount_usd ?? null}
                        rateLoading={rateQuery.isLoading}
                        rateError={rateQuery.isError}
                        onOpenBanks={() => setBanksOpen(true)}
                    />
                </div>

                <Banks
                    isOpen={banksOpen}
                    onClose={() => setBanksOpen(false)}
                    selectedBank={values.bank ?? null}
                    onSelect={(bank) => {
                        setValues((prev) => ({ ...prev, bank }));
                        setBanksOpen(false);
                    }}
                />

                <div className="pb-15"><News /></div>
                <div className="pb-46"><Faq /></div>
            </div>
            <Footer />
        </div>
    );
}

export default Product;

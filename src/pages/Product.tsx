import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useProductGroupDetailsQuery } from "../hooks/product/useProductGroupDetailsQuery";
import { ProductHeader } from "../components/product/ProductHeader";

import Total from "../components/product/Total";

import News from "../components/home/News";
import Faq from "../components/home/Faq";
import Footer from "../components/layout/Footer";

function Product() {
    const [params] = useSearchParams();
    const group = params.get("group");

    const { data, isLoading, isError, error, refetch } = useProductGroupDetailsQuery(group);

    useEffect(() => {
        if (isLoading) {
            document.title = "Loading...";
            return;
        }

        const name = data?.group ?? group ?? "Product";
        document.title = `Unite Gaming Shop | ${name}`;
    }, [isLoading, data?.group, group]);

    if (isLoading) {
        return <div className="text-white px-4 max-w-255 m-auto">Loading…</div>;
    }

    if (isError) {
        return (
            <div className="text-white px-4 max-w-255 m-auto">
                <div style={{ color: "red" }}>{(error as Error)?.message ?? "Error"}</div>
                <button type="button" onClick={() => refetch()}>
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="text-white px-4">
            <div className="max-w-255 m-auto">
                <div className="flex items-start gap-4 pb-15">
                    <ProductHeader icon={data?.icon} group={data?.group} short_info={data?.short_info} />
                    <Total />
                </div>
                
                <div className="pb-15">
                    <News />
                </div>

                <div className="pb-46">
                    <Faq />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Product;

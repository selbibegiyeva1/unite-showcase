import { useSearchParams } from "react-router-dom";
import { useProductGroupDetailsQuery } from "../hooks/product/useProductGroupDetailsQuery";

function Product() {
    const [params] = useSearchParams();
    const group = params.get("group");

    const { data, isLoading, isError, error, refetch } = useProductGroupDetailsQuery(group);

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
                <div className="flex items-center gap-3">
                    <img src={data?.icon} alt={data?.group} style={{ width: 32, height: 32 }} />
                    <h1 className="text-2xl font-bold">{data?.group}</h1>
                </div>

                <p className="mt-3 text-white/80 max-w-3xl">{data?.short_info}</p>
            </div>
        </div>
    );
}

export default Product;

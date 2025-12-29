import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const baseColor = "#2F2F33";
const highlightColor = "#47474e";

function ProductLoading() {
    return (
        <div className="text-white px-4">
            <div className="max-w-255 m-auto">
                <div className="flex items-start gap-4 pb-15">
                    <div className="flex flex-col gap-4 w-167">
                        <div className="bg-[#1D1D22] rounded-4xl px-8 pt-8 pb-11">
                            <div className="flex items-center gap-7.25">
                                <div className="w-40 h-40">
                                    <Skeleton baseColor={baseColor} borderRadius={15} highlightColor={highlightColor} height="100%" />
                                </div>

                                <div className="flex-1">
                                    <Skeleton baseColor={baseColor} borderRadius={8} highlightColor={highlightColor} height={28} width="65%" />
                                    <div className="mt-2">
                                        <Skeleton baseColor={baseColor} highlightColor={highlightColor} height={28} width={220} borderRadius={8} />
                                    </div>
                                    <div className="mt-4.5">
                                        <Skeleton baseColor={baseColor} highlightColor={highlightColor} height={16} width="95%" />
                                        <div className="mt-0.5">
                                            <Skeleton baseColor={baseColor} highlightColor={highlightColor} height={16} width="80%" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#1D1D22] rounded-4xl p-8 flex flex-col gap-8">
                            <div>
                                <Skeleton baseColor={baseColor} highlightColor={highlightColor} borderRadius={8} height={26} width={320} />
                                <div className="mt-4 flex gap-3">
                                    <Skeleton baseColor={baseColor} highlightColor={highlightColor} height={40} width={150} borderRadius={8} />
                                    <Skeleton baseColor={baseColor} highlightColor={highlightColor} height={40} width={150} borderRadius={8} />
                                </div>
                            </div>

                            <div>
                                <Skeleton baseColor={baseColor} highlightColor={highlightColor} borderRadius={8} height={26} width={220} />
                                <div className="mt-4">
                                    <Skeleton baseColor={baseColor} highlightColor={highlightColor} height={48} borderRadius={8} />
                                </div>
                            </div>

                            <div>
                                <Skeleton baseColor={baseColor} borderRadius={8} highlightColor={highlightColor} height={26} width={220} />
                                <div className="mt-4 flex gap-3 flex-wrap">
                                    {Array.from({ length: 7 }).map((_, i) => (
                                        <Skeleton
                                            key={i}
                                            baseColor={baseColor}
                                            highlightColor={highlightColor}
                                            height={40}
                                            width={110}
                                            borderRadius={8}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#1D1D22] rounded-4xl p-8">
                            <Skeleton baseColor={baseColor} highlightColor={highlightColor} borderRadius={8} height={26} width={280} />

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i}>
                                        <Skeleton baseColor={baseColor} borderRadius={8} highlightColor={highlightColor} height={16} width={120} />
                                        <div className="mt-3">
                                            <Skeleton baseColor={baseColor} borderRadius={8} highlightColor={highlightColor} height={48} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="w-84 bg-[#1D1D22] rounded-4xl px-6 py-8">
                        <Skeleton baseColor={baseColor} borderRadius={8} highlightColor={highlightColor} height={26} width={120} />

                        <div className="mt-4 rounded-[10px]">
                            <Skeleton baseColor={baseColor} borderRadius={8} highlightColor={highlightColor} height={48} />
                        </div>
                        <div className="mt-2">
                            <Skeleton baseColor={baseColor} highlightColor={highlightColor} borderRadius={8} height={16} width={160} />
                        </div>

                        <div className="mt-6 space-y-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <Skeleton baseColor={baseColor} highlightColor={highlightColor} borderRadius={8} height={20} width={110} />
                                    <Skeleton baseColor={baseColor} highlightColor={highlightColor} borderRadius={8} height={20} width={120} />
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            <Skeleton baseColor={baseColor} highlightColor={highlightColor} borderRadius={8} height={22} width={80} />
                            <Skeleton baseColor={baseColor} highlightColor={highlightColor} borderRadius={8} height={22} width={120} />
                        </div>

                        <div className="mt-4 rounded-[10px]">
                            <Skeleton baseColor={baseColor} highlightColor={highlightColor} borderRadius={8} height={48} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductLoading;

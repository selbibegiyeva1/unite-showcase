function FormTwo() {
    return (
        <div className="p-8 bg-[#1D1D22] rounded-4xl">
            <b className="text-[24px]">Оформление покупки</b>

            <div className="mt-4">
                <p className="text-[#FFFFFF99] text-[14px] mb-3">Email</p>
                <input
                    type="text"
                    placeholder="Email"
                    className="w-full border border-[#FFFFFF1A] outline-0 rounded-2xl appearance-none text-[14px] font-medium px-4 py-3.5"
                />
            </div>
        </div>
    )
}

export default FormTwo
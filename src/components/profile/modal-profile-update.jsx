export default function ModalProfileUpdate({ isOpen, onDismiss, children }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="relative z-10"
            aria-labelledby="crop-image-dialog"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-all backdrop-blur-sm"></div>

            <div className="fixed inset-0 z-10 flex justify-center text-center w-screen h-full pt-24 pb-4 px-2 md:p-24">
                <div className="relative bg-slate-100 text-black w-[95%] rounded-2xl p-4 transition-all">
                    <div className="w-full h-full md:p-4 overflow-y-scroll">
                        <p
                            className={`absolute top-[-10px] right-[-10px] flex items-center justify-center bg-slate-100 text-mw_black
                                w-[25px] h-[25px] border-[1px] border-black rounded-full hover:bg-mw_white hover:text-mw_red cursor-pointer`}
                            onClick={onDismiss}
                        >
                            ✖
                        </p>

                        <div className="flex justify-center items-center w-full mb-3 border-b-2 border-mw_olive">
                            <p className="text-xl font-bold py-2">
                                Update Profile Information
                            </p>
                        </div>

                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

import { AiOutlineClose } from "react-icons/ai";
import InviteClientsSingle from "./InviteClientsSingle";
import InviteClientsGroup from "./InviteClientsGroup";


export default function ModalInviteClients({ isOpen, onDismiss, children }) {
    if (!isOpen) {
        return null;
    };

    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black
                bg-opacity-75 w-screen h-screen z-50"
            onClick={onDismiss}
        >
            <div
                className="relative flex flex-col bg-white text-mw_black rounded-xl border-t-8
                    border-mw_olive w-[90%] h-[80%] p-2"
                onClick={(event) => event.stopPropagation()}
            >
                <AiOutlineClose
                    className="absolute right-4 top-3 text-2xl text-mw_red cursor-pointer"
                    onClick={onDismiss}
                />
                <div className="flex justify-center items-center w-full mb-3 border-b-2 border-mw_olive">
                    <p className="text-xl font-bold py-2">
                        Invite Clients
                    </p>
                </div>

                <div className="flex items-stretch justify-between h-[95%] xl:flex-row sm:flex-col overflow-y-scroll">
                    <div className="flex xl:w-[45%] sm:w-full">
                        <InviteClientsSingle />
                    </div>

                    <div className="flex justify-center items-center text-3xl max-h-[95%] xl:w-[10%] sm:w-full">
                        - OR -
                    </div>

                    <div className="flex xl:w-[45%] sm:w-full">
                        <InviteClientsGroup />
                    </div>
                </div>
            </div>
        </div>
    );
};

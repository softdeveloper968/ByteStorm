import { AiOutlineClose } from "react-icons/ai";

export default function ModalProfileUpdate({ isOpen, onDismiss, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black
                bg-opacity-75 w-screen h-screen z-50"
      onClick={onDismiss}
    >
      <div
        className="flex flex-col relative bg-white text-mw_black rounded-xl border-t-8
                    border-mw_olive w-[80%] h-[80%] p-2"
        onClick={(event) => event.stopPropagation()}
      >
        <AiOutlineClose
          className="absolute right-4 top-3 text-2xl text-mw_red cursor-pointer"
          onClick={onDismiss}
        />
        <div className="flex justify-center items-center w-full mb-3 border-b-2 border-mw_olive">
          <p className="text-xl font-bold py-2">Update Profile Information</p>
        </div>

        {children}
      </div>
    </div>
  );
};

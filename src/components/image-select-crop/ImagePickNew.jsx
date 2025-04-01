"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const placeholderImage = "/images/placeholder-transparent.png";

export default function ImagePicker({ currentImage, setPick, label, name }) {
    const [image, setImage] = useState(currentImage || placeholderImage);
    const [modalOpen, setModalOpen] = useState(false);
    const imageImput = useRef();

    // Use ref to pass file input functionality to custom button
    // since default file input is hidden.
    const handleImagePick = () => {
        imageImput.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (!file) {
            setImage(null);

            return;
        };

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setImage(fileReader.result);
            setPick(file);
        };

        fileReader.readAsDataURL(file);
    };

    return (
        <main className="text-mw_black">
            <p className="text-lg text-center w-full mb-4">
                {label}
            </p>

            <div className="flex flex-col items-center">
                <div className="flex justify-center items-center bg-white border-mw_gray border-2 w-96 h-96">
                    {!image &&
                        <p className="text-center">
                            No image selected.
                        </p>
                    }

                    {image &&
                        <Image
                            className="w-full h-full object-contain"
                            src={image}
                            alt={image}
                            width={0}
                            height={0}
                            sizes="100vh"
                        />
                    }
                </div>

                {/* <input
                    type="file"
                    id={name}
                    name={name}
                    className="hidden"
                    ref={imageImput}
                    onChange={handleImageChange}
                    accept="image/png, image/jpeg, image/jpg"
                // required
                /> */}

                <button
                    type="button"
                    className="bg-white text-xl border-mw_gray border-2 rounded-xl mt-8 px-3 py-2 hover:bg-mw_gray cursor-pointer"
                    onClick={() => setModalOpen(true)}
                >
                    Select an Image
                </button>

                <p className="text-[12px] mt-2 text-mw_red">
                    We recommend 1,000 x 1,000 pixels minimum.
                </p>
            </div>
        </main>
    );
};

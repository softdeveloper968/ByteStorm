"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function PostImagePicker({ label, name }) {
  const [image, setImage] = useState();
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
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <main>
      <p className="text-lg font-bold uppercase text-center w-full mb-4">
        {label}
      </p>

      <div className="flex flex-col items-center">
        <div className="flex justify-center items-center w-96 h-96 border-mw_olive border-2">
          {!image && <p className="text-center">No image selected.</p>}

          {image && (
            <Image
              className="w-full h-full object-contain"
              src={image}
              alt={image}
              width={0}
              height={0}
              sizes="100vh"
            />
          )}
        </div>

        <input
          type="file"
          id={name}
          name={name}
          className="hidden border-2 border-mw_red"
          ref={imageImput}
          onChange={handleImageChange}
          accept="image/png, image/jpeg, image/jpg"
          required
        />

        <button
          type="button"
          className="
                        bg-mw_green
						text-xl
						border-mw_green
						border-2
						rounded-xl
                        mt-8
						px-3
						py-2
						hover:bg-mw_olive
						cursor-pointer
					"
          onClick={handleImagePick}
        >
          Pick Image
        </button>
      </div>
    </main>
  );
};

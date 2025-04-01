"use client";

import { Slider } from "@mui/material";
import Image from "next/image";
import { useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { createCroppedImage, getCroppedImage } from "./image-crop-helpers";

export default function ImageCropComponent({
  image,
  setImage,
  setImageFile,
  closeModal,
}) {
  const imageInput = useRef();

  const [previewImage, setPreviewImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  // Use ref to pass file input functionality to custom button
  // since default file input is hidden.
  const handleImagePick = () => {
    imageInput.current.click();
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

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCropReset = (event) => {
    event.preventDefault();

    setCrop({ x: 0, y: 0 });
    setRotation(0);
    setZoom(1);
    setCroppedImage(null);
    setPreviewImage(null);
  };

  const showCroppedImage = async (event) => {
    event.preventDefault();

    try {
      const croppedImage = await getCroppedImage(
        image,
        croppedAreaPixels,
        rotation,
      );

      console.log("image cropped", { croppedImage });
      setPreviewImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCrop = async (event) => {
    event.preventDefault();

    try {
      const croppedImage = await createCroppedImage(
        image,
        croppedAreaPixels,
        rotation,
      );

      setImage(previewImage);
      setImageFile(croppedImage); // Send the cropped image to parent
      closeModal(); // Close the modal after crop
      setCroppedImage(null);
    } catch (e) {
      console.error(e);
    }
  };

  const onClose = () => {
    setCroppedImage(null);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mb-8">
        <h2 className="mb-2">Instructions:</h2>
        <h4>1. Select image from local files.</h4>
        <h4>2. Adjust image zoom, rotation and placement.</h4>
        <h4>3. Use Preview button to view adjusted image.</h4>
        <h4>4. If necessary, use Reset Image button to start adjusts over.</h4>
        <h4>5. Press Use Image button if satisfied with result.</h4>
      </div>

      <div className="flex flex-col items-center mb-8">
        <input
          type="file"
          className="hidden"
          ref={imageInput}
          onChange={handleImageChange}
          accept="image/png, image/jpeg, image/jpg"
        />

        <button
          type="button"
          className="bg-mw_green text-lg text-mw_black text-center font-bold rounded-xl w-48 px-4 py-2 hover:bg-mw_olive cursor-pointer"
          onClick={handleImagePick}
        >
          (1) Select Image
        </button>
      </div>

      <div className="flex flex-col items-center w-full">
        <h3 className="mb-4">(2) Adjust Image</h3>

        <div className="w-3/4 h-[400px]">
          <Cropper
            image={image}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={1 / 1}
            restrictPosition={false}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style={{
              containerStyle: {
                width: "100%",
                height: "100%",
                position: "relative",
              },
              cropAreaStyle: {
                border: "2px solid #fff",
              },
            }}
          />
        </div>
      </div>

      <div className="flex flex-col w-3/4 mt-6 gap-y-8">
        <div className="flex w-full gap-x-8">
          <h3 className="w-32">Zoom</h3>

          <Slider
            value={zoom}
            min={-1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e, zoom) => setZoom(zoom)}
            sx={{
              width: "100%",
              color: "green", // Change the main color of the slider
              "& .MuiSlider-thumb": {
                width: 20, // Set width for rectangular shape
                height: 40, // Set height for rectangular shape
                backgroundColor: "white", // Background color of the thumb
                borderRadius: 2, // Make the thumb rectangular
                border: "2px solid currentColor", // Thumb border
                "&:hover": {
                  boxShadow: "0px 0px 0px 8px rgba(0, 255, 0, 0.16)", // Hover effect
                },
              },
              "& .MuiSlider-track": {
                height: 8,
              },
              "& .MuiSlider-rail": {
                height: 12,
                opacity: 0.5,
              },
            }}
          />
        </div>

        <div className="flex gap-x-8">
          <h3 className="w-32">Rotation</h3>

          <Slider
            value={rotation}
            min={0}
            max={360}
            step={1}
            aria-labelledby="Rotation"
            onChange={(e, rotation) => setRotation(rotation)}
            sx={{
              width: "100%",
              color: "green",
              "& .MuiSlider-thumb": {
                width: 20,
                height: 40,
                backgroundColor: "white",
                borderRadius: 2,
                border: "2px solid currentColor",
                "&:hover": {
                  boxShadow: "0px 0px 0px 8px rgba(0, 255, 0, 0.16)",
                },
              },
              "& .MuiSlider-track": {
                height: 8,
              },
              "& .MuiSlider-rail": {
                height: 12,
                opacity: 0.5,
              },
            }}
          />
        </div>
      </div>

      {/* Crop Button */}
      <div className="flex justify-center w-full gap-x-8 mt-8">
        <button
          className="bg-mw_green text-lg text-mw_black text-center font-bold rounded-xl w-48 px-4 py-2 hover:bg-mw_olive cursor-pointer"
          onClick={showCroppedImage}
        >
          (3) Preview Image
        </button>

        <button
          className="bg-mw_green text-lg text-mw_black text-center font-bold rounded-xl w-48 px-4 py-2 hover:bg-mw_olive cursor-pointer"
          onClick={onCropReset}
        >
          (4) Reset Image
        </button>

        <button
          className={`bg-mw_green text-lg text-mw_black text-center font-bold rounded-xl w-48 px-4 py-2
						${previewImage ? "hover:bg-mw_olive cursor-pointer" : "cursor-not-allowed opacity-50"}`}
          onClick={handleCrop}
          disabled={!previewImage}
        >
          {previewImage ? "(5) Use Image" : "Click Preview"}
        </button>
      </div>

      <div className="flex flex-col mt-8 mb-36">
        <h3 className="text-center mb-6">Preview Finished Image</h3>

        <div className="w-[300px] h-[300px] flex items-center justify-center">
          {previewImage ? (
            <Image
              className="w-full h-full object-contain"
              src={previewImage}
              alt="Preview Image"
              width={300}
              height={300}
            />
          ) : (
            <div className="w-full h-full bg-lime-200 flex items-center justify-center">
              <p className="text-lg text-black">No image ready</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

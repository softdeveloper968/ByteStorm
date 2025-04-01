"use client";

import { BottomNavigationBar } from "@/app/list-a-home/common/BottomNavigationBar";
import { useSession } from "next-auth/react";
import React from "react";
import { AiOutlinePicture, AiTwotonePicture } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

async function uploadPicture(body) {
  const response = await fetch("/api/aws", {
    method: "POST",
    body: body,
  });
  return response.json();
}

const AddPhotos = ({ setListingState, setListingData, data, editSection }) => {
  function clean() {
    const newData = { ...data };
    newData.photos = newData.photos.filter((photo) => photo !== undefined);
    setListingData(newData);
  }

  const { data: session } = useSession();
  const deletePicture = (fileName) => {
    const newData = { ...data };
    newData.photos = newData.photos.filter(
      (photo) => photo !== fileName && photo !== undefined,
    );
    fetch(`/api/aws?file=${fileName}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) setListingData(newData);
    });
  };

  const addPictures = (files) => {
    let newPhotos = [...data.photos];
    let formData = new FormData();
    const user = session?.user._id;
    formData.set("user", user);
    try { // to add multiples files
      files.forEach((file) => {
        formData.append("file", file);
      });
    } catch (err) { // add only one
      formData.append("file", files);
    }
    const newData = { ...data };
    uploadPicture(formData).then((response) => {
      newPhotos.push(response.url);
      newData.photos = newPhotos;
      setListingData(newData);
    });
    clean();
  };

  function dropHandler(ev) {
    ev.preventDefault();
    if (ev.dataTransfer.items) {
      [...ev.dataTransfer.items].forEach((item, i) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          addPictures(file);
        }
      });
    }
    clean();
  }

  function swapPictures(currentId, e) {
    const receiverId = Number(e.dataTransfer.getData("idObject"))
    let newOrder = [...data.photos];
    const temp = newOrder.at(Number(currentId));
    newOrder[currentId] = newOrder[receiverId];
    newOrder[receiverId] = temp;
    const newData = { ...data };
    newData.photos = [...newOrder];
    setListingData(newData);
  }

  const pictureStyle = {
    aspectRatio: 1, position: "relative" };
  return (
    <div>
      <h2>Add Photos</h2>
      <input
        type={"file"}
        id={"uploader"}
        style={{ display: "none" }}
        onChange={(e) => addPictures(e.target.files[0])}
      />
      <div
        className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12"}
        onDragOver={(e) => e.preventDefault()}
      >
        {data.photos.map((photo, index) => (
          <div
            key={"photo" + index}
            style={pictureStyle}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              swapPictures(index, e);
            }}
          >
            <img
              src={photo}
              alt={"photo" + index}
              id={index}
              style={{ aspectRatio: 1, cursor: "grab", objectFit: "cover" }}
              draggable={true}
              key={"photo" + index}
              className={"object-cover w-full h-full"}
              onTouchStart={(e) => {
                e.dataTransfer.setData("idObject", index);
              }}
              onDragStart={(e) => {
                e.dataTransfer.setData("idObject", index);
              }}
            />
            {index === 0 && (
              <div style={{ position: "absolute" }}>
                <span className={"font-bold"}>Primary photo</span>
              </div>
            )}
            <MdDelete
              className={"shadow-2xl"}
              style={{
                position: "absolute",
                right: "1rem",
                cursor: "pointer",
                top: "1rem",
              }}
              color={"red"}
              size={"1.5rem"}
              onClick={(e) => {
                deletePicture(photo);
              }}
            />
          </div>
        ))}
        <AddPhotosDiv
          style={pictureStyle}
          onDrop={(e) => {
            dropHandler(e);
          }}
        />
      </div>
      {!editSection && (
        <BottomNavigationBar
          setListingState={setListingState}
          data={data}
          setListingData={setListingData}
        />
      )}
    </div>
  );
};
export default AddPhotos;

const AddPhotosDiv = (props) => {
  return (
    <div
      className={"flex flex-col items-center justify-center border-2 p-4"}
      onDragOver={(e) => e.preventDefault()}
      onDrop={props.onDrop}
      style={props.style}
      onClick={() => triggerPicturesAdd()}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{}}>
          <AiOutlinePicture
            size={200}
            style={{
              transform: "rotate(-5deg)",
              color: "rgba(217, 217, 217, 1)",
            }}
          />
        </div>
        <div style={{ position: "absolute" }}>
          <AiTwotonePicture
            size={200}
            style={{
              transform: "rotate(10deg)",
              color: "rgba(217, 217, 217, 1)",
            }}
          />
        </div>
      </div>
      <p>Drag and drop photos here to upload.</p>
      <AddPhotoButton />
    </div>
  );
};

const AddPhotoButton = () => (
  <button
    style={{
      borderRadius: "5px",
      fontFamily: "Roboto",
      backgroundColor: "rgb(0, 123, 255)",
      color: "white",
    }}
    className={"py-2 px-4"}
  >
    Add New Photo
  </button>
);

const triggerPicturesAdd = () => {
  document.getElementById("uploader").click();
};

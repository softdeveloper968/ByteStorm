import React from "react";

export const Notification = (props) => (
  <div
    className={
      "flex flex-col justify-center items-center w-full py-8 mb-2 text-center"
    }
    style={{
      backgroundColor: "rgba(209, 238, 0, 1)",
    }}
  >
    <h2 className={"mb-2"}>
      {props.new
        ? "Congratulations! Your new listing was successfully submitted!"
        : props.edit
          ? "Congratulations! Your listing was successfully edited!"
          : "Listing Successfully deleted."}
    </h2>
    <h4>
      {props.new
        ? "Listing is currently pending. A confirmation email with additional information will be sent to the email on file."
        : props.edit
          ? "The new status of your listing where saved and being displayed on all the platform."
          : "This operation cannot be undone."}
    </h4>
  </div>
);
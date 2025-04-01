import { useState } from "react";

export const Button = (props) => {
  const handleClick = () => {
    if (["Next", "Submit"].includes(props.link)) {
      let unfilledElements = 0;
      document.querySelectorAll(".required-container").forEach((el) => {
        let input = el.getElementsByTagName("input")[0];
        if (!input) {
          input = el.getElementsByTagName("textarea")[0];
        }
        let small = el.getElementsByTagName("small")[0];
        if (
          (!input.value ||
            input.value === "$ 0" ||
            input.value === "0" ||
            input.getAttribute("data-valid") === "false") &&
          input.hasAttribute("required")
        ) {
          if (unfilledElements === 0)
            input.scrollIntoView({ behavior: "smooth", block: "center" });
          unfilledElements++;
          input.classList.add("red-border");
          small.classList.remove("hide");
        } else {
          input.classList.remove("red-border");
          small.classList.add("hide");
        }
      });
      if (!unfilledElements) {
        props.onClick();
        document
          .querySelector("body")
          .scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      props.onClick();
      document
        .querySelector("body")
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const className = "py-4 px-12 font-bold " + props.className;
  const defaultStyle = {
    backgroundColor: props.disabled
      ? "transparent"
      : props.link === "Previous"
        ? "#d9d9d9"
        : ["Next", "Submit", "Checkout"].includes(props.link)
          ? "#D1EE00"
          : "transparent",
    fontFamily: "Roboto",
    borderRadius: "5px",
    boxShadow:
      props.link !== "Save for later" || props.disabled
        ? "0"
        : "inset 0 0 0 3px black",
  };
  const [buttonStyle, setButtonStyle] = useState(defaultStyle);
  return (
    <>
      <button
        id={props.id}
        disabled={props.disabled}
        onClick={() => handleClick()}
        style={buttonStyle}
        className={className}
      >
        {props.link}
      </button>
    </>
  );
};
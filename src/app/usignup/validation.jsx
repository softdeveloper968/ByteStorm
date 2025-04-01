export function checkRequired(text) {
  const requiredInputs = document.querySelectorAll("div[aria-required]");
  let canContinue = true;
  requiredInputs.forEach((div) => {
    div.querySelectorAll("span")?.forEach((innerSpan) => innerSpan.remove());
    const inputElement = div.getElementsByTagName("input")[0];
    inputElement.classList.remove("not-validated");
    div.getElementsByTagName("span")[0]?.remove();
    if (
      inputElement.type === "checkbox" &&
      !inputElement.checked &&
      !div.className.includes("checkboxes")
    ) {
      canContinue = false;
      div
        .querySelector("div")
        ?.appendChild(createRequiredSpan(text ?? "This field is required"));
    }
    if (inputElement.type !== "checkbox" && !validateInput(inputElement)) {
      inputElement.classList.add("not-validated");
      canContinue = false;
      div.appendChild(createRequiredSpan(text ?? "This field is required"));
    }
    // div.querySelectorAll("span")?.forEach(innerSpan => innerSpan.remove())
    if (div.className.includes("checkboxes")) {
      let shouldAddOne = true;
      div.querySelectorAll("div")?.forEach((innerDiv) => {
        const innerInput = innerDiv.getElementsByTagName("input");
        if (
          innerInput.length > 0 &&
          validateInput(innerInput[0]) &&
          shouldAddOne
        ) {
          shouldAddOne = false;
        }
      });
      if (shouldAddOne) {
        div.appendChild(
          createRequiredSpan(
            text ?? "This field is required",
            "relative",
            "start",
            "0",
          ),
        );
        canContinue = false;
      }
    }
  });
  return canContinue;
}

export function validateInput(input) {
  switch (input.type) {
    case "checkbox":
      return input.checked;
    case "text":
      return input.value.trim().length >= 2;
    case "email":
      return input.value.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
    case "tel":
      return Number(input.value.replace(/[^\d]/g, "")) > 9999999999;
    default:
      return false;
  }
}

export function createRequiredSpan(
  text,
  position,
  textAlign,
  bottom,
  fontWeight,
) {
  const requiredSpan = document.createElement("span");
  requiredSpan.style.color = "red";
  requiredSpan.style.fontWeight = fontWeight ?? "inherit";
  requiredSpan.style.fontSize = "0.75rem";
  requiredSpan.innerText = text;
  requiredSpan.style.textAlign = textAlign ?? "start";
  requiredSpan.style.position = position ?? "relative";
  requiredSpan.style.bottom = bottom ?? "-4px";
  requiredSpan.style.left = "0";
  requiredSpan.style.display = "block";
  return requiredSpan;
}

/**
 *
 * @param text {string}
 * @return {number}
 */
export function ensureNumber(text) {
  return Number(text.replace(/[^0-9]/g, ""));
}

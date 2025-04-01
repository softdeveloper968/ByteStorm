function zipCodeValidator(zipCode) {
  return /^\d{5,}$/.test(zipCode);
}

function emailValidator(email) {
  return (
    email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) !== null
  );
}

function phoneValidator(phoneNumber) {
  return (
    Number(phoneNumber) > 99_999_9999 && Number(phoneNumber) < 10_000_000_0000
  );
}

function twoCharValidator(word) {
  return word.length >= 2;
}

function ensureNumberInEvent(e) {
  let newEvent = { ...e };
  try {
    newEvent.target.value = e.target.value.replace(/[^0-9]/g, "");
  } catch (_) {}

  return newEvent;
}

function ensureDecimalInEvent(e) {
  let newEvent = { ...e };
  try {
    newEvent.target.value = e.target.value.match(/^(\d+)\.*(\d*)/g)[0];
    Number(newEvent.target.value);
  } catch (_) {}

  return newEvent;
}

function cityValidator(city) {
  const onlyLetters = city.replace(/[^A-Za-z]/g, "");
  return onlyLetters.length > 2;
}

function zipcodeTranslator(zipcode) {
  let newZipCode = zipcode.trim().replace(/[^0-9]/g, "");

  if (newZipCode.length > 5) {
    return `${newZipCode.slice(0, 5)}-${newZipCode.slice(5)}`;
  } else return newZipCode;
}

function phoneTranslator(phoneNumber) {
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const fullmatch = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (fullmatch) {
    const intlCode = fullmatch[1] ? "+1 " : "";
    return [
      intlCode,
      "(",
      fullmatch[2],
      ") ",
      fullmatch[3],
      "-",
      fullmatch[4],
    ].join("");
  }
  const halfmatch = cleaned.match(/^(\d+)(\d{3})(\d{4})$/);
  if (halfmatch) {
    return ["(", halfmatch[1], ") ", halfmatch[2], "-", halfmatch[3]].join("");
  }
  const smallMatch = cleaned.match(/^(\d+)(\d{4})$/);
  if (smallMatch) {
    return [smallMatch[1], "-", smallMatch[2]].join("");
  }

  return phoneNumber;
}

module.exports = {
  zipCodeValidator,
  ensureNumberInEvent,
  emailValidator,
  phoneValidator,
  twoCharValidator,
  zipcodeTranslator,
  phoneTranslator,
  cityValidator,
  ensureDecimalInEvent,
};

"use client"

import { FormLayout } from "@/app/usignup/formLayout";
import { InputWithLabel } from "@/app/usignup/inputWithLabel";
import { PrimaryButtonSignUp } from "@/app/usignup/page";
import useSafeStore from "@/app/usignup/safeStore";
import { checkRequired } from "@/app/usignup/validation";
import React, { useState } from "react";

export const PhoneNumber = (props) => {
  const signUpStore = useSafeStore();
  const title = "Enter your phone number";
  const subtitle =
    "MustWants prioritizes your security and privacy. We need to verify your account with a code sent to your phone. Your details stay confidential. We never sell your information.";
  const placeholder = "11234567890";
  const policy =
    "*A verification code will be sent to your number by text. Msg & data rates may apply. Message frequency varies. Reply STOP to cancel.";

    console.log(signUpStore.smsAgreement,"signUpStore.smsAgreement")
  function handleClick() {
    if (checkRequired()) {
      if (props.onClick) props.onClick();
      else signUpStore.next().then((res) => res);
    }
  }

  const updateStore = (userState) => {
    signUpStore.setUser({
      ...userState,
    });
  };
  return (
    <FormLayout title={<p className="text-3xl md:text-[32px] font-roboto text-[#272424] font-medium">{title}</p>}>
      <InputWithLabel
        label={"Phone Number"}
        placeholder={parserPhoneNumber(placeholder)}
        type={"tel"}
        $required={true}
        value={
          signUpStore.phoneNumber
            ? parserPhoneNumber(signUpStore.phoneNumber)
            : ""
        }
        onChange={(e) => updateStore({ phoneNumber: ensureNumber(e) })}
      />
      <p className={"small"}>{policy}</p>
      <CheckBoxWithTerms
              onChange={(e) => updateStore({ smsAgreement: Boolean(e) })}
              checked={signUpStore.smsAgreement ?? ""}
              $required={true}
      />
      <PrimaryButtonSignUp text={"Text Me"} onClick={handleClick} />
      <div className=" flex-row text-base gap-2 medium italic">
        <img src={'/images/privacy-lock.png'}  alt={'lock'}	 className="max-w-[18px] -mt-[5px] inline-block" /> {subtitle}
      </div>
    </FormLayout>
  );
};

/**
 *
 * @param text {string}
 * @return {number}
 */
export function ensureNumber(text) {
  const newNumber = text.replace(/[^0-9]/g, "");
  return Number(newNumber.slice(0, 11));
}

/**
 *
 * @param tel {string}
 * @return {string}
 */
export function parserPhoneNumber(tel) {
  let digits = tel.toString().replace(/[^0-9.]/g, "");
  let phoneArray = Array.from(digits.toString());
  if (phoneArray.length === 9) {
    return `${phoneArray
      .map((char, index) => {
        let newChar;
        switch (index) {
          case 0:
            newChar = ` (${char}`;
            break;
          case 3:
            newChar = `${char}) `;
            break;
          case 6:
            newChar = `-${char}`;
            break;
          default:
            newChar = char;
        }
        return newChar;
      })
      .join("")}`;
  } else {
    return `${phoneArray
      .map((char, index) => {
        let newChar;
        switch (index) {
          case 0:
            newChar = `+${char}`;
            break;
          case 1:
            newChar = ` (${char}`;
            break;
          case 3:
            newChar = `${char}) `;
            break;
          case 7:
            newChar = `-${char}`;
            break;
          default:
            newChar = char;
        }
        return newChar;
      })
      .join("")}`;
  }
}

export function ensureNumberOrEmpty(text) {
  if (text === "") return text;
  else if (!/^\d$/.test(text)) return "";
  else return ensureNumber(text).toString();
}


export const CheckBoxWithTerms = (props) => {
  const useStore = useSafeStore();
  return (
    <div
      aria-required={props.$required}
      className="requird-condition relative flex items-start cursor-pointer w-full"
      onClick={() => {
        if (useStore.smsAgreement) {
          props.onChange("");
        } else {
          props.onChange("1");
        }
      }}
    >
      <input
        type={"checkbox"}
        required={props.$required}
        checked={useStore.smsAgreement}
        value={props.checked}
        className="mr-[0.5rem]"
        onChange={(e) => {
          props.onChange(e.target.checked ? "1" : "");
        }}
      />
      <div className={"text-xs font-semibold"}>
      I agree to receive SMS about the MustWants mobile app.
      </div>
    </div>
  );
};
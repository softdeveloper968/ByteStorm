"use client";

import { PrimaryButton } from "@/app/usignup/button";
import { config } from "@/app/usignup/config";
import { CreateAnAccount } from "@/app/usignup/createAnAccount";
import { parserPhoneNumber, PhoneNumber } from "@/app/usignup/phoneNumber";
import useSafeStore, { UserSignUpState } from "@/app/usignup/safeStore";
import { VerificationCode } from "@/app/usignup/verificationCode";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import MWLogo from "./assets/MW name.png";

export default function UserSignUp() {
  return (
    <MainPageContainer
      className="form-main-grid bg-[#d8d7d7] min-h-screen flex items-center"
    >
      <div className="container md:flex items-center justify-center gap-4  lg:gap-8 xl:gap-[12rem] pt-4 pb-10 md:py-24">
        <MustWantsLogoContainer />
        <RenderSignUp />
      </div>
  </MainPageContainer>
   
  );
}
const MainPageContainer = styled.main`
  color: ${config.colors.black};
`;
const MustWantsLogoContainer = () => {
  const imageStyle = {};
  return (
    <div className="h-full w-full md:max-w-[300px] lg:max-w-[400px] xl:max-w-[450px] flex justify-center items-center">
      <Image src={MWLogo} alt={""} style={imageStyle} />
    </div>
  );
};

function RenderSignUp() {
  const signUpStore = useSafeStore();
  switch (signUpStore.signUpState) {
    case UserSignUpState.PHONE_NUMBER:
      return <PhoneNumber />;
    case UserSignUpState.VERIFICATION_CODE:
    case UserSignUpState.COMPLETED:
      return <VerificationCode />;
    default:
      return <CreateAnAccount />;
  }
}

export function PrimaryButtonSignUp(props) {
  return (
    <PrimaryButton
      ref={props.ref}
      disabled={props.disabled}
      className="h-[3rem] w-[13rem] mt-4"
      onClick={() => props.onClick()}
    >
      {props.text}
    </PrimaryButton>
  );
}

export function Subtitle(props) {
  const subtitle = "We sent a verification code to:";
  const parsedPhoneNumber = `+${Array.from(props.phoneNumber.toString())
    .map((char, index) => {
      let newChar;
      switch (index) {
        case 0:
        case 1:
        case 4:
        case 7:
          newChar = ` ${char}`;
          break;
        default:
          newChar = char;
      }
      return newChar;
    })
    .join("")}`;
  return (
    <div className="flex items-center flex-col">
      <p className="text-center">{subtitle}</p>
      <p className={"text_mw-black !mt-1 font-bold"}>
        {parserPhoneNumber(props.phoneNumber)}
      </p>
    </div>
  );
}

// const NumberSlot = styled(Input)`
//   aspect-ratio: 1;
//   border-radius: 0.5rem;
//   text-align: center;
//   font-weight: bold;
//   font-size: 1.2rem;
//   width: 2rem;
//   heigth: 2rem;
//   color: ${config.colors.black};
//   padding: 0;
// `;


import React from "react";
import { FormContainer } from "./formContainer";

export const FormLayout = (props) => {
  return (
    <div
      id={props.id}
      className="formlayout-box lg:w-[700px] flex flex-col items-center justify-center"
    >
      <FormContainer className="flex flex-col p-6 md:px-10 md:py-8 rounded-[15px] w-full shadow-[0_5px_15px_rgba(0,0,0,0.35)]">
        <div className="lg:max-w-[570px] mx-auto flex flex-col gap-4 items-center">
        <div className="flex items-center justify-center mb-4 text-center flex-col" >
          <p
            className={"title text-center"} >
            {props.title}
          </p>
        {props.subtitle && <div>{props.subtitle}</div>}
          
        </div>
        {props.children}
        </div>
      </FormContainer>
    </div>
  );
};
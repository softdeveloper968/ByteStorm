import { ensureNumber } from "@/app/usignup/validation";
import React from "react";
import styled from "styled-components";
import { config } from "./config";

export const InputWithLabel = (props) => {
  const labelStyle = {
    fontSize: "0.8rem",
    fontWeight: 600,
    color: `${props.error === "true" ? config.colors.red : "inherit"}`,
  };
  return (
    <div
      aria-required={props.$required}
      className="flex flex-col justify-between w-full relative"
    >
      <label
        htmlFor={props.label}
        style={{ ...props.labelStyle, ...labelStyle }}
      >
        {props.label}
      </label>
      <Input
        className={props.className}
        required={props.$required}
        onKeyDown={(e) => (props.onKeyDown ? props.onKeyDown(e) : {})}
        type={props.type ?? "text"}
        ref={props.reff}
        error={props.error}
        value={props.error === "true" ? "" : props.value}
        id={props.label}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
        style={props.inputStyle}
      />
      {props.children}
    </div>
  );
};
export const Input = styled.input`
    border: 2px solid ${props => props.error === 'true' ? config.colors.red : config.colors.brandGrey};
    border-radius: 5px;
    margin-top: 0.5rem;
    height: 2rem;
  outline-offset: 0;

    &::placeholder {
        color: ${props => props.error === 'true' ? config.colors.red : config.colors.brandGrey};
        font-weight: ${props => props.error === 'true' ? "bold" : "inherit"};
    }

    &:focus {
      outline-offset: 0;
        outline: 2px solid ${props => props.error === 'true' ? config.colors.red : config.colors.brandGreen};
        border: 2px solid ${props => props.error === 'true' ? config.colors.red : config.colors.brandGreen} !important;
        border-color: ${props => props.error === 'true' ? config.colors.red : config.colors.brandGreen} !important;
        --tw-ring-color: 2px solid ${props => props.error === 'true' ? config.colors.red : config.colors.brandGreen} !important;
        --tw-ring-offset-color: 2px solid ${props => props.error === 'true' ? config.colors.red : config.colors.brandGreen} !important;
    }


    -moz-appearance: textfield;

    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`

export const NumberSlot = styled(Input)`
    aspect-ratio: 1;
    border-radius: 0.5rem;
    text-align: center;
    font-weight: bold;
    font-size: 1.2rem;
    width: 2rem;
		height: 2rem;
		padding: 0;
`

export function ensureNumberOrEmpty(text) {
	if (text === "") return text
	else if (!/^\d$/.test(text)) return ""
	else return ensureNumber(text).toString()

}

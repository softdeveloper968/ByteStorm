import { config } from "@/app/usignup/config";
import styled from "styled-components";

const Button = styled.button`
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  border: 0;
  padding: 0.5rem 1rem;
`;

export const PrimaryButton = styled(Button)`
    background-color: ${(p) =>
            p.inverted ? "transparent" : config.colors.brandYellow};
    color: ${(p) =>
            p.inverted ? config.colors.brandYellow : config.colors.black};
    box-shadow: inset 0 0 0 2px ${config.colors.brandYellow};
    font-size: 1rem;
`
export const SecondaryButton = styled(Button)`
    background-color: ${p => p.inverted ? "transparent" : config.colors.brandGreen};
    color: ${p => p.inverted ? config.colors.brandGreen : "transparent"};
    box-shadow: inset 0 0 0 2px ${config.colors.brandGreen};
`
export const VoidButton = styled(Button)`
    background-color: ${p => p.inverted ? "black" : "white"};
    color: ${p => p.inverted ? "white" : "black"};
    box-shadow: ${p => `inset 0 0 0 2px ${p.inverted ? "white" : "black"}`};
`
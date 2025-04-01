import { IconContext } from "react-icons";
import { FaRegWindowClose } from "react-icons/fa";
import styled from "styled-components";

export function CloseButton(props) {
  return (
    <IconContext.Provider value={{ color: props.color, size: "2rem" }}>
      <IconContainer
        aria-label={"close button"}
        className={props.className}
        onClick={props.onClick}
      >
        <FaRegWindowClose />
      </IconContainer>
    </IconContext.Provider>
  );
}
const IconContainer = styled.div`
    @media screen and (max-width: 1024px) {
        background-size: 90% 90%;
        background: radial-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)) no-repeat center center;
    }
`
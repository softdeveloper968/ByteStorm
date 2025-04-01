import {config} from "@/app/usignup/config"
import styled from "styled-components"

export const DragSeparation = styled.div`
    height: 100%;
    width: 4px;
    background-color: ${config.colors.black};
    position: absolute;
    right: 0;
    z-index: 1;
    cursor: ${props => props.$isDragging ? "grabbing" : "col-resize"};
    border: 1px solid ${config.colors.black};
    display: flex;
    justify-content: center;
    align-items: center;

    filter: drop-shadow(-1px 2px 2px #000000);

    svg {
        transform: rotate(90deg) translateY(0.5rem);
        width: 2rem;
        height: 1.5rem;
        position: absolute;
        z-index: 2;
        background-color: black;
        border-radius: 5px;
        cursor: ${props => props.$isDragging ? "grabbing" : "grab"};

        &:hover {
            background-color: ${props => !props.$isDragging ? config.colors.brandYellow : config.colors.brandGreen};

            path {
                color: black;
            }
        }

        path {
            color: ${props => !props.$isDragging ? config.colors.brandYellow : config.colors.brandGreen};
        }
    }

    &:hover {
        background-color: ${props => !props.$isDragging ? config.colors.brandYellow : config.colors.brandGreen};
    }
`
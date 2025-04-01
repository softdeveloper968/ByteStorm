import styled from "styled-components";
import { config } from "./config";

export const FormContainer = styled.div`
  background: ${config.colors.background};

  p {
    margin: 0;
  }

  .title {
    font-size: ${config.fontSizes.title};
  }

  .small {
    font-size: ${config.fontSizes.small};
  }

  .green {
    color: ${config.colors.brandGreen};
  }

  .red-link {
    text-decoration: none;
    cursor: pointer;
    color: ${config.colors.red};
  }

  .not-validated {
    border: 2px solid ${config.colors.red};
    outline-offset: 0;

    &:focus {
      outline: 1px solid ${config.colors.red};
      border: 2px solid ${config.colors.red} !important;
      border-color: ${config.colors.red} !important;
      --tw-ring-color: 2px solid ${config.colors.red} !important;
      --tw-ring-offset-color: 2px solid ${config.colors.red} !important;
    }
  }
  @media only screen and ${config.deviceMinWidth.desktop} {
    margin: 4rem auto;
    padding: 2rem 4rem;
  }
`;
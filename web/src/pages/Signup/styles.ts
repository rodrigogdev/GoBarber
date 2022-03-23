import styled, { css, keyframes } from "styled-components";
import { shade } from "polished";

import signUpBackgroundImg from "../../assets/sign-up-background.png";

interface AnimationContainerProps {
  isFocusedOne: boolean;
  isFocusedTwo: boolean;
}

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;
`;

const appearFromRight = keyframes`
	from {
		opacity: 0;
		transform: translateX(50px);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
`;

export const AnimationContainer = styled.div<AnimationContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromRight} 1s;

  ${(props) =>
    props.isFocusedOne &&
    css`
      .radio {
        .client {
          background: #ff9000;
          border-radius: 5px;
          color: #312e38;
          transition: background 0.2s ease-in-out;
          transition: color 0.2s ease-in-out;
        }
      }
    `}

  ${(props) =>
    props.isFocusedTwo &&
    css`
      .radio {
        .provider {
          background: #ff9000;
          border-radius: 5px;
          color: #312e38;
          transition: background 0.2s ease-in-out;
          transition: color 0.2s ease-in-out;
        }
      }
    `}

  .radio {
    margin-top: 20px;

    input {
      -webkit-appearance: none;
      appearance: none;
    }

    label {
      color: #f4ede8;
      margin-left: 10px;
      padding: 3px 5px;
      font-family: "Roboto Slab", serif;
      cursor: pointer;
    }
  }

  form {
    margin: 30px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    label {
      background: #ff9000;
      height: 56px;
      border-radius: 10px;
      border: 0;
      padding: 0 16px;
      color: #312e38;
      width: 100%;
      font-weight: 500;
      margin-top: 16px;
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, "#ff9000")};
      }
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, "#f4ede8")};
      }
    }
  }

  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, "#ff9000")};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: cover;
`;

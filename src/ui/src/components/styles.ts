import styled from 'styled-components'

export const StyledHome = styled.div`
  display: flex;
  font-family: 'Roboto', sans-serif;
  height: 100vh;
  padding-left: 20px;
  overflow: scroll;
  overflow-x: hidden;
`
export const StyledHomeSubSection = styled.h1`
  color: black;
  font-size: 1.8rem;
  cursor: pointer;

  @media only screen and (max-width: 600px) {
    font-size: 1.5rem;
  }
`

export const StyledContractName = styled.div`
  color: black;
  border-radius: 10px;
  width: 50%;
  height: 50px;
  font-size: 1.8rem;
  cursor: pointer;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;

  @media only screen and (max-width: 600px) {
    font-size: 1.5rem;
  }
  &:hover {
    background-color: #c7c6c6;
  }
`

export const StyledButton = styled.button`
  align-items: center;
  border: 1;
  margin-top: 2vh;
  border-radius: 16px;
  box-shadow: 2px 2px #000000;
  border: 1px solid #000000;
  color: #000000;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 16px;
  height: 24px;
  font-weight: 600;
  justify-content: center;
  letter-spacing: 0.03em;
  line-height: 1;
  outline: 0;
  transition: background-color 0.2s, opacity 0.2s;
  margin-left: 1vw;

  &:hover:not(:disabled):not(.plant-button--disabled):not(.plant-button--disabled):not(:active) {
    opacity: 0.65;
  }

  &:active:not(:disabled):not(.plant-button--disabled):not(.plant-button--disabled) {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }
`

export const StyledSelector = styled.div`
  position: absolute;
  top: 100px;
  padding-top: 20px;
  color: black;
  width: 40%;
  height: 100%;

  overflow: scroll;
`

export const StyledBody = styled.div`
  position: absolute;
  top: 100px;
  right: 0;
  padding-top: 20px;
  color: black;
  width: 40%;
  height: 100%;

  overflow: scroll;
`

export const StyledActionBody = styled.div`
  position: absolute;
  top: 100px;
  padding-left: 20px;
  right: 0;
  padding-top: 20px;
  color: black;
  width: 100%;
  height: 100%;

  overflow: scroll;
`

export const StyledInput = styled.input`
  width: 100%;
  height: 50px;
  border: 2px solid #c7c6c6;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #c7c6c6;
  }
  @media only screen and (max-width: 600px) {
    font-size: 1.5rem;
  }
`

export const StyledSelect = styled.div`
  position: absolute;
  background-color: #ffffff;
  border: 0;
  border-radius: 16px;
  box-shadow: 2px 2px #e4e4e4;
  color: #000000;
  display: block;
  font-size: 26px;
  width: 50%;
  height: 28px;
  outline: 0;
  padding: 0 16px;
  margin-top: 20px;
  width: 60%;
`

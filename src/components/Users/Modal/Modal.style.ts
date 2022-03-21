import styled from "styled-components";

export const Wrap = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.25);
  animation-name: appear;
  animation-duration: 300ms;
`;

export const ModalWrap = styled.div`
  width: auto;
  max-width: 550px;
  background: white;
  position: relative;
  padding: 10px;
  max-height: calc(100vh - 40px);
  text-align: left;
  display: flex;
  place-items: center;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: slide-in;
  animation-duration: 0.5s;
`;

export const ModalTitle = styled.p`
  font-style: bold;
`;

export const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 15px;
`;

export const Required = styled.span`
  &:after {
    color: blue;
    content: " *";
  }
`;

export const TextInput = styled.input.attrs({ type: "text" })`
  width: 150px;
  font: 1em Arial, sans-serif;
`;

export const SelectInput = styled.select`
  width: 158px;
  font: 1em Arial, sans-serif;
`;

export const ButtonSave = styled.button`
  width: 100px;
  height: 35px;
  background-color: red;
  float: right;
  margin: 5px;
  color: white;
  border: none;
  outline: none;
  text-align: center;
  transition: all 0.3s;
  margin: 10px;
`;

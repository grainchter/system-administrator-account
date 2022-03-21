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
  width: 70%;
  background: white;
  position: relative;
  padding: 10px;
  max-height: calc(100vh - 40px);
  text-align: left;
  display: flex;
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
  grid-template-columns: 120px auto;
  width: 100%;
  gap: 15px;
  margin-bottom: 5px;
`;

export const IdInput = styled.input.attrs({ type: "text" })`
  text-align: center;
`;

export const NameInput = styled.input.attrs({ type: "text" })``;

export const TitleWrap = styled.div`
  display: grid;
  grid-template-columns: 120px 100px auto;
  width: 100%;
  gap: 15px;
`;

export const TitleLink = styled.p`
  text-align: right;
  color: blue;
`;

export const ButtonContainer = styled.div`
  display: inline-block;
  width: 100%;
`;

export const ButtonSave = styled.button`
  width: 100px;
  height: 100%;
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

export const SearchWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  margin-bottom: 5px;
`;

export const SearchInput = styled.input.attrs({ type: "search" })`
  width: 100%;
  border: 1px solid blue;
  padding: 5px;
  height: 36px;
  outline: none;
  color: #9dbfaf;
`;

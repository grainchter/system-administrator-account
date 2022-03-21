import styled from "styled-components";

export const Wrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 0.5fr 2fr;
  align-items: center;
  justify-items: start;
`;

export const WrapData = styled.div`
  display: grid;
  align-items: center;
  justify-items: start;
  width: 100%;
  grid-template-columns: 0.5fr 2fr;
`;

export const Title = styled.p`
  font-style: bold;
  text-align: left;
`;

export const LabelImgProfileActive = styled.label`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: red;
`;

export const ImgProfileActive = styled.input.attrs({ type: "file" })`
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
`;

export const EditProfileData = styled.input.attrs({ type: "text" })`
  height: 50%;
  width: 70%;
`;

export const SaveButton = styled.button`
  background:#FD3F49;
  color:white;
  border: none;
outline:none;
  display:block;
  text-align:center;
  transition:all 0.3s;
  margin: 10px;
  width: 150px;
  height: 30px;
  grid-area: 2 / 1 / 3 / 3;
`;

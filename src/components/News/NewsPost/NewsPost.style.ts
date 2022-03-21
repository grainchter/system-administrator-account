import styled from "styled-components";

export const ComponentWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export const Wrap = styled.div`
  width: 150px;
  grid-template-columns: 1fr;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 35px;
  align-items: center;
`;

export const DataWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 5px 5px 5px 5px;
`;

export const PostImg = styled.img`
  width: 100%;
  height: 80px;
  background-color: crimson;
`;

export const PostDate = styled.p`
  font-size: 0.3em;
`;

export const PostTitle = styled.p`
  font-style: bold;
  font-size: 0.7em;
  margin-top: -5px;
`;

export const ActionWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
`;

export const PostAction = styled.p`
  font-style: bold;
  font-size: 0.7em;
  color: blue;
  cursor: pointer;
`;

export const ShowAll = styled.p`
  font-style: bold;
  font-size: 1em;
  color: blue;
  cursor: pointer;
  text-align: right;
`;

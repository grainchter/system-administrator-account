import styled from "styled-components";

export const Wrap = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px;
`;

export const SectionName = styled.p`
  font-size: 24px;
  font-style: bold;
  text-align: left;
  cursor: pointer;
`;

export const SectionAction = styled.p`
  font-size: 12px;
  text-align: right;
  cursor: pointer;
`;

export const UserWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
`;

export const UserSectionName = styled.p`
  font-size: 22px;
  font-style: bold;
  text-align: left;
  text-decoration: underline blue;
  cursor: pointer;
  margin-top: -5px;
`;

export const DirectoryWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
`;

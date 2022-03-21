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

export const ImgProfile = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export const ProfileData = styled.p`
  height: 50%;
  text-align: left;
`;

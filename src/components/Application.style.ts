import styled from "styled-components";
import media from "styled-media-query";

export const Wrap = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
  background-color: black;
`;

export const Container = styled.div`
  width: 90%;
  margin-top: 10px;
  margin-bottom: 15px;
  padding: 15px;
  background-color: white;

  ${media.greaterThan("medium")`
    width: 700px;
  `}
`;



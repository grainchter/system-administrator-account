import styled from "styled-components";

export const Wrap = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 0.5fr;
  box-shadow: 0px 2px 2px 2px rgba(34, 60, 80, 0.2);
  padding: 5px;
`;

export const Title = styled.p`
  font-style: bold;
  font-size: 1em;
  text-align: left;
`;

export const Text = styled.p`
  font-size: 0.8em;
  text-align: right;
`;

export const Type = styled.p`
  font-size: 0.8em;
  text-align: left;
`;

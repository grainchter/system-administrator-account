import styled from "styled-components";

export const SearchWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
`;

export const SearchInput = styled.input.attrs({ type: "search" })`
  width: 250px;
  border: 3px solid blue;
  border-right: none;
  padding: 5px;
  height: 36px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9dbfaf;
`;

export const SearchButton = styled.button`
  width: 150px;
  height: 36px;
  border: 1px solid blue;
  background: blue;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
`;

export const Table = styled.table`
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
  text-align: center;
  margin-top: 10px;
`;

export const TH = styled.th`
  font-weight: bold;
  padding: 5px;
  background: #efefef;
  border: 1px solid #dddddd;
`;

export const TD = styled.td`
  border: 1px solid #dddddd;
  padding: 5px;
`;

export const Pagination = styled.div`
  display: inline-block;
`;

export const PaginationNumber = styled.p`
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: blue;
    color: white;
  }
`;

import { useEffect, useState } from "react";
import {
  SearchButton,
  SearchInput,
  Table,
  TH,
  Pagination,
  PaginationNumber,
  TD,
  SearchWrap,
} from "./ShowUserData.style";

const ShowUserData = ({ usersData }: any) => {
  const onPage = 2;

  const [pagesArr, setPagesArr] = useState<any>([]);
  const [firstEl, setFirstEl] = useState<number>(0);
  const [data, setData] = useState<any>([]);
  const [newArr, setnewArr] = useState<any>([]);

  const getSearchValue = (e: React.FormEvent<HTMLInputElement>) => {
    let searchTerm = e.currentTarget.value;
    let array: any = [];

    if (data) {
      let findData = data.find((data: any) => data.firstName === searchTerm);
      if (findData) {
        array.push(findData);
        setFirstEl(0);
        setnewArr(array);
      } else if (findData === undefined) {
        setnewArr(data);
      }
    }
  };

  const createPagination = () => {
    let array: any = [];
    if (usersData) {
      let arraySize = usersData.length;
      if (arraySize > onPage) {
        let pages = Math.ceil(arraySize / onPage);
        for (let i = 1; i <= pages; i++) {
          array.push(i);
        }

        setPagesArr(array);
      } else {
        array.push(1);
        setPagesArr(array);
      }
    }
  };

  useEffect(() => {
    if (usersData) {
      setData(usersData);
      setnewArr(usersData);
      createPagination();
    }
  }, [usersData]);

  return (
    <>
      <SearchWrap>
        <SearchInput onChange={getSearchValue} />
        <SearchButton>Поиск</SearchButton>
      </SearchWrap>
      <Table>
        <thead>
          <tr>
            <TH>N</TH>
            <TH>ФИО</TH>
            <TH>Департамент</TH>
            <TH>Телефон</TH>
            <TH>Почта</TH>
            <TH>Пароль</TH>
            <TH>Действия</TH>
          </tr>
        </thead>
        <tbody>
          {newArr
            .slice(firstEl, firstEl + onPage)
            .map(({ id, firstName, lastName, middleName, email }: any) => (
              <tr key={id}>
                <TD>{id}</TD>
                <TD>
                  {firstName} {lastName} {middleName}
                </TD>
                <TD></TD>
                <TD></TD>
                <TD>{email}</TD>
                <TD>пароль</TD>
                <TD>
                  <p>edit</p>
                  <p>del</p>
                </TD>
              </tr>
            ))}
        </tbody>
      </Table>
      <Pagination>
        {pagesArr.map((item: any) => (
          <PaginationNumber
            onClick={() => {
              setFirstEl(item * onPage - onPage);
            }}
          >
            {item}
          </PaginationNumber>
        ))}
      </Pagination>
    </>
  );
};

export default ShowUserData;

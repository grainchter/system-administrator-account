import { useEffect, useState } from "react";
import {
  ModalTitle,
  ModalWrap,
  Wrap,
  MainContainer,
  ButtonContainer,
  ButtonSave,
  IdInput,
  NameInput,
  SearchWrap,
  SearchInput,
  TitleWrap,
  TitleLink,
} from "./Modal.style";

const Modal = ({
  editForm,
  selectedData,
  uploadDirectoryDataToServer,
  selectedName,
}: any) => {
  const [arrayData, setArray] = useState<any>([]);
  const [editArray, setEditArray] = useState<any>([]);

  //добавляем пустую строку для заполнения
  const addNewItem = () => {
    let data = { id: null, name: "" };
    setArray([data, ...arrayData]);
  };

  //отслеживаем введенные пользователем данные
  const getData = (e: string, id: any) => {
    let arrIndex: any;
    let array: any = {};
    let arrayIdAndName: any = { id: id, name: e };
    let copyEditArray: any = editArray;

    //получаем индекс изменяемого input
    //когда пользователь вводит информацию в input,
    //перезаписываем общий массив с данными и выводим на экран новые данные
    const list = [...arrayData];
    list.find((data: any, index: any) => {
      if (data.id === id) {
        array = data;
        arrIndex = index;
      }
    });

    array.name = e;
    list.splice(arrIndex, 1, array);

    setArray(list);

    //проверяем, есть ли что-то в отдельном массиве для отредактированных полей
    //если массив пустой, то записываем в массив измененный input
    //если массив содержит информацию, то проверяем, содержит ли массив input,
    //который изменялся ранее.
    //Если такой input найден, то удаляем его из массива и перезаписываем.
    if (Object.keys(copyEditArray).length > 0) {
      let index = copyEditArray.findIndex(
        (el: any) => el.id === arrayIdAndName.id
      );

      if (index !== -1) {
        copyEditArray.splice(index, 1);
      }

      copyEditArray = [...copyEditArray, arrayIdAndName];
      setEditArray(copyEditArray);
    } else {
      setEditArray([...editArray, arrayIdAndName]);
    }
  };

  const getSearchValue = (e: React.FormEvent<HTMLInputElement>) => {
    let searchTerm = e.currentTarget.value;
    let array: any = [];

    if (arrayData) {
      let data = arrayData.find((data: any) => data.name === searchTerm);
      if (data) {
        array.push(data);
        setArray(array);
      } else if (data === undefined) {
        setArray(selectedData);
      }
    }
  };

  useEffect(() => {
    setArray(selectedData);
  }, []);

  return (
    <Wrap>
      <ModalWrap>
        <ModalTitle>{selectedName}</ModalTitle>
        <SearchWrap>
          <SearchInput onChange={getSearchValue} />
        </SearchWrap>
        <TitleWrap>
          <p>Идентификатор</p>
          <p>Наименование</p>
          <TitleLink
            onClick={() => {
              addNewItem();
            }}
          >
            + Добавить
          </TitleLink>
        </TitleWrap>

        {arrayData.map(({ id, name }: any) => (
          <MainContainer key={id}>
            <IdInput disabled value={id} />
            <NameInput
              value={name}
              onChange={(e) => getData(e.target.value, id)}
            />
          </MainContainer>
        ))}

        <ButtonContainer>
          <ButtonSave
            onClick={() => {
              editForm();
              uploadDirectoryDataToServer(editArray, selectedName);
            }}
          >
            Сохранить
          </ButtonSave>
        </ButtonContainer>
      </ModalWrap>
    </Wrap>
  );
};

export default Modal;

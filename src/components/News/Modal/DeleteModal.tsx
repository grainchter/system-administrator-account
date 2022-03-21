import { useState } from "react";
import { useSelector } from "react-redux";
import { TStore } from "../../../store/hooks";
import {
  ButtonCancel,
  ButtonContainer,
  ButtonSave,
  ModalTitle,
  ModalWrap,
  Wrap,
} from "./DeleteModal.style";

import { changeValue } from "../../../store/clickedStore";
import { useDispatch } from "react-redux";

const DeleteModal = ({
  deleteForm,
  deleteNewsDataFromServer,
  logicGetUserData,
}: any) => {
  const { selectedNews } = useSelector((state: TStore) => state.clickedReducer);

  const [newsDataState, setNewsDataState] = useState<any | undefined>(
    selectedNews
  );

  const dispatch = useDispatch();

  const cleadDefaultData = () => {
    dispatch(
      changeValue({
        selectedNews: {
          id: "",
          title: "",
          content: "",
        },
      })
    );
  };

  return (
    <>
      <Wrap>
        <ModalWrap>
          <ModalTitle>Вы действительно хотите удалить новость?</ModalTitle>
          <ButtonContainer>
            <ButtonCancel
              onClick={() => {
                deleteForm();
              }}
            >
              Нет
            </ButtonCancel>
            <ButtonSave
              onClick={() => {
                deleteNewsDataFromServer(newsDataState.id);
                deleteForm();
                logicGetUserData();
                cleadDefaultData();
              }}
            >
              Да
            </ButtonSave>
          </ButtonContainer>
        </ModalWrap>
      </Wrap>
    </>
  );
};

export default DeleteModal;

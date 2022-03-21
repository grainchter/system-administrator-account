import { useEffect, useState } from "react";
import {
  ThemeInput,
  TextInput,
  InputLabel,
  ModalTitle,
  ModalWrap,
  Wrap,
  MainContainer,
  LinkContainer,
  LinkInput,
  ButtonContainer,
  ButtonSave,
  ButtonCancel,
  UploadFile,
} from "./Modal.style";
import { TStore } from "../../../store/hooks";
import { useSelector } from "react-redux";

import { changeValue } from "../../../store/clickedStore";
import { useDispatch } from "react-redux";

const Modal = ({
  openData,
  editForm,
  sendDataFromModalForm,
  sendDataFromEditModalForm,
  logicGetUserData,
}: any) => {
  const { selectedNews } = useSelector((state: TStore) => state.clickedReducer);

  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState<Boolean | undefined>(false);

  const [newsDataState, setNewsDataState] = useState<any | undefined>(
    selectedNews
  );
  const [newsIdData, setNewsIdData] = useState<string>("");
  const [newsThemeData, setNewsThemeData] = useState<string>("");
  const [newsTextData, setNewsTextData] = useState<string>("");
  const [newsImgData, setNewsImgData] = useState<
    FormData | undefined | FileList
  >(undefined);

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

  const getDefaultValue = () => {
    if (newsDataState) {
      setNewsIdData(newsDataState.id);
      setNewsThemeData(newsDataState.title);
      setNewsTextData(newsDataState.content);
    }
    setOpenModal(openData);
  };

  const closeModal = () => {
    setOpenModal(!openModal);
  };

  //отслеживаем изменения в поле Theme
  const getThemeValue = (e: React.FormEvent<HTMLInputElement>) => {
    setNewsThemeData(e.currentTarget.value);
  };

  //отслеживаем изменения в поле Text
  const getTextValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewsTextData(e.target.value);
  };

  //отслеживаем загруженное изображение
  //не работает fetch
  const getSelectedFileLink = (e: React.FormEvent<HTMLInputElement>) => {
    let data = e.currentTarget.value;

    fetch(data)
      .then((res) => res.blob()) 
      .then((blob) => {
        let objectURL = URL.createObjectURL(blob);
        let file = new FormData();
        file.append("file", objectURL);
        setNewsImgData(file);
      });
  };

  //отслеживаем загруженное изображение
  const getSelectedFile = (e: React.FormEvent<HTMLInputElement>) => {
    let data = e.currentTarget.files;

    if (data) {
      let file = new FormData();
      file.append("file", data[0]);
      setNewsImgData(file);
    }
  };

  useEffect(() => {
    getDefaultValue();
  }, []);

  return (
    <>
      {openModal && (
        <Wrap>
          <ModalWrap>
            <ModalTitle>Создать новость</ModalTitle>
            <MainContainer>
              <InputLabel htmlFor="theme">Тема</InputLabel>
              <ThemeInput
                id="theme"
                onChange={getThemeValue}
                value={newsThemeData}
              />
              <InputLabel htmlFor="text">Текст</InputLabel>
              <TextInput
                id="text"
                onChange={getTextValue}
                value={newsTextData}
              />
            </MainContainer>
            <LinkContainer>
              <InputLabel htmlFor="link">Ссылка</InputLabel>
              <LinkInput id="link" onChange={getSelectedFileLink} />
              <UploadFile onChange={getSelectedFile} accept="image/*" />
            </LinkContainer>
            <ButtonContainer>
              <ButtonCancel
                onClick={() => {
                  cleadDefaultData();
                  closeModal();
                  editForm();
                  setOpenModal(!openModal);
                }}
              >
                Cancel
              </ButtonCancel>
              <ButtonSave
                onClick={() => {
                  if (newsIdData) {
                    sendDataFromEditModalForm({
                      selectedId: newsIdData,
                      theme: newsThemeData,
                      text: newsTextData,
                      userImgData: newsImgData,
                    });
                  } else {
                    sendDataFromModalForm({
                      theme: newsThemeData,
                      text: newsTextData,
                      userImgData: newsImgData,
                    });
                  }
                  closeModal();
                  editForm();
                  logicGetUserData();
                  cleadDefaultData();
                }}
              >
                Save
              </ButtonSave>
            </ButtonContainer>
          </ModalWrap>
        </Wrap>
      )}
    </>
  );
};

export default Modal;

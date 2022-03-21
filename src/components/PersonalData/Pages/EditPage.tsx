import { useEffect, useState } from "react";

import {
  Wrap,
  ImgProfileActive,
  LabelImgProfileActive,
  WrapData,
  Title,
  EditProfileData,
  SaveButton,
} from "./EditPage.style";

const EditPage = ({
  sendDataFromEditPage,
  userDataFromAPI,
  sendImgFromEditPage,
  editForm,
  logicGetUserData,
}: any) => {
  const [userImgData, setUserImgData] = useState<FormData | undefined>();
  const [userNameData, setUserNameData] = useState<string | undefined>("");
  const [userEmailData, setUserEmailData] = useState<string | undefined>("");

  useEffect(() => {
    createUserNameData();
  }, []);

  //склеивание данных пользователя
  const createUserNameData = () => {
    let username =
      userDataFromAPI.firstName +
      " " +
      userDataFromAPI.lastName +
      " " +
      userDataFromAPI.middleName;

    setUserNameData(username);
    setUserEmailData(userDataFromAPI.email);
  };

  //отслеживаем загруженное изображение
  const getSelectedFile = (e: React.FormEvent<HTMLInputElement>) => {
    let data = e.currentTarget.files;

    if (data) {
      let file = new FormData();
      file.append("file", data[0]);
      setUserImgData(file);
    }
  };

  //отслеживаем изменения в поле ФИО
  const getNameValue = (e: React.FormEvent<HTMLInputElement>) => {
    setUserNameData(e.currentTarget.value);
  };

  return (
    <>
      <Wrap>
        <ImgProfileActive
          id="uploadImg"
          onChange={getSelectedFile}
          accept="image/*"
        />
        <LabelImgProfileActive htmlFor="uploadImg" />
        <WrapData>
          <Title>Ф.И.О.</Title>
          <EditProfileData onChange={getNameValue} value={userNameData} />
          <Title>Email</Title>
          <EditProfileData value={userEmailData} />
        </WrapData>
        <SaveButton
          onClick={() => {
            sendDataFromEditPage({
              username: userNameData,
            });
            sendImgFromEditPage({ userImgData: userImgData });
            editForm();
            logicGetUserData();
          }}
        >
          Сохранить
        </SaveButton>
      </Wrap>
    </>
  );
};

export default EditPage;

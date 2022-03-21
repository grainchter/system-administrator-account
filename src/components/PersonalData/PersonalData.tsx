import { useEffect } from "react";
import { useState } from "react";

import {
  Wrap,
  SectionName,
  SectionAction,
} from "../TitleSection/TitleSection.style";

import EditPage from "./Pages/EditPage";
import ShowPage from "./Pages/ShowPage";

const PersonalData = () => {
  const [openComponent, setOpenComponent] = useState<boolean | undefined>(true);
  const [openEdit, setOpenEdit] = useState<boolean | undefined>(false);

  const [userIdData, setUserIdData] = useState<string | undefined>();
  const [userDataFromApi, setUserDataFromApi] = useState<object | undefined>(
    {}
  );
  const [objectUrl, setObjectUrl] = useState<string | undefined>();

  //получаем отредактированные данные
  const logicGetUserData = async () => {
    let userID = await getUserID();
    setUserIdData(userID);
    // Получаем актуальные данные пользователя из апи
    let remotePersonalData = await getUserDataFromAPI(userID);
    setUserDataFromApi(remotePersonalData);

    let localPhotoURL = await downloadUserPhoto(remotePersonalData.photoId);
    // Ставим аватарку
    setObjectUrl(localPhotoURL);
  };

  const getUserID = async (): Promise<string> => {
    // Ходит в апи, чтобы получить актуальный айди пользвоателя
    // Возвращает прям строку с айди

    let id = "1";

    await fetch("http://localhost:8080/api/v1/me", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      let data = await response.json();
      id = data.id;
    });

    return id;
  };

  const getUserDataFromAPI = async (userID: string): Promise<any> => {
    // Ходит в апи, чтоб получить полынй набор данных о пользователе

    let result;
    let queryData = new URLSearchParams();
    queryData.append("id", userID);

    await fetch("http://localhost:8080/api/v1/user/?" + queryData, {
      method: "GET",
      credentials: "include",
    }).then(async (response) => {
      let data = await response.json();
      result = data;
    });

    return result;
  };

  const sendDataFromEditPage = ({ username }: any) => {
    if (username) {
      let firstName = username.split(" ")[0];
      let lastName = username.split(" ")[1];
      let middleName = username.split(" ")[2];

      fetch("http://localhost:8080/api/v1/user/fio", {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify({
          id: userIdData,
          firstName: firstName ? firstName : "",
          lastName: lastName ? lastName : "",
          middleName: middleName ? middleName : "",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => logicGetUserData());
    }
  };

  //получаем изображение загруженное пользователем
  const sendImgFromEditPage = async ({ userImgData }: any) => {
    if (userImgData && userIdData) {
      // Загружаем фото пользвоателя на сервер из стейта
      let photoFileID = await uploadFileToServer(userImgData);

      // Устанавливает фото пользователю в профиль
      let photoLink = await setUserPhotoToProfile(userIdData, photoFileID);

      // Загружает аватарку в локальное хранилище
      let localPhotoURL = await downloadUserPhoto(photoLink);
      // Ставим аватарку
      setObjectUrl(localPhotoURL);
    }
  };

  const uploadFileToServer = async (fileData: FormData): Promise<string> => {
    // Загружает файл на сервер с бекендом
    // В ответ возвращает строку с айди нового файла

    let newFileID = "";

    await fetch("http://localhost:8080/api/v1/file", {
      method: "POST",
      credentials: "include",
      body: fileData,
    }).then(async (response) => {
      let data = await response.json();
      newFileID = data;
    });

    return newFileID;
  };

  const setUserPhotoToProfile = async (
    userID: string,
    fileID: string
  ): Promise<string> => {
    // Устанавливает указанному пользователю новую аватаркку
    // В аргументы получает айди пользвоателя и айди уже загруженного файла на севрер
    // В ответ возвращает ссылку, по которой фото будет доступно для просмотра в браузере

    let newPhotoViewLink = "";

    let queryString = new URLSearchParams();
    queryString.append("id", userID);
    queryString.append("fileId", fileID);
    await fetch("http://localhost:8080/api/v1/user/photo", {
      method: "PATCH",
      credentials: "include",
      body: queryString,
    }).then(async (response) => {
      let data = await response.json();
      newPhotoViewLink = data.photoId;
    });

    return newPhotoViewLink;
  };

  const downloadUserPhoto = async (photoLink: string): Promise<string> => {
    // Скачивает фото пользователя и сохраняет куда-либо
    // Принимает ссылку, по которой фото нужно скачать
    // например в стейт

    let contentURL = "";

    await fetch("http://localhost:8080/api/v1/file/" + photoLink, {
      method: "GET",
      credentials: "include",
    }).then(async (response) => {
      let content = await response.blob();
      contentURL = URL.createObjectURL(content);
    });

    return contentURL;
  };

  //меняем состояние компонента

  const editCondition = () => {
    setOpenComponent(!openComponent);
  };

  const editForm = () => {
    setOpenEdit(!openEdit);
  };

  useEffect(() => {
    logicGetUserData();
  }, []);

  return (
    <>
      <Wrap>
        <SectionName onClick={editCondition}>Персональные данные</SectionName>
        <SectionAction onClick={editForm}>Редактировать</SectionAction>
      </Wrap>
      {openComponent && (
        <>
          {openEdit === true && (
            <EditPage
              sendDataFromEditPage={sendDataFromEditPage}
              userDataFromAPI={userDataFromApi}
              sendImgFromEditPage={sendImgFromEditPage}
              editForm={editForm}
              logicGetUserData={logicGetUserData}
            />
          )}
          {openEdit === false && (
            <ShowPage userData={userDataFromApi} objectUrl={objectUrl} />
          )}
        </>
      )}
    </>
  );
};

export default PersonalData;

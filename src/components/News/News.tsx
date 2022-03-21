import NewsPost from "./NewsPost/NewsPost";
import {
  SectionAction,
  SectionName,
  Wrap,
} from "../TitleSection/TitleSection.style";
import { useEffect, useState } from "react";

import Modal from "./Modal/Modal";
import DeleteModal from "./Modal/DeleteModal";

const News = () => {
  const [openComponent, setOpenComponent] = useState<boolean | undefined>(true);
  const [openEdit, setOpenEdit] = useState<boolean | undefined>(false);
  const [openDelete, setOpenDelete] = useState<boolean | undefined>(false);

  const [newsData, setNewsData] = useState<any>([]);

  const logicGetUserData = async () => {
    let newsData = await getNewsFromAPI();

    if (newsData) {
      setNewsData(newsData);

      newsData.forEach(async function (item: any) {
        let localPhotoUrl = await downloadNewsPhoto(item.fileId);

        item.fileId = localPhotoUrl;
      });
    }
  };

  //меняем состояние компонента

  const editCondition = () => {
    setOpenComponent(!openComponent);
  };

  const editForm = () => {
    setOpenEdit(!openEdit);
  };

  const deleteForm = () => {
    setOpenDelete(!openDelete);
  };

  const getNewsFromAPI = async () => {
    // Ходит в апи, чтоб получить полынй набор данных об актуальных новостях

    let result: any = [];

    await fetch("http://localhost:8080/api/v1/news/page", {
      method: "GET",
      credentials: "include",
    }).then(async (response) => {
      let data = await response.json();
      result = data;
    });

    if (result) {
      return result.content;
    }
  };

  const downloadNewsPhoto = async (newsItem: string): Promise<any> => {
    // Скачивает фото и сохраняет куда-либо
    // Принимает ссылку, по которой фото нужно скачать
    // например в стейт

    let contentURL = "";

    await fetch("http://localhost:8080/api/v1/file/" + newsItem, {
      method: "GET",
      credentials: "include",
    }).then(async (response) => {
      let content = await response.blob();
      contentURL = URL.createObjectURL(content);
    });

    return contentURL;
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

  // Загружает на сервер новую новость
  const uploadNewsDataToServer = async (
    content: string,
    title: string,
    fileId: string
  ) => {
    await fetch("http://localhost:8080/api/v1/news", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
        title: title,
        fileId: fileId,
      }),
    }).then(async (response) => {
      let data = await response.json();
      setNewsData([data, ...newsData]);
      return data;
    });
  };

  //обновляет новость
  const updateNewsDataToServer = async (
    content: string,
    title: string,
    fileId: string,
    id: string
  ) => {
    let data = {
      content: content,
      title: title,
      fileId: fileId,
    };

    await fetch("http://localhost:8080/api/v1/news?id=" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }).then(async (response) => {
      let data = await response.json();
    });
  };

  //удаляет данные
  const deleteNewsDataFromServer = async (id: string) => {
    await fetch("http://localhost:8080/api/v1/news?id=" + id, {
      method: "DELETE",
      credentials: "include",
    }).then((response) => {
      logicGetUserData();
    });
  };

  //получает данные с модальной формы
  const sendDataFromModalForm = async ({ theme, text, userImgData }: any) => {
    if (userImgData) {
      // Загружаем фото на сервер из стейта
      let photoFileID = await uploadFileToServer(userImgData);

      await uploadNewsDataToServer(text, theme, photoFileID);
    }
  };

  //получаем данные с модальной формы
  const sendDataFromEditModalForm = async ({
    selectedId,
    theme,
    text,
    userImgData,
  }: any) => {
    let photoFileID = await uploadFileToServer(userImgData);

    await updateNewsDataToServer(text, theme, photoFileID, selectedId);
  };

  useEffect(() => {
    logicGetUserData();
  }, []);

  return (
    <>
      <Wrap>
        <SectionName onClick={editCondition}>
          Редактирование новостей
        </SectionName>
        <SectionAction onClick={editForm}>+ Создать новость</SectionAction>
      </Wrap>
      <>
        {openComponent && (
          <>
            {openEdit === true && (
              <>
                <Modal
                  openData={openEdit}
                  editForm={editForm}
                  sendDataFromModalForm={sendDataFromModalForm}
                  sendDataFromEditModalForm={sendDataFromEditModalForm}
                  logicGetUserData={logicGetUserData}
                />
                <NewsPost newsData={newsData} />
              </>
            )}
            {openEdit === false && (
              <>
                <NewsPost
                  newsData={newsData}
                  editForm={editForm}
                  deleteForm={deleteForm}
                  logicGetUserData={logicGetUserData}
                />
              </>
            )}
            {openDelete === true && (
              <>
                <DeleteModal
                  deleteForm={deleteForm}
                  deleteNewsDataFromServer={deleteNewsDataFromServer}
                  logicGetUserData={logicGetUserData}
                />
                <NewsPost newsData={newsData} />
              </>
            )}
          </>
        )}
      </>
    </>
  );
};

export default News;

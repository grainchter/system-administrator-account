import { useEffect, useState } from "react";
import { SectionName, DirectoryWrap } from "../TitleSection/TitleSection.style";
import { ShowAllDictionary, Wrap, LinkWrap, CardWrap } from "./Directory.style";
import DirectoryCard from "./DirectoryCard/DirectoryCard";
import Modal from "./Modal/Modal";

const Directory = () => {
  const [openComponent, setOpenComponent] = useState<boolean | undefined>(true);
  const [openEdit, setOpenEdit] = useState<boolean | undefined>(false);

  //выпадающие списки
  const [optionPosition, setOptionPosition] = useState<any>([]);
  const [optionDepartment, setOptionDepartment] = useState<any>([]);
  const [optionRegion, setOptionRegion] = useState<any>([]);

  const [selectedData, setSelectedData] = useState<any>([]);
  const [selectedName, setSelectedName] = useState<string>("");

  let DATA = [
    {
      id: "1",
      name: "Департамент",
      type: "Расширяемый",
    },

    {
      id: "2",
      name: "Должность",
      type: "Расширяемый",
    },

    {
      id: "3",
      name: "Регион",
      type: "Расширяемый",
    },
  ];
  ////////////////////////

  const editCondition = () => {
    setOpenComponent(!openComponent);
  };

  const editForm = () => {
    setOpenEdit(!openEdit);
  };

  //получаем данные для выпадающих списков
  const logicGetOptionData = async () => {
    let position = await getOptionPosition();
    setOptionPosition(position);

    let department = await getOptionDepartment();
    setOptionDepartment(department);

    let region = await getOptionRegion();
    setOptionRegion(region);
  };

  const getSelectedId = (id: any) => {
    switch (id) {
      case "1": {
        setSelectedName("DEPARTMENT");
        setSelectedData(optionDepartment);
        break;
      }
      case "2": {
        setSelectedName("POSITION");
        setSelectedData(optionPosition);
        break;
      }
      case "3": {
        setSelectedName("REGION");
        setSelectedData(optionRegion);
        break;
      }
    }
  };

  const getOptionPosition = async () => {
    let result: any = [];

    await fetch("http://localhost:8080/api/v1/nsi/POSITION/page", {
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

  const getOptionDepartment = async () => {
    let result: any = [];

    await fetch("http://localhost:8080/api/v1/nsi/DEPARTMENT/page", {
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

  const getOptionRegion = async () => {
    let result: any = [];

    await fetch("http://localhost:8080/api/v1/nsi/REGION/page", {
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
  //////////////////////////////////////////

  const uploadDirectoryDataToServer = (editArray: any, selectedName: any) => {
    editArray.forEach(async (element: any) => {
      if (element.id === null) {
        let uploadData: any = [];
        uploadData.push(element.name);

        await fetch("http://localhost:8080/api/v1/nsi/" + selectedName, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        }).then(async (response) => {
          logicGetOptionData();
        });
      }
    });
  };

  //////////////////////////////////////////

  useEffect(() => {
    logicGetOptionData();
  }, []);

  return (
    <>
      <>
        <DirectoryWrap>
          <SectionName onClick={editCondition}>
            Управление справочниками
          </SectionName>
        </DirectoryWrap>
      </>
      {openComponent && (
        <>
          {openEdit === true && (
            <Modal
              editForm={editForm}
              selectedData={selectedData}
              selectedName={selectedName}
              uploadDirectoryDataToServer={uploadDirectoryDataToServer}
            />
          )}
          <>
            <Wrap>
              <CardWrap>
                {DATA.map(({ id, name, type }: any) => (
                  <div key={id}>
                    <DirectoryCard
                      id={id}
                      name={name}
                      type={type}
                      editForm={editForm}
                      getSelectedId={getSelectedId}
                    />
                  </div>
                ))}
              </CardWrap>
              <LinkWrap>
                <ShowAllDictionary>Показать все справочники</ShowAllDictionary>
              </LinkWrap>
            </Wrap>
          </>
        </>
      )}
    </>
  );
};

export default Directory;

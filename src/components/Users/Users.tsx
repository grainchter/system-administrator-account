import { useEffect, useState } from "react";
import {
  SectionAction,
  SectionName,
  UserSectionName,
  UserWrap,
  Wrap,
} from "../TitleSection/TitleSection.style";
import Modal from "./Modal/Modal";
import ShowUserData from "./ShowUserData/ShowUserData";

const Users = () => {
  const [usersData, setUsersData] = useState<any>([]);
  const [openComponent, setOpenComponent] = useState<boolean | undefined>(true);
  const [openEdit, setOpenEdit] = useState<boolean | undefined>(false);

  //выпадающие списки
  const [optionPosition, setOptionPosition] = useState<any>([]);
  const [optionDepartment, setOptionDepartment] = useState<any>([]);
  const [optionRegion, setOptionRegion] = useState<any>([]);
  ////////////////////////

  const editCondition = () => {
    setOpenComponent(!openComponent);
  };

  const editForm = () => {
    setOpenEdit(!openEdit);
  };

  //получаем данные от сервера
  const getUsersDataFromApi = async () => {
    let data: any = [];

    await fetch("http://localhost:8080/api/v1/user/page", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(async (response) => {
      let responseData = await response.json();
      data = responseData.content;
    });
    return data;
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

  //загружаем на сервер
  const uploadDataToServer = ({
    selectedNameData,
    selectedEmailData,
    selectedDepartmentData,
    selectedPositionData,
    selectedPhoneData,
    selectedRegionData,
  }: any) => {
    if (
      selectedNameData &&
      selectedEmailData &&
      selectedDepartmentData &&
      selectedPositionData &&
      selectedPhoneData &&
      selectedRegionData
    ) {
      fetch("http://localhost:8080/api/v1/user/rou/emplyee", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          department: selectedDepartmentData,
          firstName: selectedNameData.split(" ")[0],
          lastName: selectedNameData.split(" ")[1],
          middleName: selectedNameData.split(" ")[2],
          password: "string",
          position: selectedPositionData,
          region: selectedRegionData,
          email: selectedEmailData,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => logicGetUserDataFromApi());
    }
  };
  ////////////////////////////////////////////////////

  const logicGetUserDataFromApi = async () => {
    let usersData = await getUsersDataFromApi();
    setUsersData(usersData);
  };

  useEffect(() => {
    logicGetUserDataFromApi();
    logicGetOptionData();
  }, []);

  return (
    <>
      <UserWrap>
        <SectionName onClick={editCondition}>
          Управление пользователями
        </SectionName>
      </UserWrap>
      {openComponent && (
        <>
          <Wrap>
            <UserSectionName>Сотрудник</UserSectionName>
            <SectionAction
              onClick={() => {
                editForm();
              }}
            >
              + Добавить пользователя
            </SectionAction>
          </Wrap>
          {openEdit && (
            <>
              <Modal
                editForm={editForm}
                logicGetUserDataFromApi={logicGetUserDataFromApi}
                uploadDataToServer={uploadDataToServer}
                optionPosition={optionPosition}
                optionDepartment={optionDepartment}
                optionRegion={optionRegion}
              />
            </>
          )}
          <ShowUserData usersData={usersData} />
        </>
      )}
    </>
  );
};

export default Users;

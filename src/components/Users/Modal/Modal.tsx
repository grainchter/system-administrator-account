import { useState } from "react";
import {
  MainContainer,
  ModalTitle,
  ModalWrap,
  SelectInput,
  TextInput,
  Wrap,
  ButtonSave,
  Required,
} from "./Modal.style";

const Modal = ({
  editForm,
  logicGetUserDataFromApi,
  uploadDataToServer,
  optionPosition,
  optionDepartment,
  optionRegion,
}: any) => {
  const [selectedNameData, setSelectedNameData] = useState<string>("");
  const [selectedEmailData, setSelectedEmailData] = useState<string>("");
  const [selectedDepartmentData, setSelectedDepartmentData] =
    useState<string>("");
  const [selectedPositionData, setSelectedPositionData] = useState<string>("");
  const [selectedPhoneData, setSelectedPhoneData] = useState<string>("");
  const [selectedRegionData, setSelectedRegionData] = useState<string>("");

  //получаем данные, которые вводит пользователь
  const getNameValue = (e: React.FormEvent<HTMLInputElement>) => {
    setSelectedNameData(e.currentTarget.value);
  };

  const getDepartmentValue = (e: React.FormEvent<HTMLSelectElement>) => {
    let departmentId = optionDepartment.find(
      (department: any) => department.name === e.currentTarget.value
    ).id;
    setSelectedDepartmentData(departmentId);
  };

  const getMailValue = (e: React.FormEvent<HTMLInputElement>) => {
    setSelectedEmailData(e.currentTarget.value);
  };

  const getPhoneValue = (e: React.FormEvent<HTMLInputElement>) => {
    setSelectedPhoneData(e.currentTarget.value);
  };

  const getPositionValue = (e: React.FormEvent<HTMLSelectElement>) => {
    let positionId = optionPosition.find(
      (position: any) => position.name === e.currentTarget.value
    ).id;

    setSelectedPositionData(positionId);
  };

  const getRegionValue = (e: React.FormEvent<HTMLSelectElement>) => {
    let regionId = optionRegion.find(
      (position: any) => position.name === e.currentTarget.value
    ).id;

    setSelectedRegionData(regionId);
  };
  ////////////////////////////////////////

  return (
    <>
      <Wrap>
        <ModalWrap>
          <ModalTitle>Добавить администратора РОУ</ModalTitle>
          <MainContainer>
            <Required>
              <TextInput placeholder="ФИО" onChange={getNameValue} />
            </Required>
            <Required>
              <SelectInput onChange={getPositionValue}>
                <option disabled selected>
                  Должность
                </option>
                {optionPosition.map(({ name, id }: any) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
              </SelectInput>
            </Required>
            <Required>
              <TextInput
                placeholder="Почта"
                onChange={getMailValue}
              ></TextInput>
            </Required>
            <TextInput
              placeholder="Телефон"
              onChange={getPhoneValue}
            ></TextInput>
            <Required>
              <SelectInput onChange={getDepartmentValue}>
                <option disabled selected>
                  Департамент
                </option>
                {optionDepartment.map(({ name, id }: any) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
              </SelectInput>
            </Required>
            <Required>
              <SelectInput onChange={getRegionValue}>
                <option disabled selected>
                  Регион
                </option>
                {optionRegion.map(({ name, id }: any) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
              </SelectInput>
            </Required>
          </MainContainer>
          <ButtonSave
            onClick={() => {
              editForm();
              uploadDataToServer({
                selectedNameData,
                selectedEmailData,
                selectedDepartmentData,
                selectedPositionData,
                selectedPhoneData,
                selectedRegionData,
              });
              logicGetUserDataFromApi();
            }}
          >
            Сохранить
          </ButtonSave>
        </ModalWrap>
      </Wrap>
    </>
  );
};

export default Modal;

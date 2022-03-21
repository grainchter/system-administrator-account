import {
  Wrap,
  ImgProfile,
  WrapData,
  Title,
  ProfileData,
} from "./ShowPage.style";

const ShowPage = ({ userData, objectUrl }: any) => {

  //склеивание данных пользователя
  const createUserNameData = () => {
    let username =
      userData.firstName + " " + userData.lastName + " " + userData.middleName;

    return username;
  };

  return (
    <>
      <Wrap>
        <ImgProfile src={objectUrl} />
        <WrapData>
          <Title>Ф.И.О.</Title>
          <ProfileData>{createUserNameData()}</ProfileData>
          <Title>Email</Title>
          <ProfileData>{userData.email}</ProfileData>
        </WrapData>
      </Wrap>
    </>
  );
};

export default ShowPage;

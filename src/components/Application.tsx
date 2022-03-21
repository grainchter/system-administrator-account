import { Container, Wrap } from "./Application.style";
import Directory from "./Directory/Directory";
import Header from "./Header/Header";
import News from "./News/News";
import PersonalData from "./PersonalData/PersonalData";
import Users from "./Users/Users";

function Application() {
  return (
    <>
      <Wrap>
        <Container>
          <Header />
          <PersonalData />
          <News />
          <Directory />
          <Users />
        </Container>
      </Wrap>
    </>
  );
}

export default Application;

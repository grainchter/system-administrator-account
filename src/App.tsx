import { useEffect } from "react";
import { useState } from "react";

import Application from "./components/Application";

function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (login === false) {
      fetch("http://localhost:8080/api/login", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        body: "username=test@mail.com&password=test",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((response) => {
        if (response.status === 200) {
          setLogin(true);
        }
      });
    }
  }, [login]);

  return (
    <>
      {login === true && <Application />}

      {login === false && <>ответ еще не пришел</>}
    </>
  );
}

export default App;

import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Footer from "./components/Footer";

import React, { useEffect, useState } from "react";
import useToken from "./hooks/useToken";
import { getData } from "./utils/network";

export const UserContext = React.createContext(null);

const App = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [user, setUser] = useState();
  const { loggedIn } = useToken();
  
  useEffect(() => {
    if (loggedIn)
      getData("users/me").then((res) => {
        if (res.success) {
          setUser(res.data);
          return 
        }
      localStorage.removeItem("access_token");
      setUser(null)
      });
  }, []);

  return (
    <UserContext.Provider value={{user:user, setUser:setUser}}>
      <Header active={menuActive} setActive={setMenuActive} />
      <Outlet />
      <Menu active={menuActive} setActive={setMenuActive} />
      <Footer />
    </UserContext.Provider>
  );
};

export default App;

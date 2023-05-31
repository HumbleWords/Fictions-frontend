import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Footer from "./components/Footer";

import { useEffect, useState } from "react";

const App = () => {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <div>
      <Header active={menuActive} setActive={setMenuActive} />
      <Outlet />
      <Menu active={menuActive} setActive={setMenuActive} />
      <Footer /> 
    </div>
  );
};

export default App;


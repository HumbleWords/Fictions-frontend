import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import useToken from "../hooks/useToken";
import { useEffect, useState, useContext } from "react";
import { getData } from "../utils/network";
import { UserContext } from "../App";

import logo from "../assets/images/logo.png";
import setting from "../assets/images/setting.png";
import profile from "../assets/images/profile.png";
import "./style/header.scss";

const Header = ({ active, setActive }) => {
  // const [user, setUser] = useState({});
  // const {role} = useRole();
  const { user, setUser } = useContext(UserContext);
  const { loggedIn } = useToken();

  // const getUser = async () => {
  //   const res = await getData("users/me");
  //   if (!res.success) alert(res.message);
  //   else setUser(res.data);
  //   console.log({ res });
  // };

  // useEffect(() => {
  //   if (loggedIn) getUser();
  // }, []);

  return (
    <Navbar className="nav">
      <div className="burger" onClick={() => setActive(!active)}>
        <input type="checkbox" className="checkbox" />
        <label className="box"></label>
        <label className="trigger"></label>
      </div>
      <div className="logo">
        <a href="/">
          <img src={logo} />
        </a>
      </div>
      
      {loggedIn ? (
        <div className="profile">
          {user && user.role == "ADMIN" ? (
            <a href="/admin">
              <img src={setting} />
            </a>
          ) : (
            <a href="/profile">
              <img src={profile} />
            </a>
          )}
        </div>
      ) : null}
    </Navbar>
  );
};

export default Header;

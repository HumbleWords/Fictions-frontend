import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useLocation } from "react-router";
import useToken from "../hooks/useToken";
import { useEffect, useState } from "react";
import { getData } from "../utils/network";

import profile from "../assets/images/profile.png";
import "./style/header.scss";

const Header = ({ active, setActive }) => {
  const [user, setUser] = useState({});
  const { pathname } = useLocation();
  const { loggedIn } = useToken();

  const getUser = async () => {
    const res = await getData("users/me");
    if (!res.success) alert(res.message);
    else setUser(res.data);
    console.log({ res });
  };

  useEffect(() => {
    if (loggedIn) getUser();
  }, []);

  return (
    <Navbar className="nav">
      <div className="burger" onClick={() => setActive(!active)}>
        {/* <span />
        <span />
        <span /> */}
        <input type="checkbox" className="checkbox" />
        <label className="box"></label>
        <label className="trigger"></label>
        {/* <label className="trigger-one"></label>
        <label className="trigger-two"></label>
        <label className="trigger-free"></label> */}
      </div>
      <div className="profile">
        {loggedIn ? (
          <a href="/profile">
            <img src={profile} />
          </a>
        ) : null}
      </div>
    </Navbar>
  );
};

export default Header;

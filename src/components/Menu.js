import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

import { useLocation } from "react-router";
import useToken from "../hooks/useToken";
import { useEffect, useState } from "react";
import { getData } from "../utils/network";

import "./style/header.scss";
import home from "../assets/images/home.png";
import search from "../assets/images/search.png";
import works from "../assets/images/works.png";
import myworks from "../assets/images/myworks.png";
import login from "../assets/images/login.png";
import logout from "../assets/images/logout.png";

const Menu = ({ active, setActive }) => {
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
    <Navbar className="menu">
      <div className="menu-mini">
        <Nav className="content-mini">
          <Nav.Link as={Link} to="/" disabled={pathname === "/"}>
            <img className="icons-mini" src={home} />
          </Nav.Link>
          <Nav.Link as={Link} to="/search" disabled={pathname === "/search"}>
            <img className="icons-mini" src={search} />
          </Nav.Link>
          <Nav.Link as={Link} to="/works" disabled={pathname === "/works"}>
            <img className="icons-mini" src={works} />
          </Nav.Link>
          <Nav.Link as={Link} to="/myworks" disabled={pathname === "/myworks"}>
            <img className="icons-mini" src={myworks} />
          </Nav.Link>
          <div className="login">
            {loggedIn ? (
              <Nav.Link href="/">
                <img
                  className="icons-mini"
                  src={logout}
                  onClick={() => {
                    localStorage.removeItem("access_token");
                  }}
                />
              </Nav.Link>
            ) : (
              <Nav.Link
                as={Link}
                to="/signin"
                disabled={pathname === "/signin"}
              >
                <img className="icons-mini" src={login} />
              </Nav.Link>
            )}
          </div>
        </Nav>
      </div>
      <div
        className={active ? "menu active" : "menu"}
        onClick={() => setActive(false)}
      >
        {/* onClick={(e) => e.stopPropagation()} */}
        <div className="content">
          <ul>
            {/* <ol>
              <img className="icons" src={home} />
              <a href="/">Главная</a>
            </ol>
            <ol>
              <img className="icons" src={search} />
              <a href="/search">Поиск</a>
            </ol>
            <ol>
              <img className="icons" src={works} />
              <a href="/works">Работы</a>
            </ol>
            <ol>
              <img className="icons" src={myworks} />
              <a href="/myworks">Мои работы</a>
            </ol> */}

            <ol>
              <a href="/">
                <img className="icons" src={home} />
                Главная
              </a>
            </ol>
            <ol>
              <a href="/search">
                <img className="icons" src={search} />
                Поиск
              </a>
            </ol>
            <ol>
              <a href="/works">
                <img className="icons" src={works} />
                Работы
              </a>
            </ol>
            <ol>
              <a href="/myworks">
                <img className="icons" src={myworks} />
                Мои работы
              </a>
            </ol>
            <div className="login">
              <ol>
                {loggedIn ? (
                  <a href="/">
                    <img
                      className="icons"
                      src={logout}
                      onClick={() => {
                        localStorage.removeItem("access_token");
                      }}
                    />Выйти
                  </a>
                ) : (
                  <a href="/signin">
                    <img className="icons" src={login} /> Войти
                  </a>
                )}
              </ol>
            </div>
          </ul>
        </div>
      </div>
    </Navbar>
  );
};

export default Menu;

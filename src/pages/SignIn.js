import { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { postData, getData } from "../utils/network";

import useLoginGuard from "../hooks/useLoginGuard";
import "../style/sign.scss";
import { UserContext } from "../App";

const SignIn = () => {
  const { pathname } = useLocation();
  const [validated, setValidated] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const res = await postData("auth/login", {
      username,
      password,
    });
    if (res.success) {
      localStorage.setItem("access_token", res.data.access_token);
      getData("users/me").then((response) => {
        if (response.success) {
          setUser(response.data);
          return;
        }
      });
      navigate("/");
    } else alert(`Error: ${res.message}`);
  };

  const handleSubmits = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className="sign-page">
      <Card className="card">
        <h1 className="titlet">Войти в FICTIONS</h1>
        <Form
          className="form"
          noValidate
          validated={validated}
          onSubmit={handleSubmits}
        >
          <Form.Control
            required
            className="input"
            type="text"
            placeholder="Логин"
            value={username}
            onInput={handleSubmits}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Control
            required
            className="input"
            type="password"
            placeholder="Пароль"
            value={password}
            onInput={handleSubmits}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="button" onClick={login}>
            Войти
          </button>
        </Form>

        <Nav.Link
          className="signup"
          as={Link}
          to="/signup"
          disabled={pathname === "/signup"}
        >
          Зарегистрироваться
        </Nav.Link>
      </Card>
    </div>
  );
};

export default SignIn;

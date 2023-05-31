import { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

import { Link } from "react-router-dom";

// import vk from "../assets/vk.png";

import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { postData } from "../utils/network";

import useLoginGuard from "../hooks/useLoginGuard";
import "../style/sign.scss";

const SignIn = () => {
  const { pathname } = useLocation();
  const [validated, setValidated] = useState(false);

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
      console.log({ res });
      localStorage.setItem("access_token", res.data.access_token);
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
    <div className="page">
      <Card className="sign-card">
        <h1 className="sign-text">Войти в FICTIONS</h1>
        <Form
          className="sign-form"
          noValidate
          validated={validated}
          onSubmit={handleSubmits}
        >
          <Form.Control
            required
            className="sign-input"
            type="text"
            placeholder="Логин"
            value={username}
            onInput={handleSubmits}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Control
            required
            className="sign-input"
            type="password"
            placeholder="Пароль"
            value={password}
            onInput={handleSubmits}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="sign-button" onClick={login}>
            Войти
          </button>
          {/* <Button className="sign-button-vk" onClick={login}>
            <img className="sign-vk" src={vk} /> Войти через ВК
          </Button> */}
        </Form>

        <Nav.Link
          className="signup-t"
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

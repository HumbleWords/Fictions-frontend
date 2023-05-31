import { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Link } from "react-router-dom";

import back from "../assets/images/back.png";
// import vk from "../assets/vk.png";

import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { postData } from "../utils/network";

import "../style/sign.scss";

const SignUp = () => {
  const { pathname } = useLocation();

  const [email, seEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  // const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    const res = await postData("auth/register", {
      username,
      email,
      birthdate,
      password,

    });
    if (res.success) {
      console.log({ res });
      localStorage.setItem("access_token", res.data.access_token);
      navigate("/");
    } else alert(`Error: ${res.message}`);
  };

  // const handleSubmits = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   setValidated(true);
  // };

  return (
    <div className="page">
      <Card>
        <h1>
          <Row>
            <Col sm={1}>
              <Nav.Link
                as={Link}
                to="/signin"
                disabled={pathname === "/signin"}
              >
                <img src={back} />
              </Nav.Link>
            </Col>
            <Col sm={11}>Присоединиться к FICTIONS</Col>
          </Row>
        </h1>
        <Form>
        {/* noValidate validated={validated} onSubmit={handleSubmits} */}
          <Form.Control
            required
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Control
            required
            type="email"
            placeholder="Электронная почта"
            value={email}
            onChange={(e) => seEmail(e.target.value)}
          />
          <Form.Control
            required
            type="text"
            placeholder="Дата рождения"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
          <Form.Control
            required
            type="text"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Check
            required
            type="checkbox"
            label="Согласие с Условиями пользования и Политикой конфиденциальности"
            feedback="Необходимо ваше согласие"
            feedbackType="invalid"
          />

          <button className="sign-button" onClick={register}>
            Зарегистрироваться
          </button>
          {/* <Button className="sign-button-vk" onClick={register}>
            <img className="sign-vk" src={vk} /> Войти через ВК
          </Button> */}
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;

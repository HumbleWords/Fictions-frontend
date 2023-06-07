import { useContext, useState } from "react";
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
import { postData, getData } from "../utils/network";

import "../style/sign.scss";
import { UserContext } from "../App";

const SignUp = () => {
  const { pathname } = useLocation();

  const { user, setUser } = useContext(UserContext);

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
      getData("users/me").then((response) => {
        if (response.success) {
          setUser(response.data);
          return;
        }
      });
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
    <div className="sign-page">
      <Card>
        <h1>Присоединиться к FICTIONS</h1>

        <Form className="form">
          {/* noValidate validated={validated} onSubmit={handleSubmits} */}
          <Form.Control
            className="input"
            required
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Control
            className="input"
            required
            type="email"
            placeholder="Электронная почта"
            value={email}
            onChange={(e) => seEmail(e.target.value)}
          />
          <Form.Control
            className="input"
            required
            type="text"
            placeholder="Дата рождения"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
          <Form.Control
            className="input"
            required
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Check
            className="input-check"
            required
            type="checkbox"
            label="Согласие с Условиями пользования и Политикой конфиденциальности"
            feedback="Необходимо ваше согласие"
            feedbackType="invalid"
          />

          <button className="button" onClick={register}>
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

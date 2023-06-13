import { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { postData, getData } from "../utils/network";

import "../style/sign.scss";
import { UserContext } from "../App";

const SignUp = () => {
  const { user, setUser } = useContext(UserContext);

  const [email, seEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
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

  return (
    <div className="sign-page">
      <Card>
        <h1>Присоединиться к FICTIONS</h1>

        <Form className="form">
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
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;

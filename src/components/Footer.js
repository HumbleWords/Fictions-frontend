import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

import { Link } from "react-router-dom";
import { useLocation } from "react-router";

import tumblr from "../assets/images/tumblr.png";
import yandex from "../assets/images/yandex.png";
import vk from "../assets/images/vk.png";
import "./style/footer.scss";

const Footer = () => {
  const { pathname } = useLocation();

  return (
    <div className="footer" fluid="true">
      <Row>
        <Col>
          <h1>ИНФО</h1>
          <div className="info">
            <p className="text">г. Владимир, ул. Мира, 42</p>
            <p className="text">+7 (900) 000-00-00</p>
          </div>
        </Col>
        <Col>
          <h1>Fictions</h1>
          <ul>
            <Nav.Link
              as={Link}
              to="/"
              disabled={pathname === "/"}
              className="text"
            >
              Главная
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/search"
              disabled={pathname === "/search"}
              className="text"
            >
              Поиск
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/works"
              disabled={pathname === "/works"}
              className="text"
            >
              Работы
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/myworks"
              disabled={pathname === "/myworks"}
              className="text"
            >
              Мои работы
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/info"
              disabled={pathname === "/info"}
              className="text"
            >
              Информация
            </Nav.Link>
          </ul>
        </Col>
        <Col>
          <h1>Связь</h1>
          <div className="image">
            <a href="https://vk.com/" target="_blank">
              <img src={vk} />
            </a>
            <a href="https://www.tumblr.com/" target="_blank">
              <img src={tumblr} />
            </a>
            <a href="mailto:an.an17.5.16@yandex.tu" target="_blank">
              <img src={yandex} />
            </a>
          </div>
        </Col>
      </Row>
      <div className="text">&copy; 2023 FICTIONS </div>
    </div>
  );
};

export default Footer;

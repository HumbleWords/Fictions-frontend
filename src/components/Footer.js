import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

import { Link } from "react-router-dom";
import { useLocation } from "react-router";

// import logo from "../assets/logo-footer.png";
import "./style/footer.scss";

const Footer = () => {
  const { pathname } = useLocation();

  return (
    <div className="footer" fluid>
      <Row>
        <Col>
          <h1>ИНФО</h1>
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
        </Col>
      </Row>
      <div className="text">&copy; 2023 FICTIONS </div>
    </div>
  );
};

export default Footer;

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

// import logo from "../assets/logo-footer.png";
import "./style/footer.scss";

const Footer = () => {
  return (
    <div className="footer" fluid>
      <Row>
        <Col>
          <h1>ИНФО</h1>
        </Col>
        <Col>
          <h1>Fictions</h1>
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

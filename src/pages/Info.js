import Accordion from "react-bootstrap/Accordion";

import "../style/info.scss";

const Info = () => {
  return (
    <div className="info-page">
      <div className="header">
        <h2 >Условия использования сайта</h2>
      </div>
      <Accordion className="accord">
        <Accordion.Item eventKey="0" className="item">
          <Accordion.Header className="header">
            <a>Условия регистрации</a>
          </Accordion.Header>
          <Accordion.Body className="text">text</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1" className="item">
          <Accordion.Header className="header">
            <a>Условия публикации работ</a>
          </Accordion.Header>
          <Accordion.Body className="text">text</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2" className="item">
          <Accordion.Header className="header">
            <a>Условия комментирования работ</a>
          </Accordion.Header>
          <Accordion.Body className="text">text</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Info;

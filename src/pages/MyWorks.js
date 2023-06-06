import { Card, Col, Form, Row, Button, Nav } from "react-bootstrap";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getData } from "../utils/network";

import "../style/works.scss";
import cover from "../assets/images/cover1.png";

const Work = ({ work }) => {
  const navigate = useNavigate();

  const decodeHtml = (html) => {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <Card className="card">
      <Card.Body>
        <Row>
          <Col xs={12} sm={4} md={3} lg={3} xl={3}>
            <img
              src={cover}
              onClick={() => {
                navigate("/works/" + work.id);
              }}
            />
          </Col>
          <Col className="container" xs={12} sm={6} md={7} lg={8} xl={8}>
            <Nav.Link as={Link} className="title" to={"/works/" + work.id}>
              <h5>{work.title}</h5>
            </Nav.Link>
            <ul className="desc">
              <Nav.Link className="text">
                Категория: {work.category ?? "Не указано"}
                <br />
                Рейтинг: {work.rating ?? "Не указано"} <br />
                Фандомы:{" "}
                <ul>
                  {work.fandoms
                    ? work.fandoms.map((fandom) => (
                        <Nav.Link
                          as={Link}
                          className="text"
                          to={"/fandoms/" + fandom.id}
                        >
                          <span key={fandom.id}>{fandom.name}, </span>
                        </Nav.Link>
                      ))
                    : null}
                </ul>
                Теги:{" "}
                <ul>
                  {work.tags
                    ? work.tags.map((tag) => (
                        <Nav.Link
                          as={Link}
                          className="text"
                          to={"/tags/" + tag.id}
                        >
                          <span key={tag.id}>{tag.name}, </span>
                        </Nav.Link>
                      ))
                    : null}
                </ul>
              </Nav.Link>
              <Nav.Link
                className="text"
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(work.description),
                }}
              ></Nav.Link>
            </ul>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const MyWorks = ({}) => {
  const [WorksList, setWorksList] = useState([]);

  async function getWorksList() {
    const res = await getData("works/myworks?skip=0&take=20&orderBy=asc");
    if (!res.success) return alert(res.message);
    console.log({ res });
    return setWorksList(res.data);
  }

  useEffect(() => {
    getWorksList();
  }, []);

  return (
    <div className="work-page">
      <Row>
        <Col>
          <div className="list">
            <ul>
              {WorksList ? (
                WorksList.map((work) => <Work key={work.id} work={work} />)
              ) : (
                <p>Работ нет</p>
              )}
            </ul>
          </div>
        </Col>

        <Col>
          <div className="sort">
            <Card className="card">
              <Card.Body>
                <Card.Title className="title">Фильтрация</Card.Title>
                <Form className="form">
                  <Form.Group className="line">
                    <Form.Label>label</Form.Label>
                    <Form.Select>
                      <option>1</option>
                      <option>2</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="line">
                    <Form.Label>label</Form.Label>
                    <Form.Select>
                      <option>1</option>
                      <option>2</option>
                    </Form.Select>
                  </Form.Group>
                  <Row>
                    <Col>
                      <Button className="button" type="search">
                        Фильтровать
                      </Button>
                    </Col>
                    <Col>
                      <Button className="button">Сброс</Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MyWorks;

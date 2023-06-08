import { Card, Col, Form, Row, Button, Nav } from "react-bootstrap";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getData } from "../utils/network";

import "../style/works.scss";
import cover from "../assets/images/cover1.png";

const CATEGORIES = {
  GEN: "Нет любовных линий",
  F_M: "Гет",
  M_M: "ММ",
  F_F: "ЖЖ",
  OTHER: "Другое",
};

const RATINGS = {
  G: "Нет возрастных ограничений",
  PG: "Не рекомендуется детям",
  PG_13: "От 13 лет",
  R: "От 16 лет",
  NC_17: "От 17 лет",
};

const Work = ({ work }) => {
  const navigate = useNavigate();

  const decodeHtml = (html) => {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <Card className="card">
      <Card.Body className="container">
        <Row>
          <Col xs={12} sm={12} md={12} lg={3} xl={3}>
            <img
              src={cover}
              onClick={() => {
                navigate("/works/" + work.id);
              }}
            />
          </Col>
          <Col
            // xxs={6}
            xs={12}
            sm={12}
            md={12}
            lg={8}
            xl={8}
          >
            <Nav.Link as={Link} className="title" to={"/works/" + work.id}>
              <h5>{work.title}</h5>
            </Nav.Link>
            <span className="divider" />
            <ul className="description">
              <Nav.Link
                className="text"
                as={Link}
                to={"/users/" + work.authorId}
              >
                Автор: {work.author.username}
              </Nav.Link>
              <p className="text">
                Категория:{" "}
                {work.category ? CATEGORIES[work.category] : "Не указано"}
                <br />
                Рейтинг: {work.rating
                  ? RATINGS[work.rating]
                  : "Не указано"}{" "}
                <br />
                Фандомы:{" "}
                <ul className="list">
                  {work.fandoms
                    ? work.fandoms.map((fandom) => (
                        <Nav.Link
                          as={Link}
                          className="text"
                          to={"/fandoms/" + fandom.id}
                        >
                          <span key={fandom.id}>{fandom.name}</span>
                        </Nav.Link>
                      ))
                    : null}
                </ul>
                Теги:{" "}
                <ul className="list">
                  {work.tags
                    ? work.tags.map((tag) => (
                        <Nav.Link
                          as={Link}
                          className="text"
                          to={"/tags/" + tag.id}
                        >
                          <span key={tag.id}>{tag.name}</span>
                        </Nav.Link>
                      ))
                    : null}
                </ul>
              </p>
              <span className="divider" />
              <p
                className="text"
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(work.description),
                }}
              ></p>
            </ul>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const Works = ({}) => {
  const [WorksList, setWorksList] = useState([]);
  const [orderParam, setOrderParam] = useState("updatedAt");
  const [orderBy, setOrderBy] = useState("desc");

  async function getWorksList() {
    const res = await getData(
      `works?skip=0&take=20&orderBy=${orderBy}&orderParam=${orderParam}`
    );
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
                    <Form.Label>Сортировать по</Form.Label>
                    <Form.Select
                      defaultValue={orderParam}
                      onChange={(event) => setOrderParam(event.target.value)}
                    >
                      <option value={"createdAt"}>Дата создания</option>
                      <option value={"updatedAt"}>Дата обновления</option>
                      <option value={"title"}>Название</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="line">
                    <Form.Select
                      defaultValue={orderBy}
                      onChange={(event) => setOrderBy(event.target.value)}
                    >
                      <option value={"desc"}>По убыванию</option>
                      <option value={"asc"}>По возрастанию</option>
                    </Form.Select>
                  </Form.Group>
                  <Row>
                    <Col>
                      <Button
                        className="button"
                        onClick={(e) => {
                          e.preventDefault();
                          getWorksList();
                        }}
                      >
                        Сортировать
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        className="buttontwo"
                        onClick={(e) => {
                          e.preventDefault();
                          setOrderBy("desc");
                          setOrderParam("updatedAt");
                          getWorksList();
                        }}
                      >
                        Сброс
                      </Button>
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

export default Works;

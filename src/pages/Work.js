import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

import { useEffect, useState } from "react";
import { getData } from "../utils/network";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import "../style/works.scss";
import cover from "../assets/images/cover1.png";
import useToken from "../hooks/useToken";
import CommentForm from "../components/CommentForm";

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

const WorkParts = ({ workPart }) => {
  const decodeHtml = (html) => {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <Card className="card">
      <Card.Body>
        <div xs={8} className="container">
          <Card.Title className="title">{workPart.title}</Card.Title>

          <ul>
            <p
              className="text"
              dangerouslySetInnerHTML={{
                __html: decodeHtml(workPart.description),
              }}
            ></p>
            <p
              className="text"
              dangerouslySetInnerHTML={{
                __html: decodeHtml(workPart.text),
              }}
            ></p>
          </ul>
        </div>
      </Card.Body>
    </Card>
  );
};

const Work = () => {
  const [work, setWork] = useState({});

  const { loggedIn } = useToken();

  const { id } = useParams();
  console.log(id);

  const getWork = async () => {
    const res = await getData(`works/${id}`);
    if (res.success) setWork(res.data);
  };

  useEffect(() => {
    getWork();
  }, []);

  const decodeHtml = (html) => {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div className="work-page">
      <div className="workone">
        <Card className="card">
          <Card.Body>
            <Row>
              <Col xxs={6} xs={6} sm={4} md={4} lg={3} xl={2} xxl={2}>
                <img src={cover} />
              </Col>
              <Col
                className="container"
                xxs={6}
                xs={6}
                sm={6}
                md={8}
                lg={9}
                xl={8}
                xxl={9}
              >
                <ul className="description">
                  Категория:{" "}
                  {work.category ? CATEGORIES[work.category] : "Не указано"}
                  <br />
                  Рейтинг: {work.rating
                    ? RATINGS[work.rating]
                    : "Не указано"}{" "}
                  <br />
                  Фандомы:{" "}
                  <ul className="list">
                    {work?.fandoms
                      ? work?.fandoms.map((fandom) => (
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
                    {work?.tags
                      ? work?.tags.map((tag) => (
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
                </ul>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <div className="part">
          <ul>
            {work?.parts && work.parts.length == 1 ? (
              <Card className="card">
                <Card.Body>
                  <div className="heading">
                    <h2>{work.title}</h2>
                    <h3>
                      <Nav.Link as={Link} to={"/users/" + work?.authorId}>
                        Автор: {work?.author?.username}
                      </Nav.Link>
                    </h3>
                    <span className="divider" />
                    <h4>Описание работы</h4>
                    <p
                      className="text"
                      dangerouslySetInnerHTML={{
                        __html: decodeHtml(work.description),
                      }}
                    ></p>
                    {work.note ? (
                      <>
                        <h4>Примечания автора</h4>
                        <p
                          className="text"
                          dangerouslySetInnerHTML={{
                            __html: decodeHtml(work.note),
                          }}
                        ></p>
                      </>
                    ) : null}
                    <span className="divider" />
                  </div>
                  <div
                    xs={8}
                    className="container"
                    dangerouslySetInnerHTML={{
                      __html: decodeHtml(work.parts[0].text),
                    }}
                  ></div>
                </Card.Body>
              </Card>
            ) : work?.parts && work.parts.length > 0 ? (
              <>
                <div className="heading">
                  <h2>{work.title}</h2>
                  <h3>
                    <Nav.Link as={Link} to={"/users/" + work?.authorId}>
                      Автор: {work?.author?.username}
                    </Nav.Link>
                  </h3>
                  <p
                    className="text"
                    dangerouslySetInnerHTML={{
                      __html: decodeHtml(work.description),
                    }}
                  ></p>
                  {work.note ? (
                    <p
                      className="text"
                      dangerouslySetInnerHTML={{
                        __html: decodeHtml(work.note),
                      }}
                    ></p>
                  ) : null}
                  <span className="divider" />
                </div>
                {work.parts?.map((workPart) => (
                  <WorkParts key={workPart.id} workPart={workPart} />
                ))}
              </>
            ) : (
              <p>На данный момент здесь пусто</p>
            )}
          </ul>
        </div>
        <div className="comment-section">
          <Card className="card">
            <Card.Body>
              <h2>Комментарии</h2>
              <div xs={8} className="container">
                {loggedIn ? <CommentForm /> : null}
                {work?.comments ? <ul> </ul> : <p>Комментариев нет</p>}
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Work;

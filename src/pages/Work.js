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

const WorkParts = ({ workPart }) => {
  const decodeHtml = (html) => {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={3}>
            <img className="image" src={cover} />
          </Col>
          <Col xs={8} className="container">
            <Card.Title className="title">{workPart.title}</Card.Title>

            <ul className="desc">
              <Nav.Link
                className="text"
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(workPart.description),
                }}
              ></Nav.Link>
            </ul>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const Work = () => {
  const [work, setWork] = useState({});
  const [WorkPartList, setWorkPartList] = useState({});

  const { id } = useParams();
  console.log(id);

  const getWork = async () => {
    const res = await getData(`works/${id}`);
    if (res.success) setWork(res.data);
    console.log({ res });
  };

  const getWorkPart = async () => {
    const res = await getData(`workparts?workId=${id}`);
    if (res.success) setWorkPartList(res.data);
    console.log({ res });
  };

  useEffect(() => {
    getWork();
    getWorkPart();
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
                <h3 className="title">
                  {work.title} {work.id}
                </h3>
                <ul>
                  {/* Автор:{" "} */}
                  <Nav.Link
                    as={Link}
                    className="text"
                    to={"/users/" + work.authorId}
                  >
                    Автор: {work.authorId}
                  </Nav.Link>
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
                  <Nav.Link
                    className="text"
                    dangerouslySetInnerHTML={{
                      __html: decodeHtml(work.description),
                    }}
                  ></Nav.Link>
                </ul>
              </Col>
            </Row>

            <div className="part">
              {/* <ul>
          {WorkPartList ? (
            WorkPartList.map((workPart) => (
              <WorkParts key={workPart.id} workPart={workPart} />
            ))
          ) : (
            <p>На данный момент здесь пусто</p>
          )}
        </ul> */}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Work;

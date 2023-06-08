import { Card, Carousel, Col, Row, Button, Nav } from "react-bootstrap";

import useToken from "../hooks/useToken";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getData } from "../utils/network";

import search from "../assets/images/search2.png";
import cover from "../assets/images/cover2.png";
import "../style/index.scss";

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

const Works = ({ work }) => {
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
          <Col
            // xxs={6}
            xs={12}
            sm={12}
            md={12}
            lg={3}
            xl={3}
            xxl={3}
            onClick={() => {
              navigate("/works/" + work.id);
            }}
          >
            <img className="image" src={cover} />
          </Col>
          <Col
            // xxs={6}
            xs={12}
            sm={12}
            md={12}
            lg={8}
            xl={8}
            xxl={8}
          >
            <Nav.Link as={Link} to={"/works/" + work.id}>
              <h5 className="title">{work.title}</h5>
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

const Popular = ({ fandom }) => {
  return (
    <Nav.Link className="link" href="/">
      {fandom.name}
    </Nav.Link>
  );
};

const Home = () => {
  const [workList, setWorkList] = useState([]);
  const [FandomsList, setFandomsList] = useState([]);
  const [user, setUser] = useState({});
  const { loggedIn } = useToken();

  const getUser = async () => {
    const res = await getData("users/me");
    if (!res.success) alert(res.message);
    else setUser(res.data);
    console.log({ res });
  };

  async function getWorkList() {
    const res = await getData("works?skip=0&take=3&orderBy=desc");
    if (!res.success) return alert(res.message);
    console.log({ res });
    return setWorkList(res.data);
  }

  async function getFandomsList() {
    const res = await getData("fandoms?skip=0&take=10&orderBy=desc");
    if (!res.success) return alert(res.message);
    console.log({ res });
    return setFandomsList(res.data);
  }

  useEffect(() => {
    getWorkList();
    getFandomsList();
    if (loggedIn) getUser();
  }, []);

  return (
    <div className="main">
      <div className="backgraund">
        <div className="news">
          <h1 className="header"> Новинки на Fictions</h1>

          <Carousel className="carousel">
            {workList.length > 0 ? (
              workList.map((work) => (
                <Carousel.Item>
                  <Works key={work.id} work={work} />
                </Carousel.Item>
              ))
            ) : (
              <p>Работ нет</p>
            )}
          </Carousel>
        </div>

        <div className="sear">
          <div className="search">
            <input type="search" placeholder="Найти" />
            <button type="submit">
              <img src={search} />
            </button>
          </div>
        </div>
        {loggedIn ? null : (
          <div className="call">
            <Card className="card">
              <Card.Body>
                <Card.Title className="title">Приглашение</Card.Title>
                <span />
                <Card.Text className="text">
                  <p className="mt-3">Зарегистрировавшишь, вы сможете:</p>
                  <p>— оставлять комментарии к работам;</p>
                  <p>— сохранять работы, которые вам понравились;</p>
                  <p>— публиковать свои собственные творения!</p>
                </Card.Text>
              </Card.Body>
              <Button href="/signin" className="button">
                <a className="text">Присоединиться</a>
              </Button>
            </Card>
          </div>
        )}

        <div className="fandom">
          <Card className="card">
            <Card.Body>
              <Card.Title className="title">Новые фандомы</Card.Title>
              <span />
              <Card.Text className="text">
                {FandomsList ? (
                  FandomsList.map((fandom) => (
                    <Popular key={fandom.id} fandom={fandom} />
                  ))
                ) : (
                  <p>На данный момент здесь пусто</p>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;

// {FandomsList ? (
//   FandomsList.map((fandom) => (
//     <Popular key={fandom.id} fandom={fandom} />
//   ))
// ) : (
//   <p>На данный момент здесь пусто</p>
// )}

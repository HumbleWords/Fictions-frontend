import { Card, Carousel, Col, Row, Button, Nav } from "react-bootstrap";

import useToken from "../hooks/useToken";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getData } from "../utils/network";

import search from "../assets/images/search2.png";
import cover from "../assets/images/cover2.png";
import "../style/index.scss";

const Works = ({ work }) => {
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
          <Col
            // xxs={6}
            xs={12}
            sm={4}
            md={3}
            lg={3}
            xl={3}
            xxl={4}
            onClick={() => {
              navigate("/works/" + work.id);
            }}
          >
            <img className="image" src={cover} />
          </Col>
          <Col
            className="container"
            // xxs={6}
            xs={12}
            sm={7}
            md={7}
            lg={8}
            xl={9}
            xxl={8}
          >
            <Nav.Link as={Link} to={"/works/" + work.id}>
              <h5 className="title">{work.title}</h5>
            </Nav.Link>

            <ul className="desc">
              <Nav.Link
                className="text"
                as={Link}
                to={"/users/" + work.authorId}
              >
                Автор: {work.authorId}
              </Nav.Link>
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

const Popular = ({ fandom }) => {
  return (
    <Nav.Link className="link" href="/">
      {fandom.name}
    </Nav.Link>
  );
};

const Home = () => {
  const [WorksList1, setWorksList1] = useState([]);
  const [WorksList2, setWorksList2] = useState([]);
  const [WorksList3, setWorksList3] = useState([]);
  const [FandomsList, setFandomsList] = useState([]);
  const [user, setUser] = useState({});
  const { loggedIn } = useToken();

  const getUser = async () => {
    const res = await getData("users/me");
    if (!res.success) alert(res.message);
    else setUser(res.data);
    console.log({ res });
  };

  async function getWorksList1() {
    const res = await getData("works?skip=0&take=1&orderBy=desc");
    if (!res.success) return alert(res.message);
    console.log({ res });
    return setWorksList1(res.data);
  }

  async function getWorksList2() {
    const res = await getData("works?skip=1&take=1&orderBy=desc");
    if (!res.success) return alert(res.message);
    console.log({ res });
    return setWorksList2(res.data);
  }

  async function getWorksList3() {
    const res = await getData("works?skip=2&take=1&orderBy=desc");
    if (!res.success) return alert(res.message);
    console.log({ res });
    return setWorksList3(res.data);
  }

  async function getFandomsList() {
    const res = await getData("fandoms?skip=0&take=10&orderBy=desc");
    if (!res.success) return alert(res.message);
    console.log({ res });
    return setFandomsList(res.data);
  }

  useEffect(() => {
    getWorksList1();
    getWorksList2();
    getWorksList3();
    getFandomsList();
    if (loggedIn) getUser();
  }, []);

  return (
    <div className="main">
      <div className="backgraund">
        <div className="news">
          <h1 className="header"> Новинки на Fictions</h1>

          <Carousel className="carousel">
            <Carousel.Item>
              {WorksList1 ? (
                WorksList1.map((work) => <Works key={work.id} work={work} />)
              ) : (
                <p>Работ нет</p>
              )}
            </Carousel.Item>
            <Carousel.Item>
              {WorksList2 ? (
                WorksList2.map((work) => <Works key={work.id} work={work} />)
              ) : (
                <p>Работ нет</p>
              )}
            </Carousel.Item>
            <Carousel.Item>
              {WorksList3 ? (
                WorksList3.map((work) => <Works key={work.id} work={work} />)
              ) : (
                <p>Работ нет</p>
              )}
            </Carousel.Item>
          </Carousel>
        </div>

        <div className="search">
          <input type="search" placeholder="Найти" />
          <button type="submit">
            <img src={search} />
          </button>
        </div>

        {loggedIn ? null : (
          <div className="call">
            <Card className="card">
              <Card.Body>
                <Card.Title className="title">Приглашение</Card.Title>
                <span />
                <Card.Text className="text">
                  <a>Добро пожаловать</a>
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

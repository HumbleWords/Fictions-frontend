import { Card, Carousel, Col, Form, Row, Button, Nav } from "react-bootstrap";

import useToken from "../hooks/useToken";
import { useEffect, useState } from "react";
import { getData } from "../utils/network";

import search from "../assets/images/search2.png";
import work from "../assets/images/work.png";
import "../style/index.scss";

const Popular = ({ fandom }) => {
  return (
    <Nav.Link className="link" href="/">
      {fandom.name}
    </Nav.Link>
  );
};

const Home = () => {
  const [FandomsList, setFandomsList] = useState([]);
  const [user, setUser] = useState({});
  const { loggedIn } = useToken();

  const getUser = async () => {
    const res = await getData("users/me");
    if (!res.success) alert(res.message);
    else setUser(res.data);
    console.log({ res });
  };

  async function getFandomsList() {
    const res = await getData("fandoms?skip=0&take=10&orderBy=desc");
    if (!res.success) return alert(res.message);
    console.log({ res });
    return setFandomsList(res.data);
  }

  useEffect(() => {
    getFandomsList();
    if (loggedIn) getUser();
  }, []);

  return (
    <div className="main">
      <div className="backgraund">
        <div className="news">
          <h1 className="header"> Популярно на Fictions</h1>
          <Carousel className="carousel">
            <Carousel.Item>
              <Card className="card">
                <Row>
                  <Col xs={4}>
                    <img className="image" src={work} />
                  </Col>
                  <Col xs={8}>
                    <Card.Body>
                      <Card.Title className="title">Title</Card.Title>
                      <Card.Text className="text">
                        asfsfdsfzxcZXcZXCXZc
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Carousel.Item>

            <Carousel.Item>
              <Card className="card">
                <Row>
                  <Col xs={4}>
                    <img className="image" src={work} />
                  </Col>
                  <Col xs={8}>
                    <Card.Body className="box">
                      <Card.Title className="title">Title</Card.Title>
                      <Card.Text className="text">
                        teersdffsdxt
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Carousel.Item>
          </Carousel>
        </div>

        <div className="search">
          <input type="search" placeholder="Найти" />
          <button type="submit">
            <img src={search} />
          </button>
        </div>

        <div className="call">
          <Card className="card">
            <Card.Body>
              <Card.Title className="title">Приглашение</Card.Title>
              <span />
              <Card.Text className="text">
                teersdfe dd asdfsdFsadfSAasdf sadasdf rasdfer sdffsdxt
              </Card.Text>
            </Card.Body>

            {loggedIn ? null : (
              <Button href="/signin" className="button">
                <a className="text">Присоединиться</a>
              </Button>
            )}
          </Card>
        </div>

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
import { Card, Carousel, Button, Nav } from "react-bootstrap";

import useToken from "../hooks/useToken";
import { useEffect, useState } from "react";
import { getData } from "../utils/network";

import searchIcon from "../assets/images/search2.png";
import "../style/index.scss";
import WorkCard from "../components/WorkCard";
import { useNavigate } from "react-router";

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
  const { loggedIn } = useToken();
  const [search, setSearch] = useState("");

  const navigate = useNavigate()

  async function getWorkList() {
    const res = await getData(
      "works?skip=0&take=3&orderParam=updatedAt&orderBy=desc"
    );
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
  }, []);

  return (
    <div className="main">
      <div className="background">
        <div className="news">
          <h1 className="header"> Новинки на Fictions</h1>

          <Carousel className="carousel">
            {workList.length > 0 ? (
              workList.map((work) => (
                <Carousel.Item>
                  <WorkCard work={work} />
                </Carousel.Item>
              ))
            ) : (
              <p>Работ нет</p>
            )}
          </Carousel>
        </div>

        <div className="sear">
          <div className="search">
            <input
              type="search"
              placeholder="Найти"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" onClick={(e) => {
              e.preventDefault()
              navigate(`/works?search=${search}`)
            }}>
              <img src={searchIcon} />
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

import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getData } from "../utils/network";

import "../style/profile.scss";
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
          <Col
            className="container"
            // xxs={6}
            xs={12}
            sm={6}
            md={7}
            lg={8}
            xl={8}
          >
            <Nav.Link as={Link} className="title" to={"/works/" + work.id}>
              <h5>{work.title}</h5>
            </Nav.Link>
            <ul className="desc">
              <Nav.Link
                className="text"
                as={Link}
                to={"/users/" + work.authorId}
              >
                Автор: {work.author.username}
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

const Authors = () => {
  const [user, setUser] = useState({});
  const [WorksList, setWorksList] = useState();
  const { id } = useParams();

  const getUser = async () => {
    const res = await getData(`users/${id}`);
    if (!res.success) alert(res.message);
    else setUser(res.data);
  };

  async function getWorksList() {
    const res = await getData(
      `works?skip=0&take=20&author=${id}&orderParam=updatedAt&orderBy=asc`
    );
    if (!res.success) return alert(res.message);
    // console.log({ res });
    return setWorksList(res.data);
  }

  useEffect(() => {
    getUser();
    getWorksList();
  }, []);

  return (
    <div className="profile-page">
      <div className="title">
        <h1>{user.username}</h1>
      </div>

      <div className="works">
        <ul>
          {WorksList && WorksList.length > 0 ? (
            WorksList.map((work) => <Work key={work.id} work={work} />)
          ) : (
            <p>Работ нет</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Authors;

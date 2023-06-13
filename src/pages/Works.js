import { Card, Col, Form, Row, Button } from "react-bootstrap";

import { useEffect, useState } from "react";
import { getData } from "../utils/network";

// import "../style/works.scss";
import WorkCard from "../components/WorkCard";
import { useSearchParams } from "react-router-dom";
import useToken from "../hooks/useToken";

const Works = ({}) => {
  const [WorksList, setWorksList] = useState([]);
  const [orderParam, setOrderParam] = useState("updatedAt");
  const [orderBy, setOrderBy] = useState("desc");

  const { id, loggedIn } = useToken();

  const [searchParams, setSearchParams] = useSearchParams();

  async function getWorksList() {
    const res = await getData(
      `works?skip=0&take=20&orderBy=${orderBy}&orderParam=${orderParam}&search=${searchParams.get(
        "search"
      )}`
    );
    if (!res.success) return alert(res.message);
    // console.log({ res });
    return setWorksList(res.data);
  }

  useEffect(() => {
    getWorksList();
  }, []);

  return (
    <div className="work-page">
      <Row>
        <Col xs={{ order: "last", span: 12 }} lg={4}>
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

        <Col xs={12} lg={8}>
          <div className="list">
            {WorksList ? (
              WorksList.map((work, index) => (
                <WorkCard
                  key={index}
                  work={work}
                  mywork={loggedIn ? work.authorId === id : false}
                />
              ))
            ) : (
              <p>Работ нет</p>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Works;

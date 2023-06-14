import { Card, Form, Button } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";

import "../style/search.scss";
import { useState } from "react";
import { useNavigate } from "react-router";

const Search = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [fandoms, setFandoms] = useState("");
  const [orderParam, setOrderParam] = useState("updatedAt");
  const [orderBy, setOrderBy] = useState("desc");

  const navigate = useNavigate();

  const search = (e) => {
    e.preventDefault();
    navigate(
      `/works?orderBy=${orderBy}&orderParam=${orderParam}&title=${title}&author=${author}&tags=${tags}&fandoms=${fandoms}`
    );
  };

  return (
    <div className="search-page">
      <h1>Поиск</h1>
      <span />
      <Form className="form">
        <div className="info">
          <Card className="card">
            <Card.Title className="title">Информация о работе</Card.Title>
            <span />
            <Form.Group className="input" controlId="formBasicEmail">
              <Form.Label>Название</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="input" controlId="formBasicEmail">
              <Form.Label>Автор</Form.Label>
              <Form.Control
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group className="input" controlId="formBasicEmail">
              <Form.Label>Язык</Form.Label>
              <Form.Control type="text" />
            </Form.Group> */}
          </Card>
        </div>
        <div className="tegs">
          <Card className="card">
            <Card.Title className="title">Теги</Card.Title>
            <span />
            <Form.Group className="input" controlId="formBasicEmail">
              <Form.Label>Фандомы</Form.Label>
              <Form.Control
                type="text"
                value={fandoms}
                onChange={(e) => setFandoms(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="input" controlId="formBasicEmail">
              <Form.Label>Теги</Form.Label>
              <Form.Control
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group className="input" controlId="formBasicEmail">
              <Form.Label>Рейтинг</Form.Label>
              <Form.Control type="text" />
            </Form.Group> */}
          </Card>
        </div>
        <div className="sort">
          <Card className="card">
            <Card.Title className="title">Сортировка</Card.Title>
            <span />
            <Form.Group className="input" controlId="formBasicEmail">
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
            <Form.Group className="input" controlId="formBasicEmail">
              <Form.Label>Направление сортировки</Form.Label>
              <Form.Select
                defaultValue={orderBy}
                onChange={(event) => setOrderBy(event.target.value)}
              >
                <option value={"desc"}>По убыванию</option>
                <option value={"asc"}>По возрастанию</option>
              </Form.Select>
            </Form.Group>
          </Card>
        </div>
        <Button className="button" type="submit" onClick={search}>
          Поиск
        </Button>
      </Form>
    </div>
  );
};

export default Search;

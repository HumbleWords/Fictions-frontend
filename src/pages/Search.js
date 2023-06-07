import { Card, Form, Button } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";

import "../style/search.scss";

const Search = () => {
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
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="input" controlId="formBasicEmail">
              <Form.Label>Автор</Form.Label>
              <Form.Control type="text"/>
            </Form.Group>
            <Form.Group className="input" controlId="formBasicEmail">
              <Form.Label>Язык</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Card>
        </div>
        <div className="tegs">
          <Card className="card">
            <Card.Title className="title">Теги</Card.Title>
            <span />
            <Form.Group className="input" controlId="formBasicEmail">
              <Form.Label>Фандомы</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="input" controlId="formBasicEmail">
              <Form.Label>Теги</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="input" controlId="formBasicEmail">
              <Form.Label>Рейтинг</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Card>
        </div>
        <div className="sort">
          <Card className="card">
            <Card.Title className="title">Сортировка</Card.Title>
            <span />
            <Form.Group className="input" controlId="formBasicEmail">
              <Form.Label>Сортировать по</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="input" controlId="formBasicEmail">
              <Form.Label>Направление сортировки</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Card>
        </div>
        <Button className="button" type="submit">Поиск</Button>
      </Form>
    </div>
  );
};

export default Search;

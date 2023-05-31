import { Card, Form, Button } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";

import "../style/search.scss";

const Search = () => {
  return (
    <div className="page">
      <Form>
        <div className="info">
          <Card>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
          </Card>
        </div>
        <div className="tegs">
          <Card>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
          </Card>
        </div>
        <div className="sort">
          <Card>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
          </Card>
        </div>
        <Button type="submit">Поиск</Button>
      </Form>
    </div>
  );
};

export default Search;

import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import useAdminGuard from "../../hooks/useAdminGuard";
import { postRequest } from "../../utilities/requests";

const AddTag = () => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  useAdminGuard({ role: user.role });

  const [name, setName] = useState("");
  const [category, setCategory] = useState("other");
  const [help, setHelp] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  const createTag = async (e) => {
    e.preventDefault();
    console.log(name + "; " + category);
    const response = await postRequest("tags", { name });
    if (!response.success) {
      return alert(response.message);
    }
    setName("");
    setHelp(`Tag "${name}" created`);
    setShowHelp(true);
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col sm={12} md={6}>
          <Form className="d-flex flex-column gap-4">
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  required
                  name="tagname"
                  placeholder="Tag name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Category:
              </Form.Label>
              <Col sm={10}>
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="character">Character</option>
                  <option value="relationship">Relationship</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button
                className="w-75"
                name="createTag"
                type="submit"
                onClick={createTag}
              >
                Create tag
              </Button>
            </Col>
            <Col sm={12} className="text-center">
              <Form.Text
                muted
                style={{ display: showHelp ? "initial" : "none" }}
              >
                {help}
              </Form.Text>
            </Col>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddTag;

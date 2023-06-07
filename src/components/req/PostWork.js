import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  CloseButton,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../../utilities/requests";

const PostWork = () => {
  document.title = "Post new work — Fanfiction-Project";
  const navigate = useNavigate();

  //TITLE ----------------------------------------------------------------------------------------------
  const [title, setTitle] = useState("");

  //RATING ---------------------------------------------------------------------------------------------
  const [rating, setRating] = useState(null);

  //CATEGORY -------------------------------------------------------------------------------------------
  const [category, setCategory] = useState(null);

  //LANGUAGE -------------------------------------------------------------------------------------------
  const [language, setLanguage] = useState("ru");

  const [description, setDescription] = useState("");

  const [note, setNote] = useState("");

  //TAGS -----------------------------------------------------------------------------------------------
  const [currentCharacters, setCurrentCharacters] = useState([]);
  const [character, setCharacter] = useState("");
  const [foundCharacters, setFoundCharacters] = useState([]);

  const [currentRelationships, setCurrentRelationships] = useState([]);
  const [relationship, setRelationship] = useState("");
  const [foundRelationships, setFoundRelationships] = useState([]);

  const [currentTags, setCurrentTags] = useState([]);
  const [tag, setTag] = useState("");
  const [foundTags, setFoundTags] = useState([]);

  const searchCharacters = async (e) => {
    setCharacter(e.target.value);
    const response = await postRequest("tags/search", {
      name: character,
      category: "character",
    });
    if (!response.success) {
      return alert(response.message);
    }
    setFoundCharacters(response.tags);
  };

  const addCharacter = (e) => {
    e.preventDefault();
    let characters = [];
    foundCharacters.forEach((f) => {
      if (character === f.name) {
        characters = currentCharacters.concat(f);
      }
    });
    setCurrentCharacters(characters);
  };

  const deleteCharacter = (e) => {
    e.preventDefault();
    const index = e.target.value;
    const characters = currentCharacters
      .slice(0, index)
      .concat(currentCharacters.slice(index + 1));
    setCurrentCharacters(characters);
  };

  const searchRelationships = async (e) => {
    setRelationship(e.target.value);
    const response = await postRequest("tags/search", {
      name: relationship,
      category: "relationship",
    });
    if (!response.success) {
      return alert(response.message);
    }
    setFoundRelationships(response.tags);
  };

  const addRelationship = (e) => {
    e.preventDefault();
    let relationships = [];
    foundRelationships.forEach((f) => {
      if (relationship === f.name) {
        relationships = currentRelationships.concat(f);
      }
    });
    setCurrentRelationships(relationships);
  };

  const deleteRelationship = (e) => {
    e.preventDefault();
    const index = e.target.value;
    const relationships = currentRelationships
      .slice(0, index)
      .concat(currentRelationships.slice(index + 1));
    setCurrentRelationships(relationships);
  };

  const searchTags = async (e) => {
    setTag(e.target.value);
    const response = await postRequest("tags/search", {
      name: tag,
      category: "other",
    });
    if (!response.success) {
      return alert(response.message);
    }
    setFoundTags(response.tags);
  };

  const addTag = (e) => {
    e.preventDefault();
    let tags = [];
    foundTags.forEach((f) => {
      if (tag === f.name) {
        tags = currentTags.concat(f);
      }
    });
    setCurrentTags(tags);
  };

  const deleteTag = (e) => {
    e.preventDefault();
    const index = e.target.value;
    const tags = currentTags
      .slice(0, index)
      .concat(currentTags.slice(index + 1));
    setCurrentTags(tags);
  };

  //FANDOMS --------------------------------------------------------------------------------------------
  const [currentFandoms, setCurrentFandoms] = useState([]);
  const [fandom, setFandom] = useState("");
  const [foundFandoms, setFoundFandoms] = useState([]);

  const searchFandoms = async (e) => {
    setFandom(e.target.value);
    const response = await postRequest("fandoms/search", { name: fandom });
    if (!response.success) {
      return alert(response.message);
    }
    setFoundFandoms(response.fandoms);
  };

  const addFandom = (e) => {
    e.preventDefault();
    let fandoms = [];
    foundFandoms.forEach((f) => {
      if (fandom === f.name) {
        fandoms = currentFandoms.concat(f);
      }
    });
    setCurrentFandoms(fandoms);
  };

  const deleteFandom = (e) => {
    e.preventDefault();
    const index = e.target.value;
    const fandoms = currentFandoms
      .slice(0, index)
      .concat(currentFandoms.slice(index + 1));
    setCurrentFandoms(fandoms);
  };

  //WARNINGS -------------------------------------------------------------------------------------------
  const [currentWarnings, setCurrentWarnings] = useState([]);
  const [warning, setWarning] = useState("");
  const [foundWarnings, setFoundWarnings] = useState([]);

  const searchWarnings = async (e) => {
    setWarning(e.target.value);
    const response = await postRequest("warnings/search", { name: warning });
    if (!response.success) {
      return alert(response.message);
    }
    setFoundWarnings(response.warnings);
  };

  const addWarning = (e) => {
    e.preventDefault();
    let warnings = [];
    foundWarnings.forEach((w) => {
      if (warning === w.name) {
        warnings = currentWarnings.concat(w);
      }
    });
    setCurrentWarnings(warnings);
  };

  const deleteWarning = (e) => {
    e.preventDefault();
    const index = e.target.value;
    const warnings = currentWarnings
      .slice(0, index)
      .concat(currentWarnings.slice(index + 1));
    setCurrentWarnings(warnings);
  };

  const postWork = async (e) => {
    e.preventDefault();
    const response = await postRequest("works", {
      title,
      rating,
      category,
      language,
      description,
      finished: false,
      note,
      tags: currentCharacters
        .map((c, i) => c.id)
        .concat(
          currentRelationships
            .map((r, i) => r.id)
            .concat(currentTags.map((t, i) => t.id))
        ),
      fandoms: currentFandoms.map((f, i) => f.id),
      warnings: currentWarnings.map((w, i) => w.id),
    });
    if (!response.success) {
      return alert(response.message);
    }
    navigate(`../${response.workId}/part`);
  };

  return (
    <Container id="PostWork" className="py-3">
      <Row className="justify-content-center align-items-stretch">
        <Col sm={12} md={6}>
          <Form className="d-flex flex-column gap-3">
            <Form.Group>
              <Form.Label>Title:</Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Rating:</Form.Label>
              <Form.Select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="">Not Rated</option>
                <option value="general">General Audience</option>
                <option value="teenage">Teenage Audience</option>
                <option value="mature">Mature Audience</option>
                <option value="explicit">Explicit Content</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Category:</Form.Label>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Not Categorized</option>
                <option value="gen">Gen Fiction</option>
                <option value="f/m">Female/Male</option>
                <option value="m/m">Male/Male</option>
                <option value="f/f">Female/Female</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Language:</Form.Label>
              <Form.Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="arabic">Arabic</option>
                <option value="chinese">Chinese</option>
                <option value="english">English</option>
                <option value="french">French</option>
                <option value="gallifreyean">Gallifreyan</option>
                <option value="german">German</option>
                <option value="italian">Italian</option>
                <option value="japanese">Japanese</option>
                <option value="klingon">Klingon</option>
                <option value="korean">Korean</option>
                <option value="portuguese">Portuguese</option>
                <option value="polish">Polish</option>
                <option value="russian">Russian</option>
                <option value="sindarin">Sindarin</option>
                <option value="spanish">Spanish</option>
                <option value="turkish">Turkish</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Note:</Form.Label>
              <Form.Control
                as="textarea"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Characters:</Form.Label>
              {currentCharacters.map((character, i) => (
                <Badge bg="light" text="dark" key={i}>
                  {character.name}
                  <CloseButton value={i} onClick={deleteCharacter} />
                </Badge>
              ))}
              <Form.Group>
                <Form.Control
                  list="charactersList"
                  onChange={searchCharacters}
                  id="characterInput"
                  autoComplete="off"
                ></Form.Control>
                <datalist id="charactersList">
                  {foundCharacters.map((character, i) => (
                    <option value={character.name} key={i} />
                  ))}
                </datalist>
                <Button onClick={addCharacter} variant="secondary">
                  Add character
                </Button>
              </Form.Group>
            </Form.Group>
            <Form.Group>
              <Form.Label>Relationships:</Form.Label>
              {currentRelationships.map((relationship, i) => (
                <Badge bg="light" text="dark" key={i}>
                  {relationship.name}
                  <CloseButton value={i} onClick={deleteRelationship} />
                </Badge>
              ))}
              <Form.Group>
                <Form.Control
                  list="relationshipsList"
                  onChange={searchRelationships}
                  id="relationshipInput"
                  autoComplete="off"
                ></Form.Control>
                <datalist id="relationshipsList">
                  {foundRelationships.map((relationship, i) => (
                    <option value={relationship.name} key={i} />
                  ))}
                </datalist>
                <Button onClick={addRelationship} variant="secondary">
                  Add relationship
                </Button>
              </Form.Group>
            </Form.Group>
            <Form.Group>
              <Form.Label>Other tags:</Form.Label>
              {currentTags.map((tag, i) => (
                <Badge bg="light" text="dark" key={i}>
                  {tag.name}
                  <CloseButton value={i} onClick={deleteTag} />
                </Badge>
              ))}
              <Form.Group>
                <Form.Control
                  list="tagsList"
                  onChange={searchTags}
                  id="tagInput"
                  autoComplete="off"
                ></Form.Control>
                <datalist id="tagsList">
                  {foundTags.map((tag, i) => (
                    <option value={tag.name} key={i} />
                  ))}
                </datalist>
                <Button onClick={addTag} variant="secondary">
                  Add tag
                </Button>
              </Form.Group>
            </Form.Group>
            <Form.Group>
              <Form.Label>Fandoms:</Form.Label>
              {currentFandoms.map((fandom, i) => (
                <Badge bg="light" text="dark" key={i}>
                  {fandom.name}
                  <CloseButton value={i} onClick={deleteFandom} />
                </Badge>
              ))}
              <Form.Group>
                <Form.Control
                  list="fandomsList"
                  onChange={searchFandoms}
                  id="fandomInput"
                  autoComplete="off"
                ></Form.Control>
                <datalist id="fandomsList">
                  {foundFandoms.map((fandom, i) => (
                    <option value={fandom.name} key={i} />
                  ))}
                </datalist>
                <Button onClick={addFandom} variant="secondary">
                  Add fandom
                </Button>
              </Form.Group>
            </Form.Group>
            <Form.Group>
              <Form.Label>Warnings:</Form.Label>
              {currentWarnings.map((warning, i) => (
                <Badge bg="light" text="dark" key={i}>
                  {warning.name}
                  <CloseButton value={i} onClick={deleteWarning} />
                </Badge>
              ))}
              <Form.Group>
                <Form.Control
                  list="warningsList"
                  onChange={searchWarnings}
                  id="warningInput"
                  autoComplete="off"
                ></Form.Control>
                <datalist id="warningsList">
                  {foundWarnings.map((warning, i) => (
                    <option value={warning.name} key={i} />
                  ))}
                </datalist>
                <Button onClick={addWarning} variant="secondary">
                  Add warning
                </Button>
              </Form.Group>
            </Form.Group>
            <Button onClick={postWork}>Post New Work</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PostWork;

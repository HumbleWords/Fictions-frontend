import { useEffect, useState } from "react";
import { Badge, Button, Card, CloseButton, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getData, postData } from "../utils/network";
import ReactQuill from "react-quill";
import "../style/postwork.scss";
import "react-quill/dist/quill.snow.css";

const PostWork = () => {
  document.title = "Post new work — Fanfiction-Project";
  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const [rating, setRating] = useState(null);

  const [category, setCategory] = useState(null);

  const [language, setLanguage] = useState("ru");

  const [description, setDescription] = useState("");

  const [note, setNote] = useState("");

  const [status, setStatus] = useState("DRAFT");

  //TAGS -----------------------------------------------------------------------------------------------
  const [currentTags, setCurrentTags] = useState([]);
  const [tag, setTag] = useState("");
  const [foundTags, setFoundTags] = useState([]);

  const searchTags = async (e) => {
    setTag(e.target.value);
    const response = await getData(
      `tags?skip=0&take=20&orderBy=asc&where=${tag}`
    );
    if (!response.success) {
      return alert(response.message);
    }
    setFoundTags(response.data);
  };

  const addTag = (e) => {
    e.preventDefault();
    let tags = [];
    foundTags.forEach((f) => {
      if (tag === f.name) {
        tags = currentTags.concat(f);
      }
    });
    setTag("");
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
    const response = await getData(
      `fandoms?skip=0&take=20&orderBy=asc&where=${fandom}`
    );
    if (!response.success) {
      return alert(response.message);
    }
    setFoundFandoms(response.data);
  };

  const addFandom = (e) => {
    e.preventDefault();
    let fandoms = [];
    foundFandoms.forEach((f) => {
      if (fandom === f.name) {
        fandoms = currentFandoms.concat(f);
      }
    });
    setFandom("");
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

  const [text, setText] = useState("");

  const postWork = async (e) => {
    e.preventDefault();
    const response = await postData("works", {
      title,
      rating,
      category,
      lang: language,
      description,
      status,
      note,
      tags: currentTags.map((tag) => ({ id: tag.id })),
      fandoms: currentFandoms.map((fandom) => ({ id: fandom.id })),
    });
    if (!response.success) {
      return alert(response.message);
    }
    const partResponse = await postData("workparts", {
      title: null,
      description: null,
      note: null,
      text,
      order: 0,
      status,
      workId: response.data.id,
    });
    if (!partResponse.success) {
      return alert(partResponse.message);
    }
    navigate(`../${response.data.id}`);
  };

  return (
    <div id="PostWork">
      <h2>Создание работы</h2>
      <span className="divider" />
      <div className="justify-content-center align-items-stretch">
        <div sm={12} md={6}>
          <Card className="data">
            <Form className="d-flex flex-column gap-3">
              <Form.Group>
                <Form.Label>Название:</Form.Label>
                <Form.Control
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Рейтинг:</Form.Label>
                <Form.Select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value={"G"}>Нет возрастных ограничений</option>
                  <option value={"PG"}>Не рекомендуется детям</option>
                  <option value={"PG_13"}>От 13 лет</option>
                  <option value={"R"}>От 16 лет</option>
                  <option value={"NC_17"}>От 17 лет</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Категория:</Form.Label>
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value={"GEN"}>Нет любовных линий</option>
                  <option value={"F_M"}>Гет</option>
                  <option value={"M_M"}>ММ</option>
                  <option value={"F_F"}>ЖЖ</option>
                  <option value={"OTHER"}>Другое</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Язык работы:</Form.Label>
                <Form.Select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value={"ru"}>Русский</option>
                  <option value={"nl"}>Нидерландский</option>
                  <option value={"en"}>Английский</option>
                  <option value={"fr"}>Французский</option>
                  <option value={"de"}>Немецкий</option>
                  <option value={"it"}>Итальянский</option>
                  <option value={"ja"}>Японский</option>
                  <option value={"no"}>Норвежский</option>
                  <option value={"pl"}>Польша</option>
                  <option value={"pt"}>Португальский</option>
                  <option value={"es"}>Испанский</option>
                  <option value={"sv"}>Шведский</option>
                  <option value={"vi"}>Вьетнамский</option>
                  <option value={"zh_ch"}>Китайский</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Описание работы:</Form.Label>
                <ReactQuill
                  value={description}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      ["link", "image"],
                      ["clean"],
                    ],
                  }}
                  formats={[
                    "header",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                  ]}
                  onChange={(value) => setDescription(value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Примечания автора:</Form.Label>
                <ReactQuill
                  value={note}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      ["link", "image"],
                      ["clean"],
                    ],
                  }}
                  formats={[
                    "header",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                  ]}
                  onChange={(value) => setNote(value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Фандомы:</Form.Label>
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
                    value={fandom}
                  ></Form.Control>
                  <datalist id="fandomsList">
                    {foundFandoms.map((fandom, i) => (
                      <option value={fandom.name} key={i} />
                    ))}
                  </datalist>
                  <Button
                    onClick={addFandom}
                    className="mt-2 secondary-button"
                    size="sm"
                    variant="secondary"
                  >
                    Добавить фандом
                  </Button>
                </Form.Group>
              </Form.Group>
              <Form.Group>
                <Form.Label>Теги:</Form.Label>
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
                    value={tag}
                  ></Form.Control>
                  <datalist id="tagsList">
                    {foundTags.map((tag, i) => (
                      <option value={tag.name} key={i} />
                    ))}
                  </datalist>
                  <Button
                    onClick={addTag}
                    className="mt-2 secondary-button"
                    size="sm"
                    variant="secondary"
                  >
                    Добавить тег
                  </Button>
                </Form.Group>
              </Form.Group>

              <Form.Group>
                <Form.Label>Текст работы:</Form.Label>
                <ReactQuill
                  value={text}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      ["link", "image"],
                      ["clean"],
                    ],
                  }}
                  formats={[
                    "header",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                  ]}
                  onChange={(value) => setText(value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Статус работы:</Form.Label>
                <Form.Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value={"DRAFT"}>Черновик</option>
                  <option value={"PUBLISHED"}>Опубликована</option>
                </Form.Select>
              </Form.Group>
              <Button className="submit-button" onClick={postWork}>
                Post New Work
              </Button>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostWork;

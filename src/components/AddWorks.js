import { useState } from "react";
import { Button, Form, Modal, Row } from "react-bootstrap";
import { postData } from "../utils/network";

export default function AddWorks(props) {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [note, setNote] = useState();
  const [status, setStatus] = useState();
  const [lang, setLang] = useState();
  const [rating, setRating] = useState();
  const [category, setCategory] = useState();
  const [tags, setTags] = useState();
  const [fandoms, setFandoms] = useState();

  const createWork = async (event) => {
    event.preventDefault();

    const response = await postData("works", {
      title,
      description,
      note,
      status,
      lang,
      rating,
      category,
      tags,
      fandoms,
    });

    if (!response.success) {
      alert(response.message);
      if (response.code !== "NETWORK_ERROR");
      return;
    }
    setTitle("");
    setDescription("");
    setNote("");
    setStatus("");
    setLang("");
    setRating("");
    setCategory("");
    setTags("");
    setFandoms("");
    props.getWorksList();
    return alert(response.message);
  };
  return (
    <Modal
      {...props}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавление работы
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Form onSubmit={createWork}>
            <Form.Group className="reg-fg">
              <Form.Label>Название</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Введите название курса"
                required
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="reg-fg">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Введите описание"
                required
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="reg-fg">
              <Form.Label>Отметка</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Введите описание"
                required
                id="note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Статус</Form.Label>
              <Form.Select
                className="reg-fg"
                size="lg"
                required
                id="status"
                type="enum"
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value={"DRAFT"}>Черновик</option>
                <option value={"PUBLISHED"}>Открытая</option>
                <option value={"HIDDEN"}>Скрытая</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="reg-fg">
              <Form.Label>Язык</Form.Label>
              <Form.Select
                className="reg-fg"
                size="lg"
                required
                id="lang"
                type="enum"
                // defaultValue={"ru"}
                onChange={(event) => setLang(event.target.value)}
              >
                <option value={"ru"}>Руссский</option>
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

            <Form.Group className="reg-fg">
              <Form.Label>Рейтинг</Form.Label>
              <Form.Select
                className="reg-fg"
                size="lg"
                required
                id="rating"
                type="enum"
                onChange={(event) => setRating(event.target.value)}
              >
                <option value={"G"}>Нет возрастных ограничений</option>
                <option value={"PG"}>Не рекомендуемо детям</option>
                <option value={"PG_13"}>От 13 лет</option>
                <option value={"R"}>От 16 лет</option>
                <option value={"NC_17"}>От 17 лет</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="reg-fg">
              <Form.Label>Категория</Form.Label>
              <Form.Select
                className="reg-fg"
                size="lg"
                required
                id="category"
                type="enum"
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value={"GEN"}>Нет любовных линий</option>
                <option value={"F_M"}>Гет</option>
                <option value={"M_M"}>ММ</option>
                <option value={"F_F"}>ЖЖ</option>
                <option value={"OTHER"}>Другое</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="reg-fg">
              <Form.Label>Тэг</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Введите описание"
                required
                id="tags"
                value={tags}
                onChange={(event) => setTags(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="reg-fg">
              <Form.Label>Фандом</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Введите описание"
                required
                id="fandoms"
                value={fandoms}
                onChange={(event) => setFandoms(event.target.value)}
              />
            </Form.Group>

            <Button className="ms-auto mt-3" type="submit">
              Добавить
            </Button>
          </Form>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Закрыть</Button>

        <Button variant="danger">Сброс</Button>
      </Modal.Footer>
    </Modal>
  );
}

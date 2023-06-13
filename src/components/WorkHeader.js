import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import cover from "../assets/images/cover1.png";
import { CATEGORIES, LANGUAGES, RATINGS } from "../utils/constants";
import "./style/work-card.scss";

const WorkHeader = ({ work, mywork = false }) => {
  return (
    <Card className="work-card">
      <Card.Body>
        <Row>
          <Col xs={12} lg={3} className="image-col">
            <Image src={cover} />
          </Col>
          <Col xs={12} lg={9}>
            <ul className="description-col">
              <li>Категория: {CATEGORIES[work.category]}</li>
              <li>Рейтинг: {RATINGS[work.rating]}</li>
              <li>Язык: {LANGUAGES[work.lang]}</li>
              {work?.fandoms?.length > 0 ? (
                <li>
                  Фандомы:{" "}
                  <ul>
                    {work.fandoms.map((fandom, index) => (
                      <li key={index}>
                        <Link>{fandom.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : null}
              {work?.tags?.length > 0 ? (
                <li>
                  Теги:{" "}
                  <ul>
                    {work.tags.map((tag, index) => (
                      <li key={index}>
                        <Link>{tag.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : null}
            </ul>
          </Col>
        </Row>
        {mywork ? <Row className="mt-3">
          <Col xs={12} lg={3} style={{display: 'flex', justifyContent: "center"}}>
          <Button className="button">Редактировать</Button>
          </Col>
        </Row> : null}
      </Card.Body>
      <Card.Footer>
        <ul className="statistics">
          <li>
            Глав: {work?._count?.parts}
          </li>
          {work?._count?.favoritedBy > 0 ? <li>
            Понравилось: {work._count.favoritedBy}
          </li>: null}
        </ul>
      </Card.Footer>
    </Card>
  );
};

export default WorkHeader;

import { Card, Col, Image, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import cover from "../assets/images/cover1.png";
import { CATEGORIES, LANGUAGES, RATINGS } from "../utils/constants";
import decodeHtml from "../utils/decodeHtml";
import "./style/work-card.scss";

const WorkCard = ({ work, mywork = false }) => {
  return (
    <Card className="work-card">
      <Card.Body>
        <Row>
          <Col xs={12} lg={3} className="image-col">
            <Image src={cover} />
          </Col>
          <Col xs={12} lg={9}>
            <ul className="description-col">
              <li>
                <Link class="title" to={mywork ? "/myworks/" + work.id : "/works/" + work.id}>
                  {work.title} {work.status === "DRAFT" ? "(Черновик)" : null}
                </Link>
              </li>
              <span className="divider" />
              <li>
                Автор:{" "}
                <Link to={"/users/" + work.authorId}>
                  {work.author.username}
                </Link>
              </li>
              <li>Категория: {CATEGORIES[work.category]}</li>
              <li>Рейтинг: {RATINGS[work.rating]}</li>
              <li>Язык: {LANGUAGES[work.lang]}</li>
              {work.fandoms.length > 0 ? (
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
              {work.tags.length > 0 ? (
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
              <span className="divider" />
              <li
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(work.description),
                }}
              ></li>
            </ul>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <ul className="statistics">
          <li>Глав: {work._count.parts}</li>
          {work._count.favoritedBy > 0 ? (
            <li>Понравилось: {work._count.favoritedBy}</li>
          ) : null}
        </ul>
      </Card.Footer>
    </Card>
  );
};

export default WorkCard;

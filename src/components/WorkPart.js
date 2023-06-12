import { Col, Container } from "react-bootstrap";
import decodeHtml from "../utils/decodeHtml";
import "./style/work-part.scss"

const WorkPart = ({ workPart }) => {
  return (
    <Col xs={12} md={{span: 10, offset: 1}} lg={{span: 8, offset: 2}} className="work-part">
      <div className="part-heading">
        <h3>
          Глава {workPart.order}: {workPart.title}
        </h3>
        {workPart.description ? (
          <div>
            <h4>Описание</h4>
            <div
            className="text"
              dangerouslySetInnerHTML={{
                __html: decodeHtml(workPart.description),
              }}
            ></div>
          </div>
        ) : null}
        {workPart.note ? (
          <div>
            <h4>Примечание автора</h4>
            <div
            className="text"
              dangerouslySetInnerHTML={{ __html: decodeHtml(workPart.note) }}
            ></div>
            <span className="divider" />
          </div>
        ) : null}
      </div>
      <div
        className="text"
        dangerouslySetInnerHTML={{ __html: decodeHtml(workPart.text) }}
      ></div>
    </Col>
  );
};

export default WorkPart;

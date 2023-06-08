import { Button } from "react-bootstrap";
import ReactQuill from "react-quill";

const CommentForm = () => {
  return (
    <div className="mb-5">
      <ReactQuill />
      <Button className="button">Отправить</Button>
    </div>
  );
};

export default CommentForm;

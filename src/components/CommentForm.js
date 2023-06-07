import { Button } from "react-bootstrap";
import ReactQuill from "react-quill";

const CommentForm = () => {
  return (
    <div>
      <ReactQuill />
      <Button>Отправить</Button>
    </div>
  );
};

export default CommentForm;

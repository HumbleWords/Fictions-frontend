import { Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import { getData, postData } from "../utils/network";
import { useContext, useState } from "react";
import { CommentContext } from "../pages/Work";

const CommentForm = ({ workPartId, workId }) => {
  const [comment, setComment] = useState("<p></p>");
  const { comments, setComments } = useContext(CommentContext);

  const fetchComments = async () => {
    const res = await getData(`comments/work/${workId}`);
    if (res.success) setComments(res.data);
  };

  async function sendComment() {
    const res = await postData("comments", {
      text: comment,
      workPartId,
    });
    if (!res.success) return alert(res.message);
    setComment("<p></p>");
    fetchComments();
  }

  return (
    <div className="mb-5">
      <ReactQuill
        value={comment}
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
        onChange={(value) => setComment(value)}
      />
      <Button
        className="button"
        onClick={(e) => {
          e.preventDefault();
          sendComment();
        }}
      >
        Отправить
      </Button>
    </div>
  );
};

export default CommentForm;

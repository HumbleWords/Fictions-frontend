import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";

import React, { useEffect, useState } from "react";
import { getData } from "../utils/network";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import "./style/work.scss"
import WorkHeader from "../components/WorkHeader";
import WorkPart from "../components/WorkPart";
import decodeHtml from "../utils/decodeHtml";
import useToken from "../hooks/useToken";
import CommentForm from "../components/CommentForm";

export const CommentContext = React.createContext([])

const MyWork = () => {
  const [work, setWork] = useState({});
  const [comments, setComments] = useState([]);

  const {loggedIn} = useToken()

  const { id } = useParams();
  console.log(id);

  const getWork = async () => {
    const res = await getData(`works/myworks/${id}`);
    if (res.success) setWork(res.data);
  };

  const fetchComments = async () => {
    const res = await getData(`comments/work/${id}`);
    if (res.success) setComments(res.data);
  };

  useEffect(() => {
    getWork();
    fetchComments();
  }, []);

  return (
    <div className="work-page">
      <WorkHeader work={work} />

      <div className="part">
        {work?.parts && work.parts.length === 1 ? (
          <Card>
            <Card.Body>
              <div className="heading">
                <h2>{work.title}</h2>
                <h4>
                  <Nav.Link as={Link} to={"/users/" + work?.authorId}>
                    Автор: {work?.author?.username}
                  </Nav.Link>
                </h4>
                <span className="divider" />
                <h4>Описание работы</h4>
                <div
                  className="text"
                  dangerouslySetInnerHTML={{
                    __html: decodeHtml(work.description),
                  }}
                ></div>
                {work.note ? (
                  <div>
                    <h4>Примечания автора</h4>
                    <div
                      className="text"
                      dangerouslySetInnerHTML={{
                        __html: decodeHtml(work.note),
                      }}
                    ></div>
                  </div>
                ) : null}
                <span className="divider" />
              </div>
              <div
                xs={8}
                className="container"
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(work.parts[0].text),
                }}
              ></div>
            </Card.Body>
          </Card>
        ) : work?.parts && work.parts.length > 0 ? (
          <Card>
            <Card.Body>
              <div className="heading">
                <h2>{work.title}</h2>
                <h4>
                  <Nav.Link as={Link} to={"/users/" + work?.authorId}>
                    Автор: {work?.author?.username}
                  </Nav.Link>
                </h4>
                <span className="divider" />
                <h4>Описание работы</h4>
                <div
                  className="text"
                  dangerouslySetInnerHTML={{
                    __html: decodeHtml(work.description),
                  }}
                ></div>
                {work.note ? (
                  <div>
                    <h4>Примечания автора</h4>
                    <div
                      className="text"
                      dangerouslySetInnerHTML={{
                        __html: decodeHtml(work.note),
                      }}
                    ></div>
                  </div>
                ) : null}
                <span className="divider" />
              </div>
              {work.parts?.map((workPart, index) => (
                <WorkPart key={index} workPart={workPart} />
              ))}
            </Card.Body>
          </Card>
        ) : (
          <p>На данный момент здесь пусто</p>
        )}
      </div>

      <CommentContext.Provider
        value={{ comments: comments, setComments: setComments }}
      >
        <div className="comment-section">
          <Card>
            <Card.Body>
              <h2>Комментарии</h2>
              <div xs={8} className="container">
                {loggedIn ? (
                  <CommentForm
                    workPartId={work?.parts ? work?.parts[0].id : 0}
                    workId={work?.id}
                  />
                ) : null}
                {comments ? (
                  <div>
                    {comments.map((comment, index) => (
                      <Card key={index} className="comment-card">
                        <Card.Header>
                          <Link to={`/users/${comment.userId}`}>
                            {comment.user.username}
                          </Link>
                          <p>{`${new Date(
                            comment.createdAt
                          ).getDate()}.${new Date(
                            comment.createdAt
                          ).getMonth()}.${new Date(
                            comment.createdAt
                          ).getFullYear()}`}</p>
                        </Card.Header>
                        <Card.Body
                          style={{
                            fontSize: "14px",
                            wordBreak: "break-word",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: decodeHtml(comment.text),
                          }}
                        ></Card.Body>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p>Комментариев нет</p>
                )}
              </div>
            </Card.Body>
          </Card>
        </div>
      </CommentContext.Provider>
    </div>
  );
};

export default MyWork;

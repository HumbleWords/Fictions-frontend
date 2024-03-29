import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

import "../style/admin.scss";

import { useEffect, useState, useContext } from "react";
import { getData, deleteData } from "../utils/network";
import { Table } from "react-bootstrap";


const Admin = () => {
  const [user, setUser] = useState();
  const [WorksList, setWorksList] = useState();
  const [FandomsList, setFandomsList] = useState();
  const [TagsList, setTagsList] = useState();

  const usersListTable = ["#", "Имя", " ", " "];
  const worksListTable = [
    "#",
    "Название",
    "Автор",
    "Описание",
    "Язык",
    "Рейтинг",
    "Категория",
    "Фандомы",
    "Теги",
    " ",
    " ",
  ];
  const fandomsListTable = ["#", "Название", " ", " "];
  const tagsListTable = ["#", "Название", " ", " "];

  async function getWorksList() {
    const res = await getData("works?skip=0&take=20&orderBy=asc");
    if (!res.success) return alert(res.message);
    // console.log({ res });
    return setWorksList(res.data);
  }

  async function getFandomsList() {
    const res = await getData("fandoms?skip=0&take=20&orderBy=asc");
    if (!res.success) return alert(res.message);
    return setFandomsList(res.data);
  }

  async function getTagsList() {
    const res = await getData("tags?skip=0&take=20&orderBy=asc");
    if (!res.success) return alert(res.message);
    return setTagsList(res.data);
  }

  const getUsers = async () => {
    const res = await getData("users?skip=0&take=20&orderBy=asc");
    if (!res.success) alert(res.message);
    return setUser(res.data);
  };

  useEffect(() => {
    getWorksList();
    getFandomsList();
    getTagsList();
    getUsers();
  }, []);

  return (
    <div className="admin-page">
      <div className="user">
        <Table className="table">
          {user && user.length > 0 ? (
            <>
              <thead responsive="sm" bordered hover striped>
                <tr>
                  <th colSpan={12}>Пользователи</th>
                </tr>
                <tr>
                  {usersListTable.map((item, index) => (
                    <th key={index}>{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {user.map((user, index) => (
                  <tr key={user.id}>
                    <td align="center">{index + 1}</td>
                    <td>
                      <p>{user.username}</p>
                    </td>
                    <td>
                      <p>{user.email}</p>
                    </td>
                    <td>{user.birthday}</td>
                    <td>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <h1 className="d-flex justify-content-center">
              Таблица с пользователями пуста
            </h1>
          )}
        </Table>
      </div>

      <div className="works">
        <Table className="table">
          {WorksList && WorksList.length > 0 ? (
            <>
              <thead responsive="sm" bordered hover striped>
                <tr>
                  <th colSpan={12}>Работы</th>
                </tr>
                <tr>
                  {worksListTable.map((item, index) => (
                    <th key={index}>{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {WorksList.map((WorksList, index) => (
                  <tr key={WorksList.id}>
                    <td align="center">{index + 1}</td>
                    <td>
                      <p>{WorksList.title}</p>
                    </td>
                    <td>
                      <p>{WorksList.author.username}</p>
                    </td>
                    <td>{WorksList.description}</td>
                    <td>{WorksList.lang}</td>
                    <td>{WorksList.rating ?? "Не указано"}</td>
                    <td>{WorksList.category ?? "Не указано"}</td>
                    <td>
                      {WorksList.fandoms
                        ? WorksList.fandoms.map((fandom) => (
                            <Nav.Link
                              as={Link}
                              className="text"
                              to={"/fandoms/" + fandom.id}
                            >
                              <span key={fandom.id}>{fandom.name}, </span>
                            </Nav.Link>
                          ))
                        : null}
                    </td>
                    <td>
                      {WorksList.tags
                        ? WorksList.tags.map((tag) => (
                            <Nav.Link
                              as={Link}
                              className="text"
                              to={"/tags/" + tag.id}
                            >
                              <span key={tag.id}>{tag.name}, </span>
                            </Nav.Link>
                          ))
                        : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <h1 className="d-flex justify-content-center">
              Таблица с работами пуста
            </h1>
          )}
        </Table>
      </div>

      <div className="fandoms">
        <Table className="table">
          {FandomsList && FandomsList.length > 0 ? (
            <>
              <thead responsive="sm" bordered hover striped>
                <tr>
                  <th colSpan={12}>Фандомы</th>
                </tr>
                <tr>
                  {fandomsListTable.map((item, index) => (
                    <th key={index}>{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FandomsList.map((FandomsList, index) => (
                  <tr key={FandomsList.id}>
                    <td align="center">{index + 1}</td>
                    <td>
                      <p>{FandomsList.name}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <h1 className="d-flex justify-content-center">
              Таблица с фандомами пуста
            </h1>
          )}
        </Table>
      </div>

      <div className="tags">
        <Table className="table">
          {TagsList && TagsList.length > 0 ? (
            <>
              <thead responsive="sm" bordered hover striped>
                <tr>
                  <th colSpan={12}>Теги</th>
                </tr>
                <tr>
                  {tagsListTable.map((item, index) => (
                    <th key={index}>{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TagsList.map((TagsList, index) => (
                  <tr key={TagsList.id}>
                    <td align="center">{index + 1}</td>
                    <td>
                      <p>{TagsList.name}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <h1 className="d-flex justify-content-center">
              Таблица с тегами пуста
            </h1>
          )}
        </Table>
      </div>
    </div>
  );
};

export default Admin;

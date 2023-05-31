import { Button } from "react-bootstrap";

import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getData } from "../utils/network";

import "../style/profile.scss";

const Profile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const getUser = async () => {
    const res = await getData("users/me");
    if (!res.success) alert(res.message);
    else setUser(res.data);
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="page">
      <a>Profile</a>
      <h1>{user.username}</h1>
      <Button
        onClick={() => {
          localStorage.removeItem("access_token");
          navigate("/");
        }}>
        Выход
      </Button>
    </div>
  );
};

export default Profile;

import { Button, Card } from "react-bootstrap";

import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
// import { getData } from "../utils/network";

import "../style/profile.scss";
import { UserContext } from "../App";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="profile-page">
      <h2>Профиль</h2>
      <span />
      <Card className="data">
        <a>{user?.username}</a>
        <a>{user?.email}</a>
        <a>{user?.birthdate}</a>
      </Card>
      <Button
        className="button"
        onClick={() => {
          localStorage.removeItem("access_token");
          navigate("/");
        }}
      >
        Выход
      </Button>
    </div>
  );
};

export default Profile;

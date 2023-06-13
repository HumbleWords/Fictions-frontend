import { useEffect } from "react";
import { useNavigate } from "react-router";
import useToken from "./useToken";

const useLoginGuard = ({ loggedIn, path }) => {
  const navigate = useNavigate();
  const { loggedIn: currentLoggedIn } = useToken();

  useEffect(() => {
    if (loggedIn === currentLoggedIn) {
      navigate(path);
    }
  }, []);
};

export default useLoginGuard;
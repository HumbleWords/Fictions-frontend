import { useEffect } from "react";
import { useNavigate } from "react-router";

const useAdminGuard = ({role}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "ADMIN") {
      navigate("../");
    }
  });
};

export default useAdminGuard;

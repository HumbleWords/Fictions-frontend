import jwtDecode from "jwt-decode";

const useToken = () => {
    const token = localStorage.getItem("access_token") || null;
    const loggedIn = Boolean(token);
    const username = loggedIn ? jwtDecode(token).username : null;
    const id = loggedIn ? jwtDecode(token).id : null;
    const role = loggedIn ? jwtDecode(token).role : null;
    return { token, loggedIn, username, id, role };
  };
  
  export default useToken;
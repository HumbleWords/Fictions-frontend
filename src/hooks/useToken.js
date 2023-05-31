const useToken = () => {
    const token = localStorage.getItem("access_token") || null;
    const loggedIn = Boolean(token);
    return { token, loggedIn };
  };
  
  export default useToken;
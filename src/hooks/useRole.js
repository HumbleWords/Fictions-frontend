// import jwtDecode from "jwt-decode";

// const useRole = () => {
//     const role = jwtDecode(localStorage.getItem("access_token")).role || null;
//     const loggedIn = Boolean(role);
//     return { role, loggedIn };
//   };
  
//   export default useRole;

const useRole = () => {
  const role = localStorage.getItem("role") || null;
  const loggedIn = Boolean(role);
  return { role, loggedIn };
};

export default useRole;
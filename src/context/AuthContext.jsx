import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
//  Context function
export default function AuthContextProvider(props) {
  const [loginData, setLoginData] = useState(null);

  const saveLoginData = () => {
    let encodedData = localStorage.getItem("token");
    let decocodedData = jwtDecode(encodedData);
    setLoginData(decocodedData);
  };
  const resetLoginData = () => {
    setLoginData(null);
  };
  // call saveLogin data
//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       saveLoginData();
//     }
//   }, []);
  const value = { saveLoginData, loginData, resetLoginData };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

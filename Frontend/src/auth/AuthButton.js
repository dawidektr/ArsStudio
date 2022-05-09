import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import auth from "./auth";


const AuthButton = () => {
  
  const history = useHistory();

  return auth.isAuthenticated === true ? (
    <button className="Logout"
      onClick={() => {
        axios({
          method: 'post',
          url: '/logout',
        })
        auth.signout(() => history.push("/login"));
      }}
    >
      Wyloguj się
    </button>
  ) : null;
};

export default AuthButton;

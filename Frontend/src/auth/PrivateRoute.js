import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import auth from "./auth";
import { Cookies } from 'react-cookie';
const PrivateRoute = ({ children,role, ...rest }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const cookies = new Cookies();
  const cookiesRole = cookies.get('role');
  const authenticate= async () =>{
   await axios({
    method: 'post',
    url: '/auth',
  }).then(res=>{
    if (res.data==="zalogowany") {
      setIsAuth(true)
      auth.authenticate()
      setIsLoading(false)
      }
      else{
         setIsAuth(false)
         setIsLoading(false)

         
      }
  }).catch(err=>{
    setIsAuth(false)
    setIsLoading(false)
  })
}

useEffect(() => {
  authenticate();
}, []);

  if(isLoading)
  return(
    <div>Loading ...</div>
  )
  if(role===undefined)
  {
  return (
    <Route {...rest}  render={({ location }) => { return (isAuth === true ) ? ( children ) : (<Redirect to={{ pathname: "/login",  state: { from: location }    }}  />  )   }}/>
  );
  }
  else
  {
    return (
      <Route {...rest}  render={({ location }) => { return (isAuth === true && role.includes(cookiesRole)) ? ( children ) : (<Redirect  to={{ pathname: "/login",  state: { from: location }    }}  />  )   }}/>
    );
  }
};

export default PrivateRoute;

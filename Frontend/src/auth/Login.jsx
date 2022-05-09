import axios from "axios";
import React,{useState} from "react";
import { Link } from "react-router-dom";
import { Redirect, useLocation } from "react-router-dom";
import auth from "./auth";


const Login = () => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const { state } = useLocation();
  const [error,setError]=useState("");
    

    const goRender = () =>{
      if (auth.isAuthenticated === true) {
        setRedirectToReferrer(true)
      }
    }

    const  handleSubmit = async (e) =>
    {
      e.preventDefault();
      
     axios({
        method: 'post',
        url: '/login',
        data: {
        username:login,
        password:password
        }
      }).then(res=>{
        if(res.data==="OK")
        {
          axios({
            method: 'post',
            url: '/auth',
          }).then(res=>{
            if(res.data){
              auth.authenticate();
            goRender();
            }
          })
        }
        else
        {
          setError(res.data.error)
        }
      })
      .catch(err=>console.log(err));
    }
    
  
  if (redirectToReferrer === true) {
    return <Redirect to={state?.from || "/"} />;
  }

  return (
    <div className="Login">
      <p>Musisz się zalogować aby przejść dalej</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="login">
        Login
        <br/>
        <input type="text" name="login" id="login" value={login} onChange={(e)=>setLogin(e.target.value)}/>
        </label>
        
        <label htmlFor="login">
           Password
           <br/>
          <input type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </label>
        <button type="submit">Zaloguj</button>
      </form>
      {error&& <p>{error}</p>}


      <p>Jeśli nie posiadasz jeszcze konta </p>
      <Link to="/register"><button>Zarejestruj się</button></Link>
    </div>
  );
};

export default Login;

import axios from "axios";
import React, { useState } from "react";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Redirect } from "react-router-dom";


const Register = () => {
  const [redirect,setRedirect]=useState(false);
  const [error,setError]=useState("");


  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
      rpassword: '',
      
    },
    validationSchema: Yup.object({
      login: Yup.string()
        .min(6,'Login za krótki, co najmniej 6 znaków')
        .max(50, 'Maksymalnie 50 znaków')
        .required('Wymagany login'),
      password: Yup.string()
        .max(2000, 'Maksymalnie 50 znaków')
        .min(6,'Hasło za krótkie, co najmniej 6 znaków')
        .required('Wymagane hasło'),
      rpassword: Yup.string()
        .min(6,'Hasło za krótkie, co najmniej 6 znaków')
        .max(2000, 'Maksymalnie 50 znaków')
        .required('Wymagane hasło')
        .oneOf([Yup.ref('password')],'Hasła się nie zgadzają')
    }),
    onSubmit: values => {
            
      axios({
        method: 'post',
        url: '/api/register',
        data: {
          login:values.login,
          password:values.password
        }
        
      }).then(response=>alert(response.data))
      .catch(err=>alert(`Rejestracja nieudana ${err}`));
      
  
      
     
    },
  });


  if(redirect){
  return <Redirect to="/" />
  }

  else{
  return (
    <div className="AddPage">
      <h3>Rejestracja</h3>
     <form onSubmit={formik.handleSubmit}>
        <label name="login">
          Login
          <br />
          <input
        id="login"
        name="login"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.login}
      />
      {formik.touched.login && formik.errors.login ? (
        <div className="error">{formik.errors.login}</div>
      ) : null}
        </label>

        <label name="password">
          Hasło
          <br />
          <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div className="error">{formik.errors.password}</div>
      ) : null}
        </label>

        <label name="rpassword">
          Powtórz hasło
          <br />
          <input
        id="rpassword"
        name="rpassword"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.rpassword}
      />
      {formik.touched.rpassword && formik.errors.rpassword ? (
        <div className="error">{formik.errors.rpassword}</div>
      ) : null}
        </label>
       
        <button type="submit">Wyślij</button>
      </form>
     
    </div>
  );
};
}

export default Register;

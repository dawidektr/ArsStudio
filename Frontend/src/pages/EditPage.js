/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {withRouter} from 'react-router-dom'

const EditPage = ({match}) => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [power, setPower] = useState("");
 


  const fetchData = async () => {
    
    const response = await axios
      .get(`/api/edit/${match.params.id}`)
      .catch((err) => console.log(err));
     
     if(response)
     {
       setMake(response.data[0].make)
       setModel(response.data[0].model)
       setPower(response.data[0].power)
     }
  };
 
  
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      make: make||"",
      model: model||"",
      power: power||"",
      
    },
    validationSchema: Yup.object({
      make: Yup.string()
        .max(50, 'Maksymalnie 50 znaków')
        .required('Wymagana nazwa marki'),
      model: Yup.string()
        .max(50, 'Maksymalnie 50 znaków')
        .required('Wymagana nazwa modelu'),
        power: Yup.string()
        .max(5, 'Maksymalnie 5 znaków')
        .required('Wymagane podanie mocy')
    }),
    onSubmit: values => {
       axios({
        method: 'post',
        url: '/api/edit',
        data: {
          id_tractor:match.params.id,
          make:values.make,
          model:values.model,
          power:values.power, 
        } 
      }).then(alert("Edycja udana"))
      .catch(err=>console.log("Edycja nie udana",console.log(err)));
    },
  });


useEffect(() => {
  fetchData();
}, []);
  return (
    <div className="AddPage">
      <h3>Edycja oferty</h3>
      <form onSubmit={formik.handleSubmit}>
        <label name="make">
          Marka
          <br />
          <input
        id="make"
        name="make"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.make}
      />
      {formik.touched.make && formik.errors.make ? (
        <div className="error">{formik.errors.make}</div>
      ) : null}
        </label> 

        <label name="model">
          Model
          <br />
          <input
        id="model"
        name="model"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.model}
      />
      {formik.touched.model && formik.errors.model ? (
        <div className="error">{formik.errors.model}</div>
      ) : null}
        </label> 

        <label name="power">
          Moc
          <br />
          <input
        id="power"
        name="power"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.power}
      />
      {formik.touched.power && formik.errors.power ? (
        <div className="error">{formik.errors.power}</div>
      ) : null}
        </label> 
       
      
       
        <button type="submit">Wyślij</button>
      </form>
    </div>
  );
};

export default withRouter(EditPage);

import axios from "axios";
import React from "react";
import { useFormik } from 'formik';
 import * as Yup from 'yup';

const AddPage = () => {
   
    const formik = useFormik({
    initialValues: {
      make: '',
      model:'',
      power:'',
     
    },
    validationSchema: Yup.object({
      make: Yup.string()
        .max(200, 'Maksymalnie 200 znaków')
        .required('Wymagana nazwa marki'),
      model: Yup.string()
        .max(200, 'Maksymalnie 200 znaków')
        .required('Wymagana nazwa modelu'),
      power: Yup.string()
        .min(1, "Minimalnie 1 znak")
        .max(5, 'Maksymalnie 5 znaków')
        .required('Podaj moc traktora')
    
    }),
    onSubmit: values => {
    
    
    axios({
      method: 'post',
      url: '/api/add',
      data: {
        make:values.make,
        model:values.model,
        power:values.power   
      }
      
    }).then(response=>alert(response.data))
    .catch(err=>alert(`Dodawanie nie udane ${err}`,console.log(err)));
    

  
      
    },
  });



  return (
    <div className="AddPage">
      <h3>Dodawanie nowego traktoru</h3>
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

export default AddPage;



import React,{useState,useEffect} from "react";
import AuthButton from "../auth/AuthButton";
import { Link } from "react-router-dom";
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import Table from "../components/Table";
import { Cookies } from 'react-cookie';
import { withRouter } from "react-router-dom";

const AdminPage = () => {
  const [tractors, setTractors] = useState([]);
  const cookies = new Cookies();
  const role = cookies.get('role');

  const fetchTractors = async () => {
    const response = await axios
      .get("/api/list")
      .catch((err) => console.log(err));
    if (response) {
      const tractors = response.data;   
      setTractors(tractors);
    }
  
  };


  const deleteTractor = async(id_tractor) =>
  {
    await axios({
      method: 'delete',
      url: `/api/delete/${id_tractor}`,
      
    }).then(alert("Oferta usunięta"), fetchTractors())
    .catch((error)=>alert(error));
  }

  const handleDeleteTractor = async (id_tractor) =>
  {
    confirmAlert({
      title: 'Potwierdź aby przejść dalej',
      message: 'Czy na pewno chcesz usunąć?',
      buttons: [
        {
          label: 'Tak',
          onClick: () => deleteTractor(id_tractor)
        },
        {
          label: 'Nie',
          onClick: () => alert('Nie usunięto oferty')
        }
      ]
    });
  }
  useEffect(() => {
    fetchTractors();
  }, []);

  return (
    <>
      <div className="admin">
      {(role==="admin")?<h2>Panel administratora</h2>:<h2>Panel użytkownika</h2>}
        <h2>Lista traktorów</h2>
        {(role==="admin")?<Link to="/add"><button>Dodaj nowy traktor</button></Link>:null}
        <AuthButton />
        <div className="Table">
        <Table data={tractors} handleDelete={handleDeleteTractor} role={role}/>
      </div>
      </div> 
    </>
  );
}

export default withRouter(AdminPage);



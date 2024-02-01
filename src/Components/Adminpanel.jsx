import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { API_URL } from "../API Services/Api.js";
import Table from "react-bootstrap/Table";
import "../Stylesheets/Adminpanel.css";
// import DeleteIcon from '@mui/icons-material/Delete';
// import Stack from '@mui/material/Stack';
import { Link, useNavigate, Navigate } from "react-router-dom";
import Navbarer from "./adminnavbar.jsx";
import { logout, isAuthenticated } from "../services/Auth";
import { UserDetailsApi } from "../services/Api";





const Adminpanel = () => {
  const navigate = useNavigate();


  
  const [apiData, setAPIdata] = useState([]);

  const Sample = async () => {
    const resp = await axios.get(API_URL);
    setAPIdata(resp.data);
  };
  useEffect(() => {
    Sample();
  }, []);

  const deleteUser = async (id) => {
    await axios.delete(API_URL + id);
    Sample();
  };

  const [user, setUser] = useState({ name: "", email: "", localId: "" });

  useEffect(() => {
    if (isAuthenticated()) {
      UserDetailsApi().then((response) => {
        setUser({
          name: response.data.users[0].displayName,
          email: response.data.users[0].email,
          localId: response.data.users[0].localId,
        });
      });
    }
  }, []);




  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");


  const updateapi = async (id) => {
    // await axios.put(API_URL + id, {
    //   title,
    //   description,
    //   price,
    //   category,
    //   image,
    // });
    navigate("/updateproduct");
  };
  

  const logoutUser = ()=>{
    logout();
    navigate('/')
}

if (!isAuthenticated()) {
    return <Navigate to="/" />
}


  return (
    <div>
      <Navbarer logoutUser={logoutUser} />
      <Table striped bordered hover className="admintabel">
        <thead>
          <tr>
            {/* <th>#</th> */}
            <th>
              <b>PRODUCT</b>
            </th>
            <th>
              <b>PRICE</b>
            </th>
            <th>
              <b>DESCRIPTION</b>
            </th>
            <th>
              <b>CATEGORY</b>
            </th>
            <th className="adminpanelimage">
              <b>IMAGE</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {apiData.map((data) => (
            <tr>
              <td>{data.title}</td>
              <td>{data.price}</td>
              <td >{data.description}</td>
              <td>{data.category}</td>
              <td id="prdtimg">{data.image}</td>
              <td>
                
                <button
                  className="btn btn-primary btnsadmin" onClick={() => updateapi(data.id)}
                  >
                    Update Product
                  </button>
              </td>

              <td>
                {" "}
                <button
                  className="btn btn-primary btnsadmin" 
                  onClick={() => deleteUser(data.id)}
                >
                  Delete product
                </button>
              </td>
            </tr>
          ))}


          
        </tbody>
      </Table>
    </div>



  );
};

export default Adminpanel;

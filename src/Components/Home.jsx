import React from 'react'
import Navbarmain from './Navbarmain'
import Product from '../Components/Products'
import { logout, isAuthenticated } from "../services/Auth";
import { UserDetailsApi } from "../services/Api";
import { Link, useNavigate, Navigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const logoutUser = ()=>{
    logout();
    navigate('/')
}

  return (
    <div>
<Navbarmain/>
<Product/>
    </div>
  )
}

export default Home

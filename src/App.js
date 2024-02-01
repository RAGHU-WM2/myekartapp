import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import Register from './Components/Register';
import Navbar from './Components/adminnavbar'
import Adminpanel from './Components/Adminpanel';
import Addproduct from './Components/Addproduct';
import Updateproduct from './Components/Update'
import Home from './Components/Home';
import Product from './Components/Products'
import Details from './Components/ProductDetail'
import { useState } from 'react';


function App() {
  
  return (
    <div className="App">
   <div>
    
   </div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login/>}></Route>
          <Route exact path="/register"  element={<Register/>}></Route>
          <Route exact path="/navbar"  element={<Navbar/>}> </Route> 
          <Route exact path="/adminpanel" element={<Adminpanel/>}></Route>
          <Route exact path="/addproduct"  element={<Addproduct/>}></Route>
          <Route exact path="/updateproduct"  element={<Updateproduct/>}> </Route> 
          <Route exact path="/home" element={<Home/>}></Route>
          <Route exact path="/product"element={<Product/>}></Route>
          <Route exact path="/pdetails" element={<Details/>}></Route>



        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;

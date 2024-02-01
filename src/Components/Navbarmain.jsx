import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import ReactiveButton from "reactive-button";
import '../Stylesheets/Navbarmain.css'
import { isAuthenticated } from "../services/Auth"

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (

<div>
    



<Navbar className="bg-body-tertiary" id="navbar">
      <Container>
        <Navbar.Brand href="#home"><b>EKART</b></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <div className="navbtnadmin">
            <Link to="/addproduct" id="navmainlink">
              {" "}
              Home
              {/* <ReactiveButton
                color="yellow"
                outline
                idleText={"ADD PRODUCT "}
              /> */}
            </Link>

            <Link to="/mycart" id="navmainlink">
               My Cart
              {/* <ReactiveButton
                color="blue"
                outline
                idleText={"UPDATE PRODUCT "}
              /> */}
            </Link>
            <Link to="" id="navmainlink">Contact</Link>
            <Link to="/" id="navmainlink">  {isAuthenticated()?<a className="nav-link"  onClick={props.logoutUser} style={{cursor:"pointer"}} > <ReactiveButton
                color="red"
                outline
                idleText={"LOGOUT "}
              /></a>:null}</Link>

          </div>

          <Navbar.Text>
            {/* Signed in as: <a href="#login"></a>  */}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}
export default ResponsiveAppBar;
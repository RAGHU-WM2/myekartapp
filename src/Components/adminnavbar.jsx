import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import ReactiveButton from "reactive-button";
import '../Stylesheets/Navbr.css'
import { isAuthenticated } from "../services/Auth"

function TextLinkExample(props) {
  return (
    <Navbar className="bg-body-tertiary" id="navbr">
      <Container>
        <Navbar.Brand href="#home">ADMIN DASHBOARD</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <div className="navbtnadmin">
            <Link to="/addproduct">
              {" "}
              <ReactiveButton
                color="dark"
                outline
                idleText={"ADD PRODUCT "}
              />
            </Link>

            <Link to="/updateproduct">
              <ReactiveButton
                color="blue"
                outline
                idleText={"UPDATE PRODUCT "}
              />
            </Link>
            <Link to="/home">
              {" "}
              <ReactiveButton
                color="green"
                outline
                idleText={"GO EKART "}
              />
            </Link>
            
         <Link>
         {isAuthenticated()?<a className="nav-link"  onClick={props.logoutUser} style={{cursor:"pointer"}} > <ReactiveButton
                color="red"
                outline
                idleText={"LOGOUT "}
              /></a>:null}
         
         </Link>   


          </div>
        
     
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TextLinkExample;

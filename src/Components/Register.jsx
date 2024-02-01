import { useState } from "react";
import { RegisterApi } from "../services/Api";
import { isAuthenticated } from "../services/Auth";
import { storeUserData } from "../services/Storage";
import "../Stylesheets/Registration.css";
import { Link, Navigate } from "react-router-dom";
// import NavBar from '../components/NavBar';
import Image from "../Assests/14449322_5464026.jpg";
export default function RegisterPage() {
  const initialStateErrors = {
    email: { required: false },
    password: { required: false },
    name: { required: false },
    custom_error: null,
  };
  const [errors, setErrors] = useState(initialStateErrors);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = initialStateErrors;
    let hasError = false;
    if (inputs.name == "") {
      errors.name.required = true;
      hasError = true;
    }
    if (inputs.email == "") {
      errors.email.required = true;
      hasError = true;
    }
    if (inputs.password == "") {
      errors.password.required = true;
      hasError = true;
    }

    if (!hasError) {
      setLoading(true);
      //sending register api request
      RegisterApi(inputs)
        .then((response) => {
          storeUserData(response.data.idToken);
        })
        .catch((err) => {
          if (err.response.data.error.message == "EMAIL_EXISTS") {
            setErrors({
              ...errors,
              custom_error: "Already this email has been registered!",
            });
          } else if (
            String(err.response.data.error.message).includes("WEAK_PASSWORD")
          ) {
            setErrors({
              ...errors,
              custom_error: "Password should be at least 6 characters!",
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
    console.log(initialStateErrors, errors);
    setErrors(errors);
  };

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  if (isAuthenticated()) {
    //redirect user to dashboard
    return <Navigate to="/adminpanel" />;
  }

  return (
    <div className="registerpage">
      {/* <NavBar/> */}

      <section className="register-block">
        <div className="container">
          <div className="row ">
            <div className="col register-sec">
              <h2 className="text-center">Register Now</h2>
              <form onSubmit={handleSubmit} className="reginputs"  action="">
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="text-uppercase"
                  >
                    Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="reginptfield"
                    onChange={handleInput}
                    name="name"
                    id=""
                  />
                  {errors.name.required ? (
                    <span className="text-danger">Name is required.</span>
                  ) : null}
                </div>
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="text-uppercase"
                  >
                    Email
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="reginptfield"
                    onChange={handleInput}
                    name="email"
                    id=""
                  />
                  {errors.email.required ? (
                    <span className="text-danger">Email is required.</span>
                  ) : null}
                </div>
                <div className="form-group">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="text-uppercase"
                  >
                    Password
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    id="reginptfield"
                    onChange={handleInput}
                    name="password"
                    id=""
                  />
                  {errors.password.required ? (
                    <span className="text-danger">Password is required.</span>
                  ) : null}
                </div>
                <div className="form-group">
                  <span className="text-danger">
                    {errors.custom_error ? <p>{errors.custom_error}</p> : null}
                  </span>
                  {loading ? (
                    <div className="text-center">
                      <div
                        className="spinner-border text-primary "
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : null}

                  <input
                    type="submit"
                    className="btn btn-login float-right"
                    disabled={loading}
                    value="Register"
                  />
                </div>
                <div className="clearfix"></div>
                <div className="form-group">
                  Already have account ? Please{" "}
                  <Link to="/" id="reglink">
                    Login
                  </Link>
                </div>
                <div>
                  <div className="logright">
                    <img src={Image} width={300} alt="" sizes="" />
                  </div>{" "}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// import React, { useState } from "react";
// import Image from "../Assests/14449322_5464026.jpg";
// import "../Stylesheets/Registration.css";
// import googlepng from "../Assests/google.png";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// // import "../Stylesheets/Register.css";
// import axios from "axios";
// import { API_URL } from "../API Services/Api";
// import { REGISTER_URL } from "../API Services/Register";
// import { RegisterApi } from "../services/Api";
// import { isAuthenticated } from "../services/Auth";
// import { storeUserData } from "../services/Storage";
// import { Navigate } from "react-router-dom";
// const Register = () => {
//   const initialStateErrors = {
//     email: { required: false },
//     password: { required: false },
//     name: { required: false },
//     custom_error: null,
//   };
//   const [errors, setErrors] = useState(initialStateErrors);

//   const [loading, setLoading] = useState(false);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     let errors = initialStateErrors;
//     let hasError = false;
//     if (inputs.name == "") {
//       errors.name.required = true;
//       hasError = true;
//     }
//     if (inputs.email == "") {
//       errors.email.required = true;
//       hasError = true;
//     }
//     if (inputs.password == "") {
//       errors.password.required = true;
//       hasError = true;
//     }

//     if (!hasError) {
//       setLoading(true);
//       //sending register api request
//       RegisterApi(inputs)
//         .then((response) => {
//           storeUserData(response.data.idToken);
//         })
//         .catch((err) => {
//           if (err.response.data.error.message == "EMAIL_EXISTS") {
//             setErrors({
//               ...errors,
//               custom_error: "Already this email has been registered!",
//             });
//           } else if (
//             String(err.response.data.error.message).includes("WEAK_PASSWORD")
//           ) {
//             setErrors({
//               ...errors,
//               custom_error: "Password should be at least 6 characters!",
//             });
//           }
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//     console.log(initialStateErrors, errors);
//     setErrors(errors);
//   };

//   const [inputs, setInputs] = useState({
//     email: "",
//     password: "",
//     name: "",
//   });

//   const handleInput = (event) => {
//     setInputs({ ...inputs, [event.target.name]: event.target.value });
//   };

//   if (isAuthenticated()) {
//     //redirect user to dashboard
//     return <Navigate to="/login" />;
//   }
//   // const [register, setRegister] = useState({
//   //   username: "",
//   //   email: "",
//   //   phone: "",
//   //   password: ""

//   // });
//   // const navigate = useNavigate();

//   // const handlesubmit = async (event) => {
//   //   event.preventDefault();
//   //   await axios.post(REGISTER_URL,register);
//   //   console.log(register);
//   //   navigate("/");
//   // };
//   return (
//     // <form action="" onSubmit ={handleSubmit} >
//     <div className="registerpage">
//       <div className="regleft">
//         <img src={Image} width={800} alt="" sizes="" />
//       </div>
//       <div className="regright">
//         <h1> Let’s get you started</h1>
//         <p>Welcome back! Please enter your details.</p>
//         <div className="reginputs">
//           <form onSubmit={handleSubmit} className="register-form" action="">
//             <label htmlFor="">Username</label>
//             <input
//               type="text"
//               onChange={handleInput}
//               name=""
//               id="reginptfield"
//             />
//             {errors.name.required ? (
//               <span className="text-danger">Name is required.</span>
//             ) : null}
//             <label htmlFor="">Email Address</label>
//             <input
//               type="phone"
//               onChange={handleInput}
//               name=""
//               id="reginptfield"
//             />
//             {errors.email.required ? (
//               <span className="text-danger">Email is required.</span>
//             ) : null}
//             {/* <label htmlFor="">Phone number</label>
//           <input type="phone"    onChange={handleInput}name="" id="reginptfield" /> */}
//             <label htmlFor="" c>
//               Create Password
//             </label>

//             {errors.password.required ? (
//               <span className="text-danger">Password is required.</span>
//             ) : null}

//             <input type="password" name="" id="reginptfield" />
//             <span className="text-danger" >
//                             { errors.custom_error?
//                             (<p>{errors.custom_error}</p>)
//                             :null
//                             }
//                             </span>
//                             {loading ?
//                             (<div  className="text-center">
//                                 <div className="spinner-border text-primary " role="status">
//                                     <span className="sr-only">Loading...</span>
//                                 </div>
//                             </div>):null}
//             <input
//               type="submit"
//               id="signfield"
//               disabled={loading}
//               value="Register"
//             />
//             <p style={{ fontSize: "12px", textAlign: "center" }}>
//               Already a user?
//               <Link to="/" id="loglink">
//                 Login{" "}
//               </Link>
//               !
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//     // </form>
//   );
// };

// export default Register;

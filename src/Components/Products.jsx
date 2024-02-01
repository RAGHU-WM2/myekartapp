import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import "../Stylesheets/Product.css";
import Skeleton from "react-loading-skeleton";
import { API_URL } from "../API Services/Api.js";
import { useNavigate } from "react-router-dom";
import pcardimg from "../Assests/g92-2-500x500 1.png";
import pcardimgheart from "../Assests/heart small.svg";
import pcardimgeye from "../Assests/Quick View.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";
import ReactiveButton from "reactive-button";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";

import Carouselimg1 from "../Assests/pngtree-ecommerce-banner-planning-segmentation-selection-image_1316202.jpg";
import Carouselimg2 from "../Assests/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg";
import Carouselimg3 from "../Assests/ecommerce_website_banner_template_customers_sketch_flat_design_55246.jpg";

import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const Products = (  ) => {
  const Navigate = useNavigate();

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

  const updateUser = ({ id, title, description, price, category, image }) => {
    localStorage.setItem("id", id);
    localStorage.setItem("title", title);
    localStorage.setItem("description", description);
    localStorage.setItem("price", price);
    localStorage.setItem("category", category);
    localStorage.setItem("image", image);

    Navigate("/updateproduct");
  };
  const loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };
  const [files, setFiles] = useState();
  const [previews, setPreviews] = useState();

  // rendering previews
  useEffect(() => {
    if (!files) return;
    let tmp = [];
    for (let i = 0; i < files.length; i++) {
      tmp.push(URL.createObjectURL(files[i]));
    }
    const objectUrls = tmp;
    setPreviews(objectUrls);

    // free memory
    for (let i = 0; i < objectUrls.length; i++) {
      return () => {
        URL.revokeObjectURL(objectUrls[i]);
      };
    }
  }, [files]);

  return (
    <div>
      {/* <h1 style={{ fontFamily: "poppins" }}>Products</h1> */}

      <div className="productcard">
        <Container fluid>
          <Row>
            {apiData.map((data) => (
              <div className="col-md-2 mb-5 mt-3  ">
                <div className="card">
                  <div className="pcardicons">
                    {/* <img src={pcardimgheart} width="27  " alt="" />
                      <img src={pcardimgeye} width="27" alt="" /> */}
                  </div>
                  <div className="cardIn">
                    <div className="imgpc">
                      {previews &&
                        previews.map((bio) => {
                          return <img src={bio} width={150} />;
                        })}
                      <img src={data.image}id="pimg" width={160} alt=""  />
                    </div>
                  </div>
                  <div className="cardup">
                    <p>{data.title}</p>
                  </div>

                  <Box
                    sx={{
                      "& > legend": { mt: 2 },
                    }}
                  ></Box>
                  <Rating name="customized-10" defaultValue={4} max={5} />
                  <p>{data.category}</p>
                  <div className="pcardbtn">
                    <h6>₹{data.price}</h6>
                    <Button variant="dark" id="buybtn">
                      Buynow
                    </Button>
                    
                  </div>
                  <Button variant="info"  id="cartbtn">
                      Add Cart
                    </Button>
                </div>
              </div>
            ))}
            
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Products;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { API_URL } from "../API Services/Api.js";
import { useNavigate } from "react-router-dom";
import Navbarer from "./adminnavbar.jsx";
import "../Stylesheets/Addproduct.css";
import { Container } from "react-bootstrap";

const Addproduct = () => {
  const Navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    images1: "",

    // count: "",
    // total: "",
  });
  const handlesubmit = async (event) => {
    event.preventDefault();
    await axios.post(API_URL, product);
    alert("Added sucessfully");
    Navigate("/adminpanel");
  };

  const [files, setFiles] = useState();
  const [previews, setPreviews] = useState();

  const [files1, setFiles1] = useState();
  const [previews1, setPreviews1] = useState();

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

  // rendering previews
  useEffect(() => {
    if (!files1) return;
    let tmp = [];
    for (let i = 0; i < files1.length; i++) {
      tmp.push(URL.createObjectURL(files1[i]));
    }
    const objectUrls = tmp;
    setPreviews1(objectUrls);

    // free memory
    for (let i = 0; i < objectUrls.length; i++) {
      return () => {
        URL.revokeObjectURL(objectUrls[i]);
      };
    }
  }, [files1]);

  // console.log(picss);

  const preview = (event) => {
    event.preventDefault();

    console.log(product);
  };

  const anss = "animal";
  return (
    <div>
      <Navbarer />

      <div className="col-lg-6"></div>

      <div className="addproductt">
        <div className="addproductpage">
          <h3>Add New Product</h3>

          <Form onSubmit={handlesubmit} id="addinfo">
            <Row className="mb-3" id="adproductinfo">
              <h4>Base Information</h4>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control id="inputsadd"
                  type="text"
                  onChange={(event) =>
                    setProduct({ ...product, title: event.target.value })
                  }
                  placeholder="Enter title"
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"id="inputsadd"
                id="descriptionbox"
                onChange={(event) =>
                  setProduct({ ...product, description: event.target.value })
                }
                placeholder="Description"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"id="inputsadd"
                onChange={(event) =>
                  setProduct({ ...product, price: event.target.value })
                }
                placeholder="Price"
              />
            </Form.Group>
            {/* <Row className="mb-3"> */}
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Category</Form.Label>
              <Form.Select
                id="categorybox"
                onChange={(event) =>
                  setProduct({ ...product, category: event.target.value })
                }
              >
                <option id="categorybox">Choose...</option>
                <option> ELECTRONICS</option>
                <option>JEWELERY</option>
                <option>MEN'S CLOTHING</option>
                <option>WOMEN'S CLOTHING</option>
                <option>HOME APPLIANCES</option>
                <option>STATIONARY</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Picture Link</Form.Label>
              <Form.Control
                id="categorybox"
                type="text"
                accept="image/jpg, image/jpeg, image/png,image/WEBP file,image/Webp"
                onChange={(e) => {
                  setProduct({ ...product, image: e.target.value });
                  if (e.target.files && e.target.files.length > 0) {
                    setFiles(e.target.files);
                  }
                }}
              />
            </Form.Group>

            {/* <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Pictures</Form.Label>
              <Form.Control
                id="categorybox"
                type="file"
                multiple
                accept="image/jpg, image/jpeg, image/png,image/WEBP file,image/Webp"
                onChange={(e) => {
                  setProduct({ ...product, images1: e.target.value });
                  if (e.target.files1 && e.target.files1.length > 0) {
                    setFiles1(e.target.files1);
                  }
                }}
              />
            </Form.Group> */}
            {/* </Row>  */}
            <br />
            {/* <Button variant="primary" onClick={preview}>
              Preview
            </Button> */}
          </Form>
        </div>

        <div className="col-lg-6">
          <div className="previewright">
            <h5>Preview</h5>
            <Button variant="primary" onClick={handlesubmit} type="submit">
              Publish Now
            </Button>
            <div className="previewadd">
              <div className="previewbg">
                {" "}
                {previews &&
                  previews.map((pic) => {
                    return <img src={pic} width={190} />;
                  })}{" "}
              </div>

              {/* {previews1 &&
                previews1.map((pic) => {
                  return <img src={pic}   width={190}/>;
                })} */}

              <div className="previewbgSSS"></div>

              <div className="femo">
                <div className="previewdetails">
                  <div id="demoheadings">
                    Product Name: <p>{product.title}</p>
                    Product Description: <p>{product.description}</p>
                    Product Category: <p>{product.category}</p>
                    Product Price:<p>₹{product.price}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addproduct;

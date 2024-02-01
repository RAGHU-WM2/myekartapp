import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { API_URL } from "../API Services/Api.js";
import { useNavigate } from "react-router-dom";
import Navbarer from './adminnavbar.jsx'

const Updatecontent = () => {
  const navigate = useNavigate(); 
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");         
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setTitle(localStorage.getItem("title"));
    setDescription(localStorage.getItem("description"));
    setPrice(localStorage.getItem("price"));
    setCategory(localStorage.getItem("category"));
    setImage(localStorage.getItem("image"));
  }, []);
  const updateapi = async (id) => {
    await axios.put(API_URL + id, {
      title,
      description,
      price,
      category,
      image,
    });
    navigate("/home");
  };
  return (
    <div>
          <Navbarer/>
      <h1>UPDATE</h1>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter title"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              onChange={(event) => setPrice(event.target.value)}
              placeholder="Price"
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => setDescription(event.target.value)}
            placeholder=""
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Category</Form.Label>
            <Form.Select onChange={(event) => setCategory(event.target.value)}>
              <option>Choose...</option>
              <option> ELECTRONICS</option>
              <option>JEWELERY</option>
              <option>MEN'S CLOTHING</option>
              <option>WOMEN'S CLOTHING</option>={" "}
              <option>HOME APPLIANCES</option>={" "}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              onChange={(event) => setImage(event.target.value)}
            />
          </Form.Group>
        </Row>
        {/* <Form.Label>Count</Form.Label>
          <Form.Control
            onChange={(event) =>
              setProduct({ ...product, count: event.target.value })
            }
            placeholder=""
          />
          <Form.Label>Total</Form.Label>
          <Form.Control
            onChange={(event) =>
              setProduct({ ...product, total: event.target.value })
            }
            placeholder=""
          /> */}

        <Button variant="primary" onClick={updateapi} type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default Updatecontent;

import axios from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';



export default function AddOrder() {
const navigate = useNavigate()

      const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    await axios.post("/api/order", data);
    navigate('/')
  };
  return (
  <>
          <Form onSubmit={submitHandler}>
            Компания
            <Form.Control type="text" name="company" />
            Номер
            <Form.Control type="number" name="phone" />
            <Button type="submit">Создать</Button>
          </Form>
        </>
  );
}

import React from "react";
import { Button, Container, Form } from "react-bootstrap";

export default function LoginPage({ loginHandler }) {
  return (
    <Container>
      <h1>Вход</h1>
      <Form onSubmit={loginHandler}>
      
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email адрес</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          войти
        </Button>
      </Form>
    </Container>
  );
}
import React, { useState } from "react";
import instanceURL from "../config/instance";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setLoading(true);
      const { username, password } = loginForm;

      const { data } = await instanceURL.post("/login", {
        username,
        password,
      });
      localStorage.access_token = data.access_token;
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="mt-5">
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={loginForm.username}
            onChange={(e) => {
              setLoginForm({ ...loginForm, username: e.target.value });
            }}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={loginForm.password}
            onChange={(e) => {
              setLoginForm({ ...loginForm, password: e.target.value });
            }}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Loading…" : "Login"}
        </Button>
      </Form>
    </Container>
  );
}

import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function SignUp() {
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const { signup } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (passwordRef.current.value === confirmPasswordRef.current.value) {
    } else {
      return setError("Password Do not Match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(
        userNameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Failed To Create An Account");
    }
    setLoading(false);
  }

  return (
    <>
      {" "}
      <Card className="p-2">
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="my-4" id="email">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={userNameRef} required />
            </Form.Group>

            <Form.Group className="my-4" id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Form.Group className="my-4" id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Form.Group className="my-4" id="confirm-password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={confirmPasswordRef} required />
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit">
              Sign UP
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already Have An account ? <Link to="/login">Login</Link>
      </div>
    </>
  );
}

export default SignUp;

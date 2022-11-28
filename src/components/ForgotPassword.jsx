import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ForgotPassword() {
  const emailRef = useRef();

  const { resetPassword, currentUser } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [strongMessage, setStrongMessage] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      setMessage("");
      setStrongMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage(`Password Reset Link Sent to ${emailRef.current.value}.`);
      setStrongMessage("Check Spam If you Can't Find it");
    } catch (error) {
      console.log(error);
      setError("Failed To Reset Password");
    }
    setLoading(false);
  }

  return (
    <>
      {" "}
      <Card className="p-2">
        <Card.Body>
          <h2 className="text-center mb-4">Forgot Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}<br /><strong>{strongMessage}</strong></Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="my-4" id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit">
              Rest Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            Remember You Password! <Link to="/login">Login </Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need An Account ? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}

export default ForgotPassword;

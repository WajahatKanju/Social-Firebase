import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState();
  const navigate = useNavigate();
  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError("Failed To Sign In");
    }
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          <strong>Email: {currentUser && currentUser.email} </strong>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
          {error && <Alert variant="danger">{error}</Alert>}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}

export default Dashboard;

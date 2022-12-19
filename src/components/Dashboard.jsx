import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

import { profile } from "./defaults";

import { getStorage, ref, getDownloadURL } from "firebase/storage";

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState();

  function getProfilePic(user_id) {
    const storage = getStorage();
    const profilePictureRef = ref(storage, `users/${user_id}/images/profile`);
    getDownloadURL(profilePictureRef)
      .then((url) => {
        setUserProfile(url);
      })
      .catch((error) => {
        // Handle any errors
      });
  }

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
  getProfilePic(currentUser.uid);
  return (
    <>
  {console.log(useAuth())}
      <Card className="text-center">
        <Card.Body>
          <Card.Img
            className="rounded-circle my-4 d-inline-block"
            src={userProfile ? userProfile : profile}
          />
          <h2 className="text-center mb-4">Profile</h2>
          <em>Name: {currentUser.displayName}</em>
          <br />
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

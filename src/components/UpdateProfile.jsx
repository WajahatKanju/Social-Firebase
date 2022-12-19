import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import "./update.css";
import { profile } from "./defaults";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const {
    update_email,
    update_password,
    currentUser,
    /* Image things*/
    updateProfilePic,
  } = useAuth();
  const [userProfile, setUserProfile] = useState();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleProfileUpdate(evt) {
    updateProfilePic(currentUser.uid, evt.target.files[0]);

    setTimeout(() => {
      getProfilePic(currentUser.uid);
    }, 2000);
  }

  function getProfilePic(user_id) {
    const storage = getStorage();
    const profilePictureRef = ref(storage, `users/${user_id}/images/profile`);
    getDownloadURL(profilePictureRef)
      .then((url) => {
        console.log("Profile Updated");
        setUserProfile(url);
      })
      .catch((error) => {
        // Handle any errors
      });
  }

  getProfilePic(currentUser.uid);
  
  async function handleSubmit(evt) {
    evt.preventDefault();
    if (passwordRef.current.value === confirmPasswordRef.current.value) {
    } else {
      return setError("Password Do not Match");
    }
    const promises = [];
    setError("");
    setLoading(true);
    if (emailRef.current.value !== currentUser.email) {
      promises.push(update_email(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(update_password(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to Update Profile");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Card className="mt-4 p-2">
        <Card.Body>
          <label
            id="profile-pic"
            className="rounded-circle"
            htmlFor="update-profile-pic"
          >
            <Card.Img
              id="pic"
              className="text-center"
              alt="Profile Pic"
              src={userProfile ? userProfile : profile}
            />
          </label>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="d-none">
              <Form.Control
                onChange={handleProfileUpdate}
                type="file"
                id="update-profile-pic"
                accept="image/*"
              />
            </Form.Group>
            <Form.Group className="my-4" id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                defaultValue={currentUser.email}
                type="email"
                ref={emailRef}
              />
            </Form.Group>

            <Form.Group className="my-4" id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="Leave Blank To Keep The Same"
                type="password"
                ref={passwordRef}
              />
            </Form.Group>

            <Form.Group className="my-4" id="confirm-password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                placeholder="Leave Blank To Keep The Same"
                type="password"
                ref={confirmPasswordRef}
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mb-5">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
}

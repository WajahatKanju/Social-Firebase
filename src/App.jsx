import React from "react";
import SignUp from "./components/Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import Navigation from "./components/Navbar";

import './App.css'

function App() {
  return (
    <Container fluid className="text-white">
    <Navigation />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "25rem" }}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<PrivateRoute />}>
                  <Route exact path="/" element={<Dashboard />} />
                  <Route
                    exact
                    path="/update-profile"
                    element={<UpdateProfile />}
                  />
                </Route>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </Container>
  );
}

export default App;

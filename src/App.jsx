import React from "react";
import SignUp from "./components/Signup";
import { Container } from "react-bootstrap";
import {AuthProvider} from "./contexts/AuthContext"

function App() {
  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "25rem" }}>
          <SignUp />
        </div>
      </Container>
      </AuthProvider>
  );
}

export default App;

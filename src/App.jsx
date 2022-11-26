import React, { Component } from "react";

import firebase from "firebase/compat/app";
import firebaseConfig from "./firebaseConfig";

import LoginWithPhone from "./components/LoginWithPhone";
import { NameForm } from "./components/Forms"
import ChatRoom from "./components/ChatRoom";

// import { useAuthState } from "react-firebase-hooks/auth";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    firebase.initializeApp(firebaseConfig);
    this.user = firebase.auth().currentUser
  }
  onComponentDidMount() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        this.user = user;
      } else {
        console.log("User Not Signed In");
      }
    });
  }

  render() {
    return <div>{this.user ? <ChatRoom /> : <LoginWithPhone />}</div>;
    // return <div> <LoginWithPhone /></div>;
  }
}

export default App;

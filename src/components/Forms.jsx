import firebase from "firebase/compat/app";
import firebaseConfig from "../firebaseConfig";
import { getAuth, updateProfile } from "firebase/auth";
import { Component } from "react";
import { auth } from "firebaseui";

export class NameForm extends Component {
  constructor(props){
    super(props)
    this.user = props.user
    this.state = {name: ''};
    this.handleEvent = this.handleEvent.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    const auth = getAuth();

  }

  handleEvent(evt){
    this.setState({name: evt.target.value})
  }
  handleSubmit(evt){
    evt.preventDefault();
    updateProfile(auth.currentUser, {
      displayName: this.state.name
    }).then(() => {
      console.log('Profile Updated')
    }).catch((error) => {
      console.log(`Profile Update Failed An Error Has occurred ${error}`)
    })
  }

  render() {
    console.log(this.user)
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="name" id="input-name" value={this.state.name} onInput={this.handleEvent} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}


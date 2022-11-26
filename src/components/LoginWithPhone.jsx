import { Component } from "react";

import firebase from 'firebase/compat/app'
import firebaseConfig from "../firebaseConfig";
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'



class LoginWithPhone extends Component{
  constructor(props){
    super(props)
    // firebase.initializeApp(firebaseConfig)
    this.ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
  }
  componentDidMount(){
    const uiConfig = {
      signInOptions: [{
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        recaptchaParameters: {
          type: 'image',
          size: 'normal',
          badge: 'bottomleft',
        },
        defaultCountry: 'PK',

      }, {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
      }, {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID
      }],
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          return true;
        }
      },
      signInSuccessUrl: "/"
    };

    this.ui.start('#firebase-ui-auth-container', uiConfig)
  }

  render(){
    return(
      <>
    <div id="firebase-ui-auth-container"></div>
    
      </>
    )
  }
}


export default LoginWithPhone;
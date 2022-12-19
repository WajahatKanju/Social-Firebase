import React, { useContext, useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, updateMetadata } from "firebase/storage";
import { auth } from "../firebaseConfig";

import {
  // getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // Auth Things

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // Image Things, I did image things in the auth cuz i was short one time and was not able to create another context

  const storage = getStorage();

  function signup(username, email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user;
        return updateProfile(auth.currentUser, {
          displayName: username,
        });
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        throw new Error(error.errorMessage);

        // ..
      });
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // Signed in
        const user = res.user;
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        throw new Error(error.errorMessage);

        // ..
      });
  }
  function logout() {
    return signOut(auth)
      .then((res) => {
        // Signed in
        const user = res.user;
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        throw new Error(error.errorMessage);

        // ..
      });
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
      .then((res) => {
        // Signed in
        // const user = res.user;
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        throw new Error(error);
        // ..
      });
  }

  function update_email(email) {
    return updateEmail(auth.currentUser, email)
      .then((res) => {
        // Signed in
        // const user = res.user;
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        throw new Error(error);
      });
  }

  function update_password(password) {
    return updatePassword(auth.currentUser, password)
      .then((res) => {
        // Signed in
        // const user = res.user;
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        throw new Error(error);
      });
  }

  function getProfile() {}

  function updateProfilePic(user_id, image) {
    const profilePictureRef = ref(storage, `users/${user_id}/images/profile`);

    // const metaData = {
    //   contentType: `image/${image.split(".")[1]}`,
    // };

    console.log(image);
    uploadBytes(profilePictureRef, image)
      .then((snapshot) => {
        console.log("image uploaded");
      })
      .catch((error) => {
        console.log("An Error Occurred");
      });
  }


  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    update_email,
    update_password,
    // Images Things
    updateProfilePic,
  };

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

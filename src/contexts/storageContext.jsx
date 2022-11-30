import React, { useContext, useState, useEffect } from "react";

import { getStorage, ref, getDownloadURL } from "firebase/storage";

const StorageContext = React.createContext();

export function useStorage() {
  return useContext(StorageContext);
}

export function StorageProvider({ children }) {

  const [profilePic, setProfilePic] = useState('https://cdn.suwalls.com/wallpapers/animals/giant-panda-33214-2560x1600.jpg');
  const [loading, setLoading] = useState(false);
  const storage = getStorage();



  function getProfile() {
    getDownloadURL(ref(storage, "images/default-profile.png"))
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();

        setProfilePic(url);
        console.log(url)
        setLoading(false);
      })
      .catch((error) => {});
  }

  useEffect(() => {
    setLoading(true);
    console.log('inside effect')
    getProfile() 
  }, []);

  const value = {
    profilePic,
  };

  return (
    <StorageContext.Provider value={{ok: 'this'}}>
      {!loading && children}
    </StorageContext.Provider>
  );
}

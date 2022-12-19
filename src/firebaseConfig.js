import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const app  = initializeApp({
  apiKey: "",
  authDomain: "react-test-335608.firebaseapp.com",
  databaseURL: "https://react-test-335608-default-rtdb.firebaseio.com",
  projectId: "react-test-335608",
  storageBucket: "react-test-335608.appspot.com",
  messagingSenderId: "576704256120",
  appId: "1:576704256120:web:9c6835f32d510dd609b58d",
  measurementId: "G-Q01KE5C9JF"

});

export const auth = getAuth(app);
export default app;
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlWdM3nz51iocnHIN6maKiX7IIH_LoiNw",
  authDomain: "chat-room-54e2c.firebaseapp.com",
  projectId: "chat-room-54e2c",
  storageBucket: "chat-room-54e2c.appspot.com",
  messagingSenderId: "1097193914503",
  appId: "1:1097193914503:web:49f5d8a60ceaabd18af822",
  measurementId: "G-4GB2BF9GZ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

//register user
export const register = (email, password) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    sessionStorage.setItem("userEmail", userCredential.user.email);
    //create user
      
 })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });
}

//login user
export const login = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    sessionStorage.setItem("userEmail", userCredential.user.email);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = errorCode.message;
    console.log(errorMessage);
  });
}
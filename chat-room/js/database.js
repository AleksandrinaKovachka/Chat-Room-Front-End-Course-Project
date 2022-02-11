  // Import the functions you need from the SDKs you need
  import { initializeApp } from 'firebase/app';
  import { getDatabase } from "firebase/database";

  import { getAuth, connectAuthEmulator, signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "firebase/auth";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
 
  export const register = (email, password, username) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //create user
      console.log(userCredential.user);
   })
 }
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push, query, onValue, update, get, child, onChildAdded } from "firebase/database";

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
export const register = (email, password, username) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    createUser(username, email);
    sessionStorage.setItem("userEmail", userCredential.user.email);
 })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });
}

//login user
export const login = async (email, password) => {
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

//create user
const createUser = (username, email) => {
  console.log("new user");
  const dataRefUsers = ref(database, 'users');
  const user = {
    "email": email,
    "username": username,
    "chat-room-names": [{
      "chat-name": "General",
      "unread-message": 0
      }],
    "notification": []
  };
  return push(dataRefUsers, user);
}
//get all users
let userNameArr = [];
const getAllUsers = () => {
  const dataRefUsers = ref(database, 'users');
  onValue(dataRefUsers, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      const element = childData.username;
      userNameArr.push(childData.username); 
    });
    console.log(userNameArr);
  })
}

//get user data with userId
export const getUserData = (email) => {
  console.log("get user data");
  const dataRefUsers = ref(database, 'users');
  onValue(dataRefUsers, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      if (childData.email === email) {
        let userId = childKey;
        let username = childData.username;
        let email = childData.email;
        let chatRoomName = childData["chat-room-names"];
        let chatRoomArr = [];
        chatRoomName.forEach(item => {
          chatRoomArr.push({"chat-name": item["chat-name"], "unread-message": item["unread-message"]});
        })
        let notifArr = [];
        if(childData["notification"]) {
          let notification = childData["notification"];
          notification.forEach(item => {
            notifArr.push(item);
          })
        }

        const userData = {
          "email": email,
          "username": username,
          "chat-room-names": chatRoomArr,
          "notification": notifArr
        };

        sessionStorage.setItem("userData", JSON.stringify(userData));
        sessionStorage.setItem("userId", userId);
        console.log("set to session storage");
      }
    });
  })
}


export const dataRefUsers = ref(database, 'users');

export const createNewRoom = (chatRoomName) => {
  const dataRefRooms = ref(database, 'chat-rooms');
  const chatRoom = {
    "name": chatRoomName,
    "messages": []
  }
  return push(dataRefRooms, chatRoom);
}

export const updateUser = (user, userId) => {
  const dataRefUsers = ref(database, `users/${userId}`);
  return update(dataRefUsers, user);
}

export const dataRefRooms = ref(database, 'chat-rooms');

export const updateChatRoom = (chatRoom, chatId) => {
  const dataRefChat = ref(database, `chat-rooms/${chatId}`);
  return update(dataRefChat, chatRoom);
}

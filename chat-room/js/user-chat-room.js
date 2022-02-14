import { onChildAdded, onChildChanged } from "firebase/database";
import { dataRefUsers, createNewRoom, updateUser } from "./database";  

let inviteNotification = [];
let newRoomName = "";
let userId = "";
let userName = "";
let userEmail = "";
let userRooms = [];

let createRoomModal = document.getElementById("modal-container-create-room");
let createBtn = document.getElementById("create-btn");
let newRoomBtn = document.getElementById("new-room-btn");
let menuDropDown = document.getElementById("invite-dropdown");
let notificationBtn = document.getElementById("dropbtn");
let inviteModal = document.getElementById("modal-container-invite");
let logoutBtn = document.getElementById("logout-btn");
let acceptBtn = document.getElementById("accept-invite");
let declineBtn = document.getElementById("decline-invite");
let inviteChatRoomNameEl = document.getElementById("invite-room-name");

onChildAdded(dataRefUsers, (data) => {
  if (data.val().email === sessionStorage.getItem("userEmail")) {
    userId = data.key;
    userName = data.val().username;
    sessionStorage.setItem("username", userName);
    sessionStorage.setItem("userId", userId);
    userEmail = data.val().email;

    let chatRoomName = data.val()["chat-room-names"];
    chatRoomName.forEach(item => {
      userRooms.push({"chat-name": item["chat-name"], "unread-message": item["unread-message"]});
    })
    
    if(data.val()["notification"]) {
      let notification = data.val()["notification"];
      notification.forEach(item => {
        inviteNotification.push(item);
      })
    }

    document.getElementById("user-name").textContent = userName;
    document.getElementById("notification-number").textContent = inviteNotification.length;

    let chatRooms = document.getElementById("chat-rooms-list");

    userRooms.forEach((item, index) => {
      let li = document.createElement("li");
      li.innerHTML = `<div id="chat-rooms"><button id="chat-room-${index}" class="chat-room-class">${item["chat-name"]}</button><span id="room-new-massage">${item["unread-message"]} new message</span></div>`;
      chatRooms.appendChild(li);

      let chatRoom = document.getElementById(`chat-room-${index}`);
      chatRoom.addEventListener("click", () => {
        //update unread message in user database
        updateChatUnreadMessage(item["chat-name"]);
        sessionStorage.setItem("roomName", item["chat-name"]);
        location.href = "chat-room.html";
      })
    })
  }
})

const updateChatUnreadMessage = (chatName) => {
  userRooms.forEach(item => {
    if(item["chat-name"] === chatName) {
      item["unread-message"] = 0;
    }
  })
  updateRoomsOfUser();
}

onChildChanged(dataRefUsers, (data) => {
  if (data.val().email === sessionStorage.getItem("userEmail")) {
    userId = data.key;
    userName = data.val().username;
    userEmail = data.val().email;

    userRooms = [];
    let chatRoomName = data.val()["chat-room-names"];
    chatRoomName.forEach(item => {
      userRooms.push({"chat-name": item["chat-name"], "unread-message": item["unread-message"]});
    })
    
    inviteNotification = [];
    if(data.val()["notification"]) {
      let notification = data.val()["notification"];
      notification.forEach(item => {
        inviteNotification.push(item);
      })
    }

    document.getElementById("user-name").textContent = userName;
    document.getElementById("notification-number").textContent = inviteNotification.length;

    let chatRooms = document.getElementById("chat-rooms-list");
    chatRooms.innerHTML = "";

    userRooms.forEach((item, index) => {
      let li = document.createElement("li");
      li.innerHTML = `<div id="chat-rooms"><button id="chat-room-${index}" class="chat-room-class">${item["chat-name"]}</button><span id="room-new-massage">${item["unread-message"]} new message</span></div>`;
      chatRooms.appendChild(li);

      let chatRoom = document.getElementById(`chat-room-${index}`);
      chatRoom.addEventListener("click", () => {
        sessionStorage.setItem("roomName", item["chat-name"]);
        updateChatUnreadMessage(item["chat-name"]);
        location.href = "chat-room.html";
      })
    })
  }
})

window.addEventListener("click", (event) => {
  if (event.target == createRoomModal) {
    createRoomModal.style.display = "none";
  } else if (event.target == inviteModal) {
    inviteModal.style.display = "none";
  }
})

createBtn.addEventListener("click", () => {
  createRoomModal.style.display = "block";
})

newRoomBtn.addEventListener("click", () => {
  newRoomName = document.getElementById("create-room-name").value;
  document.getElementById("create-room-name").value = "";
  createRoomModal.style.display = "none";
  userRooms.push({
    "chat-name": newRoomName,
    "unread-message": 0
  })
  updateRoomsOfUser();
  //create new rooms
  createNewRoom(newRoomName);
  //listen for update in user rooms - update user chatNames with room names
})

const updateRoomsOfUser = () => {
  const updateUserData = {
    "username": userName,
    "email": userEmail,
    "chat-room-names": userRooms,
    "notification": inviteNotification
  }
  updateUser(updateUserData, userId);
}

notificationBtn.addEventListener("click", () => {
  if(menuDropDown.style.display == "none" && inviteNotification.length !== 0) {
    let listOfNotification = document.getElementById("list-notification");
    listOfNotification.innerHTML = "";
    inviteNotification.forEach((item, index) => {
      let li = document.createElement("li");
      li.innerHTML = `<button id="invite-btn-${index}" class="invite-btn-class">${item}</button>`;
      listOfNotification.appendChild(li);

      let inviteBtn = document.getElementById(`invite-btn-${index}`);
      inviteBtn.addEventListener("click", () => {
        newRoomName = item;
        menuDropDown.style.display = "none";
        
        inviteModal.style.display = "block";
        inviteChatRoomNameEl.textContent = item;
      })
    })

    menuDropDown.style.display = "block";

  } else {
    menuDropDown.style.display = "none";
  }
})

logoutBtn.addEventListener("click", () => {
  sessionStorage.clear();
  location.href = "login.html";
})

acceptBtn.addEventListener("click", () => {
  inviteModal.style.display = "none"
  // remove this invite
  removeInvite();
  //remove from array - from database
  userRooms.push({
    "chat-name": newRoomName,
    "unread-message": 0
  })
  updateRoomsOfUser();
})

declineBtn.addEventListener("click", () => {
  inviteModal.style.display = "none"
  //remove this invite
  removeInvite();
  //remove from array - from database
  updateRoomsOfUser();
})

const removeInvite = () => {
  let position;
  inviteNotification.forEach((item, index) => {
    if(item === newRoomName) {
      position = index;
    }
  })

  inviteNotification.splice(position, 1);
}
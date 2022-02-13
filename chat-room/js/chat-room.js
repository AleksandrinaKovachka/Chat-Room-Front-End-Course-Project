import { onChildAdded, onChildChanged } from "firebase/database";
import { dataRefRooms, dataRefUsers, updateChatRoom, updateUser } from "./database";

let usersData = [];
let usersName = []; //get all users
let msgArr = [];
const chatName = sessionStorage.getItem("roomName");
let chatId = "";

let inviteUserModal = document.getElementById("modal-container-invite-users");
let inviteUserBtn = document.getElementById("invite-user");
let messageInput = document.getElementById("msg-input");
let sendMsgBtn = document.getElementById("send-msg-btn");
let chatNameComponent = document.getElementById("chat-name").textContent = chatName;

onChildAdded(dataRefUsers, (data) => {
  //get users that are not in this room - save to users array
  const userData = data;
  let hasChatRoom = false;
    const userDataVal = userData.val();
    let userId = userData.key;
    let username = userDataVal.username;
    let email = userDataVal.email;
    let chatRoomName = userDataVal["chat-room-names"];
    let chatRoomArr = [];
    chatRoomName.forEach(item => {
      if(item["chat-name"] === chatName) {
        hasChatRoom = true;
      }
      chatRoomArr.push({"chat-name": item["chat-name"], "unread-message": item["unread-message"]});
    })
    let notifArr = [];
    if(userDataVal["notification"]) {
      let notification = userDataVal["notification"];
      notification.forEach(item => {
        notifArr.push(item);
      })
    }

    const userDataToAdd = {
      "userId": userId,
      "email": email,
      "username": username,
      "chat-room-names": chatRoomArr,
      "notification": notifArr
    };

    if(!hasChatRoom) {
      usersName.push(username);
    } 
    usersData.push(userDataToAdd);
})

onChildChanged(dataRefUsers, (data) => {
  usersData = [];
  let hasChatRoom = false;
  const userData = data;
    const userDataVal = userData.val();
    let userId = userData.key;
    let username = userDataVal.username;
    let email = userDataVal.email;
    let chatRoomName = userDataVal["chat-room-names"];
    let chatRoomArr = [];
    chatRoomName.forEach(item => {
      if(item["chat-name"] === chatName) {
        hasChatRoom = true;
      }
      chatRoomArr.push({"chat-name": item["chat-name"], "unread-message": item["unread-message"]});
    })
    let notifArr = [];
    if(userDataVal["notification"]) {
      let notification = userDataVal["notification"];
      notification.forEach(item => {
        notifArr.push(item);
      })
    }

    const userDataToAdd = {
      "userId": userId,
      "email": email,
      "username": username,
      "chat-room-names": chatRoomArr,
      "notification": notifArr
    };

    if(!hasChatRoom) {
      usersName.push(username);
    } 
    usersData.push(userDataToAdd);
})

onChildAdded(dataRefRooms, (data) => {
  if (data.val().name === sessionStorage.getItem("roomName")) {
    chatId = data.key;
    if(data.val()["messages"]) {
      let messageArr = data.val()["messages"];
      messageArr.forEach(item => {
        msgArr.push({"username": item["username"], "date": item["date"], "message": item["message"]});
      })
    }

    let msgList = document.getElementById("msg-list");

    msgArr.forEach(item => {
      let li = document.createElement("li");
      li.innerHTML = `
      <div id="msg">
        <div id="msg-info">
          <span id="sender" class="msg-inf-color">${item["username"]}</span>
          <span id="sending-date" class="msg-inf-color">${new Date(item["date"]).toLocaleString()}</span>
        </div>
        <p id="message">${item["message"]}</p>
      </div>`;
      msgList.appendChild(li);
    })
    
  }
})

onChildChanged(dataRefRooms, (data) => {
  msgArr = [];
  if (data.val().name === sessionStorage.getItem("roomName")) {
    chatId = data.key;
    if(data.val()["messages"]) {
      let messageArr = data.val()["messages"];
      messageArr.forEach(item => {
        msgArr.push({"username": item["username"], "date": item["date"], "message": item["message"]});
      })
    }

    let msgList = document.getElementById("msg-list");
    msgList.innerHTML = "";

    msgArr.forEach(item => {
      let li = document.createElement("li");
      li.innerHTML = `
      <div id="msg">
        <div id="msg-info">
          <span id="sender" class="msg-inf-color">${item["username"]}</span>
          <span id="sending-date" class="msg-inf-color">${new Date(item["date"]).toLocaleString()}</span>
        </div>
        <p id="message">${item["message"]}</p>
      </div>`;
      msgList.appendChild(li);
    })
    
  }
})

window.addEventListener("click", (event) => {
  if (event.target == inviteUserModal) {
    inviteUserModal.style.display = "none";
  }
})

sendMsgBtn.addEventListener("click", () => {
  //save message to chat room - update message
  msgArr.push({"username": sessionStorage.getItem("username"), "date": Date.now(), "message": messageInput.value});
  const chatRoom = {
    "name": chatName,
    "messages": msgArr
  }
  updateChatRoom(chatRoom, chatId);

  //change number of unread mmessage to all users in this room
  usersData.forEach(user => {
    user["chat-room-names"].forEach(item => {
      if(item["chat-name"] === chatName) {
        item["unread-message"] += 1;

        if(user["email"] === sessionStorage.getItem("userEmail")) {
          console.log("I am");
          item["unread-message"] = 0;
        }
      }
    })

    const userDataToUpdate = {
      "email": user.email,
      "username": user.username,
      "chat-room-names": user["chat-room-names"],
      "notification": user["notification"]
    };

    updateUser(userDataToUpdate, user["userId"]);
  })

  messageInput.value = "";
})

inviteUserBtn.addEventListener("click", () => {
  let listOfUsers = document.getElementById("user-list");
  listOfUsers.innerHTML = "";
  usersName.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
    <div id="invite-user-box">
      <p id="user-name">${item}</p>
      <button id="invite-btn-${index}" class="invite-btn-class">Invite</button>
    </div>`;
    listOfUsers.appendChild(li);

    let inviteBtn = document.getElementById(`invite-btn-${index}`);
    inviteBtn.addEventListener("click", () => {
      //get username - added invite to this user
      usersData.forEach(user => {
        if(user.username === item && user["userId"] != sessionStorage.getItem("userId")) {
          //update notification of this user
          user["notification"].push(chatName);
          const userDataToUpdate = {
            "email": user.email,
            "username": user.username,
            "chat-room-names": user["chat-room-names"],
            "notification": user["notification"]
          };

          updateUser(userDataToUpdate, user.userId);
        }
      })
      // usersName.splice(index, 1);

      inviteUserModal.style.display = "none";
    })
  })

  document.getElementById("chat-name-modal").textContent = sessionStorage.getItem("roomName");
  inviteUserModal.style.display = "block";
})



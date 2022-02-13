import { onChildAdded, onChildChanged } from "firebase/database";
import { dataRefRooms, dataRefUsers, updateUser } from "./database";  

// get all rooms from database - username is on session storage

let rooms = [];
let userData = [];

onChildAdded(dataRefUsers, (data) => {
  if (data.val().email === sessionStorage.getItem("userEmail")) {
    const userId = data.key;
    const userName = data.val().username;
    const userEmail = data.val().email;

    let userRooms = [];
    let chatRoomName = data.val()["chat-room-names"];
    chatRoomName.forEach(item => {
      userRooms.push({"chat-name": item["chat-name"], "unread-message": item["unread-message"]});
    })
    
    let inviteNotification = [];
    if(data.val()["notification"]) {
      let notification = data.val()["notification"];
      notification.forEach(item => {
        inviteNotification.push(item);
      })
    }

    userData = {
        "userId": userId,
        "email": userEmail,
        "username": userName,
        "chat-room-names": userRooms,
        "notification": inviteNotification
    };
  }
})

onChildChanged(dataRefUsers, (data) => {
  if (data.val().email === sessionStorage.getItem("userEmail")) {
    const userId = data.key;
    const userName = data.val().username;
    const userEmail = data.val().email;

    let userRooms = [];
    let chatRoomName = data.val()["chat-room-names"];
    chatRoomName.forEach(item => {
      userRooms.push({"chat-name": item["chat-name"], "unread-message": item["unread-message"]});
    })
    
    let inviteNotification = [];
    if(data.val()["notification"]) {
      let notification = data.val()["notification"];
      notification.forEach(item => {
        inviteNotification.push(item);
      })
    }

    userData = {
        "userId": userId,
        "email": userEmail,
        "username": userName,
        "chat-room-names": userRooms,
        "notification": inviteNotification
    };
  }
})

onChildAdded(dataRefRooms, (data) => {
    let messageCount = data.val()["messages"] ? data.val()["messages"].lenght : 0;

    rooms.push({"chat-name": data.val().name, "unread-message": messageCount});

    let roomlist = document.getElementById("chat-rooms-list");

    let buttonText = "Add";
    let isDisable = "";
    userData["chat-room-names"].forEach(chatData => {
        if(chatData["chat-name"] === data.val().name) {
            buttonText = "Added";
            isDisable = "disabled";
        }
    })
    let li = document.createElement("li");
    li.innerHTML = `
    <div id="chat-room">
        <p id="room-name">${data.val().name}</p>
        <button id="add-room-${data.val().name}" class="add-room-class" ${isDisable}>${buttonText}</button>
    </div>`;
    roomlist.appendChild(li);

    let addRoomBtn = document.getElementById(`add-room-${data.val().name}`);
    addRoomBtn.addEventListener("click", () => {
        userData["chat-room-names"].push({"chat-name": data.val().name, "unread-message": messageCount});
        const userDataToUpdate = {
            "email": userData.email,
            "username": userData.username,
            "chat-room-names": userData["chat-room-names"], //new room
            "notification": userData["notification"]
          };
      
        updateUser(userDataToUpdate, userData["userId"]);

        addRoomBtn.textContent = "Added";
        addRoomBtn.disabled = true;
    })
})

onChildChanged(dataRefRooms, (data) => {
    rooms = [];
    let messageCount = data.val()["messages"] ? data.val()["messages"].lenght : 0;

    rooms.push({"chat-name": data.val().name, "unread-message": messageCount});

    let roomlist = document.getElementById("chat-rooms-list");

    let buttonText = "Add";
    let isDisable = "";
    userData["chat-room-names"].forEach(chatData => {
        if(chatData["chat-name"] === data.val().name) {
            buttonText = "Added";
            isDisable = "disabled";
        }
    })
    let li = document.createElement("li");
    li.innerHTML = `
    <div id="chat-room">
        <p id="room-name">${data.val().name}</p>
        <button id="add-room-${data.val().name}" class="add-room-class" ${isDisable}>${buttonText}</button>
    </div>`;
    roomlist.appendChild(li);

    let addRoomBtn = document.getElementById(`add-room-${data.val().name}`);
    addRoomBtn.addEventListener("click", () => {
        userData["chat-room-names"].push({"chat-name": data.val().name, "unread-message": messageCount});
        const userDataToUpdate = {
            "email": userData.email,
            "username": userData.username,
            "chat-room-names": userData["chat-room-names"], //new room
            "notification": userData["notification"]
          };
      
        updateUser(userDataToUpdate, userData["userId"]);

        addRoomBtn.textContent = "Added";
        addRoomBtn.disabled = true;
    })
})
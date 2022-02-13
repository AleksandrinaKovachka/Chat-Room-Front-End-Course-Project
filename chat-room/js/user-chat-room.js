// (function main () {
//     window.onload = (event) => {
//         const createBtn = document.querySelector(".create-btn");
//         createBtn.addEventListener('click', createRoom);
//     };
// })();

// function createRoom() {
//     const createRoomTemplate = `
//         <section>
//             <header>
//                 <h3>Create Room</h3>
//             </header>
//             <main>
//                 <div>
//                 <p>Name of the new room:</p>
//                 <input type="Name of Room..." name="room-name" id="room-name">
//                 </div>
//                 <div>
//                     <a href="user-chat-room.html">Create Room</a>
//                 </div>
//             </main>
//         </section>`;

//     const modalContainer = document.querySelector("#modal-container");
//     modalContainer.innerHTML = createRoomTemplate;
//     modalContainer.classList.remove('hidden');
// }

// const inviteNotification = ["Invite1", "Invite2"];

//modal for create new room
// Get the modal
// let modal = document.getElementById("modal-container");

// Get the button that opens the modal
// let btn = document.getElementById("create-btn");

// // Get the <span> element that closes the modal
// let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
// btn.onclick = function() {
//   console.log("modal")
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   } else if (event.target == inviteModal) {
//     inviteModal.style.display = "none";
//   }
// }

//get name of the room from modal - not working
// let newRoomBtn = document.getElementById("new-room-btn");
// newRoomBtn.onclick = function () {
//     let newRoomName = document.getElementById("room-name").attribute;
//     console.log(newRoomBtn);
// }

// let menuDropDown = document.getElementById("invite-dropdown");
// let notificationBtn = document.getElementById("dropbtn");
// let inviteBtn = document.getElementById("invite-btn");
//check if have notification - open only when have notification
// notificationBtn.onclick = function() {
//   console.log("dropdown");
//   if(menuDropDown.style.display == "none") {
//     menuDropDown.style.display = "block";
//   } else {
//     menuDropDown.style.display = "none";
//   }
// }

// let inviteModal = document.getElementById("modal-container-invite");
// inviteBtn.onclick = function() {
//   menuDropDown.style.display = "none";
//   inviteModal.style.display = "block";
// }

  
  // Close the dropdown if the user clicks outside of it
  // window.onclick = function(event) {
  //   console.log("drop down btn")
  //   let menuDropDown = document.getElementById("invite-dropdown");
  //   if(event.target == menuDropDown) {
  //     console.log("here")
  //     menuDropDown.style.display = "none";
  //   }
    // if (!event.target.matches('.dropbtn')) {
    //   var dropdowns = document.getElementsByClassName("dropdown-content");
    //   var i;
    //   for (i = 0; i < dropdowns.length; i++) {
    //     var openDropdown = dropdowns[i];
    //     if (openDropdown.classList.contains('show')) {

    //       openDropdown.classList.remove('show');
    //     }
    //   }

    // }
  // }

import { getUserData } from "./database";

let inviteNotification = ["TRoom", "KRoom", "yRoom"];
let newRoomName = "";
let numberOfNotification = inviteNotification.length;
let userName;
let userRooms = [["General", 25], ["Room1", 2], ["Room2", 10], ["Room3", 25]];

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

window.onload = (event) => {
  getDataForPage();
  setDataToPage();
}

const getDataForPage = () => {
  console.log("database");
  // getUserData(sessionStorage.getItem("userEmail")).then(() => {
  //   userName = sessionStorage.getItem("username");
  //   inviteNotification = JSON.parse(sessionStorage.getItem("chat-room-names"));
  //   console.log(inviteNotification);
  //   userRooms = JSON.parse(sessionStorage.getItem("notification"));
  //   console.log(userRooms);
  // });

  userName = sessionStorage.getItem("username");
  inviteNotification = JSON.parse(sessionStorage.getItem("chat-room-names"));
  console.log(inviteNotification);
  userRooms = JSON.parse(sessionStorage.getItem("notification"));
  console.log(userRooms);
}

const setDataToPage = () => {
  console.log("after database");
  document.getElementById("user-name").textContent = userName;
  document.getElementById("notification-number").textContent = inviteNotification.length;

  //get rooms from database
  let chatRooms = document.getElementById("chat-rooms-list");
  userRooms.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML = `<div id="chat-rooms"><button id="chat-room-${index}" class="chat-room-class">${item["chat-name"]}</button><span id="room-new-massage">${item["unread-message"]} new massage</span></div>`;
    chatRooms.appendChild(li);

    let chatRoom = document.getElementById(`chat-room-${index}`);
    chatRoom.addEventListener("click", () => {
      //get name of the room - update unread message to 0 (in the database)
      sessionStorage.setItem("roomName", item["chat-name"]);
      location.href = "chat-room.html";
    })
  })
}

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
  //update rooms
  console.log(newRoomName);
})

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
  console.log("accept");
  inviteModal.style.display = "none"
  //remove from array - from database
})

declineBtn.addEventListener("click", () => {
  console.log("decline");
  inviteModal.style.display = "none"
  //remove from array - from database
})
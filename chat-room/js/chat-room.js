const users = ["Name1", "Name2"];
const msgArr = [["User1", "10.02.2022 22:20", "some messsage"], ["User2", "10.02.2022 22:21", "some messsage"], ["User3", "10.02.2022 22:22", "some messsage"]];

let inviteUserModal = document.getElementById("modal-container-invite-users");
let inviteUserBtn = document.getElementById("invite-user");
let messageInput = document.getElementById("msg-input");
let sendMsgBtn = document.getElementById("send-msg-btn");
let chatName = document.getElementById("chat-name").textContent = sessionStorage.getItem("roomName");

window.onload = event => {
  let msgList = document.getElementById("msg-list");

  msgArr.forEach(item => {
    let li = document.createElement("li");
    li.innerHTML = `
    <div id="msg">
      <div id="msg-info">
        <span id="sender" class="msg-inf-color">${item[0]}</span>
        <span id="sending-date" class="msg-inf-color">${item[1]}</span>
      </div>
      <p id="message">${item[2]}</p>
    </div>`;
    msgList.appendChild(li);
  })

}

window.addEventListener("click", (event) => {
  if (event.target == inviteUserModal) {
    inviteUserModal.style.display = "none";
  }
})

sendMsgBtn.addEventListener("click", () => {
  //save message to chat room - update message
  console.log(messageInput.value);
  // msgArr.push([sessionStorage.getItem("username"), Date.now(), messageInput.value]);
  messageInput.value = "";
})

inviteUserBtn.addEventListener("click", () => {
  let listOfUsers = document.getElementById("user-list");
  listOfUsers.innerHTML = "";
  //get users from database
  users.forEach((item, index) => {
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
      console.log(item);
      users.splice(index, 1);

      inviteUserModal.style.display = "none";
    })
  })

  document.getElementById("chat-name-modal").textContent = sessionStorage.getItem("roomName");
  inviteUserModal.style.display = "block";
})



const users = ["Name1", "Name2"];
let inviteUserModal = document.getElementById("modal-container-invite-users");
let inviteUserBtn = document.getElementById("invite-user");

let sendMsgBtn = document.getElementById("send-msg-btn");

sendMsgBtn.addEventListener("click", () => {
    console.log("test");
})

inviteUserBtn.addEventListener("click", () => {
    console.log("modal");
    let listOfUsers = document.getElementById("user-list");
    listOfUsers.innerHTML = "";
    users.forEach(item => {
      let li = document.createElement("li");
      li.innerHTML = `<div>
      <p id="user-name">${item}</p>
      <button id="invite-btn">Invite</button>
    </div>`;
      listOfUsers.appendChild(li);
    })

    inviteUserModal.style.display = "block";
})
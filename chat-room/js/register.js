const registerBtn = document.getElementById("register-btn");
let userEmail = document.getElementById("email");
let userPassword = document.getElementById("password");
let firstUserName = document.getElementById("first-name");
let secondUserName = document.getElementById("second-name");

registerBtn.addEventListener("click", () => {
    console.log('Test');
    // if(userEmail.value === "" || userPassword.value === "" || firstUserName.value === "" || secondUserName.value === "") {
    //     alert("Input correct email, name or password");
    // } else {
    //     //check if have this user - alert
    //     //if register success - go to user chat room
    //     localStorage.setItem("username", firstUserName + secondUserName);
    //     location.href = "user-chat-room.html";
    // }

    localStorage.setItem("username", firstUserName + secondUserName);
    location.href = "user-chat-room.html";
})

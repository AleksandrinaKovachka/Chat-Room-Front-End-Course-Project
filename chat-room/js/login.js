const loginForm = document.getElementById("login-form");
let userEmail = document.getElementById("username-email");
let userPassword = document.getElementById("password");

loginForm.addEventListener("submit", (event) => {
    let formData = new FormData(event.target)
    // if(userEmail.value === "" || userPassword.value === "") {
    //     alert("Input correct email or password");
    // } else {
    //     //check if have this user with correct password
    //     //if have the user get user name
    //     // localStorage.setItem("username", username);

    //     //go to user chat room
    //     console.log("new page")
    //     window.location.href = "user-chat-room.html";
    // }
    event.preventDefault()
 
    const email = formData.get('email')
    const password = formData.get('password')
    
    if(email == "akovachka@expert.ai" && password == "ASDASD") {
        location.href = "user-chat-room.html";
    }
    else {
        alert("Wrong credentials")
    }
})
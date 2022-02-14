import { login } from "./database";

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (event) => {
    let formData = new FormData(event.target);
    event.preventDefault();
 
    const email = formData.get('email');
    const password = formData.get('password');

    let validUser;
    sessionStorage.clear();

    login(email, password).then(() => {
        validUser = sessionStorage.getItem("userEmail");
        if (validUser) {
            location.href = "user-chat-room.html";
        } else {
            alert("Wrong credentials");
        }
    })
})
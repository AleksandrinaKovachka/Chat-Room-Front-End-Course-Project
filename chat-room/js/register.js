import { database } from "./db-test";

const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", (event) => {
    console.log("test");
    let formData = new FormData(event.target);
    event.preventDefault();
 
    const email = formData.get('email');
    const username = formData.get('first-name') + formData.get('second-name');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');
    
    if(password === confirmPassword) {
        //check if have user with this email
        sessionStorage.setItem("username", username)
        location.href = "user-chat-room.html";
    }
    else {
        alert("Wrong credentials")
    }
})

const dataRef = ref(database, "users");

set (dataRef, {
    "a": "b"
})

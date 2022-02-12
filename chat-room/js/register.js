import { register } from "./database";

const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", (event) => {
    let formData = new FormData(event.target);
    event.preventDefault();
 
    const email = formData.get('email');
    const username = formData.get('first-name') + formData.get('second-name');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');
    
    if(password === confirmPassword) {
        // sessionStorage.setItem("username", username)

        let validUser;
        sessionStorage.clear();
        register(email, password).then(() => {
          validUser = sessionStorage.getItem("userEmail");
          if (validUser) {
              location.href = "user-chat-room.html";
          } else {
              alert("Wrong credentials");
          }
        })

        // location.href = "user-chat-room.html";
    }
    // else {
    //     alert("Wrong credentials")
    // }
})

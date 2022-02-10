const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (event) => {
    let formData = new FormData(event.target);
    event.preventDefault();
 
    const username = formData.get('username');
    const password = formData.get('password');
    
    if(username == "akovachka@expert.ai" && password == "ASDASD") {
        sessionStorage.setItem("username", username);
        location.href = "user-chat-room.html";
    }
    else {
        alert("Wrong credentials");
    }
})
// get all rooms from database - username is on session storage

const rooms = ["Room1", "Room2", "Room3"];

window.onload = event => {
    let roomlist = document.getElementById("chat-rooms-list");

    rooms.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = `
        <div id="chat-room">
            <p id="room-name">${item}</p>
            <button id="add-room">Add</button>
        </div>`;
        roomlist.appendChild(li);

        let addRoomBtn = document.getElementById("add-room");
        addRoomBtn.addEventListener("click", () => {
            //added to rooms of the user - get the name of room
            console.log("added");
        })
    })
}
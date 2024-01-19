const roomCardSection = document.getElementById("home");

// consts for add room
const addRoomDialog = document.getElementById("add-room-dialog");
const addRoomForm = document.querySelector("#add-room-dialog > form");
const arOpenBtn = document.getElementById("add-room-btn");
const arSubmitBtn = document.getElementById("ar-submit");
const arCancelBtn = document.getElementById("ar-cancel");

// consts for remove room
const removeRoomDialog = document.getElementById("remove-room-dialog");
const rrSubmitBtn = document.getElementById("rr-remove");
const rrCancelBtn = document.getElementById("rr-cancel");

function auth_user() {
  let user_id = localStorage.getItem("user_id")
  if (user_id == null) {
    let user_id = crypto.randomUUID();
    localStorage.setItem("user_id", user_id);
  }
}

function appendRoomToHome(rooms) {
  rooms["room"].forEach((room) => {
    const room_card = document.createElement("div");
    room_card.classList.add("room-card");
    room_card.id = room["room_id"];
    if (room["owner"]) {
      room_card.innerHTML = `<div class="rc-remove-btn text-button" onclick="openRemoveRoomDialog(${room["room_id"]})">remove</div>`
    }
    room_card.innerHTML += `
      <img class="rc-img" src="https://picsum.photos/256/144" loading="lazy">
      <div class="rc-dist rc-info">
        <p>distance: </p>
        <p>${room["dist"]} Km</p>
      </div>
      <div class="rc-address rc-info">
        <p>address: </p>
        <address>${room["addr"]}</address>
      </div>
      <div class="rc-telephone rc-info">
        <p>telephone: </p>
        <a href="tel:${room["tele"]}" target="_blank">${room["tele"]}</a>
      </div>
    `;

    roomCardSection.appendChild(room_card);
  });
}

async function getAllRooms() {
  const response = await fetch(api_url);
  const rooms = await response.json();

  appendRoomToHome(rooms);
}

auth_user();
const api_url = `https://rooms245-api.onrender.com/room/${localStorage.getItem("user_id")}`
getAllRooms();

// add room
arOpenBtn.addEventListener("click", () => { addRoomDialog.showModal(); });
arCancelBtn.addEventListener("click", () => { addRoomDialog.close(); });

arSubmitBtn.addEventListener("click", async () => {
  const form_data = new FormData(addRoomForm);
  const room_data = {
    "room_id": Date.now(),
    "dist": form_data.get("dist"),
    "addr": form_data.get("addr"),
    "tele": form_data.get("tele")
  };

  const response = await fetch(api_url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(room_data)
  });

  const new_room = await response.json();
  appendRoomToHome(new_room); // function from ./list_rooms.js
  addRoomDialog.close();
});

// remove rooms
function openRemoveRoomDialog(room_id) {
  removeRoomDialog.setAttribute("room_id", room_id);
  removeRoomDialog.showModal();
}

rrCancelBtn.addEventListener("click", () => { removeRoomDialog.close(); });

rrSubmitBtn.addEventListener("click", async () => {
  const remove_data = {
    "room_id": removeRoomDialog.getAttribute("room_id"),
  }

  const response = await fetch(api_url, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(remove_data)
  });

  const status = await response.json();
  if (status["room"]) {
    roomCardSection.removeChild(document.getElementById(removeRoomDialog.getAttribute("room_id")));
  }

  removeRoomDialog.close();
});

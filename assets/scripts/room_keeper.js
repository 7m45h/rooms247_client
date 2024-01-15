const main = document.querySelector("main");
const addBtn = document.getElementById("add-btn");
const addRoomDialog = document.querySelector("#add-room");
const removeRoomDialog = document.querySelector("#remove-room");
const addRoomForm = document.querySelector("#add-room form");
const removeRoomFrom = document.querySelector("#remove-room form");
const delKeyHolder = document.querySelector("#add-room #delkey-holder");
const roomIdHolder = document.querySelector("#remove-room #room-id");
const delRoomStatus = document.querySelector("#remove-room #del-status");
const addRoomDialogCloseBtn = document.querySelector("#add-room button");
const removeRoomDialogCloseBtn = document.querySelector("#remove-room button")

const magic_number = 10000

const api_url = "https://rooms245-api.onrender.com/room";

// update room list
function list_newRoom(rooms) {
  rooms["room"].forEach((room) => {
    const card = document.createElement("div");
    card.classList.add("room-card");
    card.innerHTML = `
      <button onclick="showRemoveDialog(${room["id"]})">x</button>
      <div>
        <a href="https://picsum.photos/" target="_blank">
          <img src="https://picsum.photos/256/144?random=${Math.round(Math.random() * magic_number)}">
        </a>
        <p>${room["dist"]} Km</p>
        <address>${room["addr"]}</address>
        <a href="tel:${room["tele"]}">${room["tele"]}</a>
      </div>
    `
    main.appendChild(card);
  });
}

// handle add button
addBtn.addEventListener("click", () => {
  addRoomDialog.showModal();
});

addRoomDialogCloseBtn.addEventListener("click", () => {
  addRoomDialog.close();
  delKeyHolder.textContent = "delete key: ";
});

// handle remove button
function showRemoveDialog(roomId) {
  removeRoomDialog.setAttribute("room-id", roomId);
  roomIdHolder.textContent += roomId;
  removeRoomDialog.showModal();
}

removeRoomDialogCloseBtn.addEventListener("click", () => {
  removeRoomDialog.close();
  roomIdHolder.textContent = "room id: ";
  delRoomStatus.textContent = "status: None";
  removeRoomDialog.removeAttribute("room-id");
});

// handle addRoomForm
addRoomForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  let data = new FormData(addRoomForm);
  data = {
    "id": Date.now(),
    "dist": data.get("dist"),
    "addr": data.get("addr"),
    "tele": data.get("tel"),
    "del_key": Math.round(Math.random() * magic_number)
  };

  const response = await fetch(api_url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });
  const new_room = await response.json();

  addRoomForm.reset();
  delKeyHolder.textContent = "delete key: ";
  delKeyHolder.textContent += data["del_key"];

  list_newRoom(new_room);
});

removeRoomFrom.addEventListener("submit", async (event) => {
  event.preventDefault();

  let data = new FormData(removeRoomFrom);
  data = {
    "id": removeRoomDialog.getAttribute("room-id"),
    "del_key": data.get("del-key")
  };

  const response = await fetch(api_url, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });

  const status = await response.json();
  if (status["room"]) {
    delRoomStatus.textContent = "status: success";
  } else if (status["error"]) {
    delRoomStatus.textContent = `status: ${status["error"]}`;
  } else {
    delRoomStatus.textContent = "status: error";
  }

  removeRoomFrom.reset();
});

async function get_allRooms() {
  const response = await fetch(api_url);
  const rooms = await response.json();

  list_newRoom(rooms);
}

get_allRooms();

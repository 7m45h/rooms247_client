const main = document.querySelector("main");
const addBtn = document.getElementById("add-btn");
const dialog = document.querySelector("dialog");
const form = document.querySelector("dialog form");
const closeBtn = document.querySelector("dialog button");

const magic_number = 10000

const api_url = "https://rooms245-api.onrender.com/room";

// update room list
function list_newRoom(rooms) {
  rooms["room"].forEach((room) => {
    const card = document.createElement("div");
    card.classList.add("room-card");
    card.innerHTML = `
      <button>x</button>
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
  dialog.showModal();
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});

// handle form
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  let data = new FormData(form);
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

  dialog.close();
  form.reset();

  list_newRoom(new_room);
});

async function get_allRooms() {
  const response = await fetch(api_url);
  const rooms = await response.json();

  list_newRoom(rooms);
}

get_allRooms();

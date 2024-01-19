const addRoomDialog = document.getElementById("add-room-dialog");
const arOpenBtn = document.getElementById("add-room-btn");
const arCancelBtn = document.getElementById("ar-cancel");

arOpenBtn.addEventListener("click", () => {
  addRoomDialog.showModal();
});

arCancelBtn.addEventListener("click", () => {
  addRoomDialog.close();
});

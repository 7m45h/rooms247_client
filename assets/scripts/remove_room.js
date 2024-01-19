const removeRoomDialog = document.getElementById("remove-room-dialog");
const rrCancelBtn = document.getElementById("rr-cancel");

function openRemoveRoomDialog() {
  removeRoomDialog.showModal();
}

rrCancelBtn.addEventListener("click", () => {
  removeRoomDialog.close();
});

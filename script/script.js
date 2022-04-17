let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closePopupButton = document.querySelector(".popup__close-button");

editButton.addEventListener("click", function () {
  setActivePopup("block");
});

closePopupButton.addEventListener("click", function () {
  setActivePopup("none");
});

function setActivePopup(isActive) {
  popup.style.display = isActive;
}

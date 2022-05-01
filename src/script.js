let condition = "";
const editBtn = document.querySelector(".profile__edit-button");
const photoAddBtn = document.querySelector(".profile__add-button");
const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".popup__close-button");
const closePhotoBtn = document.querySelector(".photo-popup__close-button");
const formElement = document.querySelector(".popup__form");
const titleInput = document.querySelector("#name");
const descriptionInput = document.querySelector("#role");
const nameValue = document.querySelector(".profile__name");
const roleValue = document.querySelector(".profile__role");
const cardTemplate = document.querySelector("#element-template").content;
const elements = document.querySelector(".elements");
const saveBtn = document.querySelector(".popup__save-button");
const photoPopup = document.querySelector(".photo-popup");
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

setDefaultCard();

editBtn.addEventListener("click", () => {
  condition = "profile";
  showPopup();
});

photoAddBtn.addEventListener("click", () => {
  condition = "photo";
  showPopup();
});

closeBtn.addEventListener("click", closePopup);
closePhotoBtn.addEventListener("click", closePhoto);
function setData() {
  const header = document.querySelector(".popup__header");

  if (condition === "profile") {
    header.textContent = "Редактировать профиль";
    titleInput.value = nameValue.textContent;
    descriptionInput.value = roleValue.textContent;
    saveBtn.textContent = "Сохранить";
  }

  if (condition === "photo") {
    header.textContent = "Новое место";
    titleInput.value = "";
    descriptionInput.value = "";
    titleInput.placeholder = "Название";
    descriptionInput.placeholder = "Ссылка на картинку";
    saveBtn.textContent = "Создать";
  }
}

formElement.addEventListener("submit", formSubmitHandler);

function formSubmitHandler(evt) {
  evt.preventDefault();
  if (condition === "profile") {
    nameValue.textContent = titleInput.value;
    roleValue.textContent = descriptionInput.value;
  }
  if (condition === "photo") {
    addNewCard(titleInput.value, descriptionInput.value);
  }

  closePopup();
}

function closePopup() {
  popup.classList.remove("popup_visible");
}

function closePhoto() {
  photoPopup.classList.remove("photo-popup_visible");
}

function showPopup() {
  popup.classList.add("popup_visible");
  setData();
}

function setDefaultCard() {
  initialCards.forEach((item) => {
    addNewCard(item.name, item.link);
  });
}

function addNewCard(title, imgSrc) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  cardElement.querySelector(".element__photo").src = imgSrc;
  cardElement.querySelector(".element__name").textContent = title;
  const likeBtn = cardElement.querySelector(".element__like-button");
  const deleteBtn = cardElement.querySelector(".element__delete-button");
  const photoBtn = cardElement.querySelector(".element__photo");

  deleteBtn.addEventListener("click", (evt) => {
    evt.target.parentElement.remove();
  });

  likeBtn.addEventListener("click", (evt) => {
    evt.target.classList.toggle("element_liked");
  });

  photoBtn.addEventListener("click", (evt) => openPhoto(evt));

  elements.prepend(cardElement);
}

function openPhoto(evt) {
  const name = evt.target.parentElement.querySelector(".element__name").textContent;
  const photo = evt.target.parentElement.querySelector(".element__photo").src;
  const photoName = photoPopup.querySelector(".photo-popup__name");
  const photoSrc = photoPopup.querySelector(".photo-popup__photo");
  photoName.textContent = name;
  photoSrc.src = photo;
  photoPopup.classList.add("photo-popup_visible");
}

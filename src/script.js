const photoPopup = document.querySelector(".photo-popup");
const profilePopup = document.querySelector(".profile-popup");
const cardPopup = document.querySelector(".card-popup");
const popup = document.querySelector(".popup");

const profileEditBtn = document.querySelector(".profile__edit-button");
const newCardAddBtn = document.querySelector(".profile__add-button");

const photoPopupCloseBtn = photoPopup.querySelector(".popup__close-button");
const profilePopupCloseBtn = profilePopup.querySelector(".popup__close-button");
const cardPopupCloseBtn = cardPopup.querySelector(".popup__close-button");

const profileForm = profilePopup.querySelector(".popup__form");
const cardForm = cardPopup.querySelector(".popup__form");

const profileName = profileForm.querySelector("#name");
const profileRole = profileForm.querySelector("#role");

const cardTitleValue = cardForm.querySelector("#title");
const cardSrcValue = cardForm.querySelector("#src");

const nameValue = document.querySelector(".profile__name");
const roleValue = document.querySelector(".profile__role");
const cardTemplate = document.querySelector("#element-template").content;
const elements = document.querySelector(".elements");

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

profileEditBtn.addEventListener("click", () => {
  showPopup(profilePopup);
  loadProfileData();
});

newCardAddBtn.addEventListener("click", () => {
  showPopup(cardPopup);
});

photoPopupCloseBtn.addEventListener("click", () => {
  closePopup(photoPopup);
});

profilePopupCloseBtn.addEventListener("click", () => {
  closePopup(profilePopup);
});

cardPopupCloseBtn.addEventListener("click", () => {
  closePopup(cardPopup);
});

profileForm.addEventListener("submit", submitProfileHandler);
cardForm.addEventListener("submit", submitNewCardHandler);

function submitProfileHandler(evt) {
  evt.preventDefault();
  nameValue.textContent = profileName.value;
  roleValue.textContent = profileRole.value;
  closePopup(profilePopup);
}

function submitNewCardHandler(evt) {
  evt.preventDefault();
  const newCard = addNewCard(cardTitleValue.value, cardSrcValue.value);
  renderCard(newCard);
  resetData();
  closePopup(cardPopup);
}

function loadProfileData() {
  profileName.value = nameValue.textContent;
  profileRole.value = roleValue.textContent;
}

function resetData() {
  cardSrcValue.value = "";
  cardTitleValue.value = "";
}

function renderCard(newCard) {
  elements.prepend(newCard);
}

function closePopup(popupContainer) {
  popup.classList.remove("popup_visible");
  popupContainer.classList.remove("popup__container-visible");
}

function showPopup(popupContainer) {
  popup.classList.add("popup_visible");
  popupContainer.classList.add("popup__container-visible");
}

function setDefaultCard() {
  initialCards.forEach((item) => {
    const newCard = addNewCard(item.name, item.link);
    renderCard(newCard);
  });
}

function addNewCard(title, imgSrc) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const photoContent = cardElement.querySelector(".element__photo");
  photoContent.src = imgSrc;
  photoContent.alt = title;
  cardElement.querySelector(".element__name").textContent = title;

  const likeBtn = cardElement.querySelector(".element__like-button");
  const deleteBtn = cardElement.querySelector(".element__delete-button");

  deleteBtn.addEventListener("click", (evt) => {
    evt.target.parentElement.remove();
  });

  likeBtn.addEventListener("click", (evt) => {
    evt.target.classList.toggle("element_liked");
  });

  photoContent.addEventListener("click", () => openPhoto(title, imgSrc));

  return cardElement;
}

function openPhoto(title, imgSrc) {
  const photoName = photoPopup.querySelector(".photo-popup__name");
  const photoSrc = photoPopup.querySelector(".photo-popup__photo");
  photoName.textContent = title;
  photoSrc.src = imgSrc;
  showPopup(photoPopup);
}

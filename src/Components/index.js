import '../index.css';
import { enableValidation } from './validation.js';
import { closePopup } from './modals.js';
import { showPopup } from './modals.js';
import { addNewCard } from './card.js';
import { renderCard } from './card.js';
import { setDefaultCards } from './card.js';
import { getProfileInfo } from './api';
import { updateProfileInfo } from './api';
import { addCardToServer } from './api';
import { updateProfileAvatar } from './api';
//#region Variables
export const profile = {
  name: '',
  about: '',
  id: 0,
  avatar: ''
}

const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector(".profile-popup");
const cardPopup = document.querySelector(".card-popup");
const avatarPopup = document.querySelector('.avatar-popup');

const profileEditAvatarBtn = document.querySelector('.profile__avatar-wrapper');
const profileEditBtn = document.querySelector(".profile__edit-button");
const newCardAddBtn = document.querySelector(".profile__add-button");

popups.forEach(pop => {
  pop.querySelector(".popup__close-button").addEventListener('click', () => closePopup(pop));
});

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  popupSaveButtonSelector: ".popup__save-button",
  popupFieldsetSelector: '.popup__fieldset',
  popupInputTypeError: 'popup__input_type_error',
  buttonInactive: 'button_inactive',
  formInputErrorActive: 'form__input-error_active'
}

const profileForm = document.forms.profile;
const profileName = profileForm.elements.name;
const profileRole = profileForm.elements.role;

const cardForm = document.forms.card;
const cardTitleValue = cardForm.elements.title;
const cardSrcValue = cardForm.elements.src;

const avatarForm = document.forms.avatar;
const avatarUrl = avatarForm.elements.src;

const nameValue = document.querySelector(".profile__name");
const roleValue = document.querySelector(".profile__role");
const profilePhoto = document.querySelector('.profile__avatar');
//#endregion

enableValidation(validationConfig);
setDefaultCards();
loadProfileDataFromServer();

profileEditBtn.addEventListener("click", () => {
  loadProfileData();
  showPopup(profilePopup);
});

newCardAddBtn.addEventListener("click", () => {
  showPopup(cardPopup);
});

profileEditAvatarBtn.addEventListener('click', () => {
  showPopup(avatarPopup);
})

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleNewCardSumbit);
avatarForm.addEventListener('submit', handleAvatarSubmit);

function handleAvatarSubmit(evt) {
  const saveBtn = avatarForm.querySelector('.popup__save-button');
  saveBtn.textContent = "Сохранение...";
  evt.preventDefault();
  updateProfileAvatar(avatarUrl.value).then((res) => loadProfileDataFromServer())
    .finally((res) => saveBtn.textContent = "Сохранить")
    .catch((err) => console.log(err));
  closePopup(avatarPopup);
  avatarForm.reset();

  saveBtn.disabled = true;
  saveBtn.classList.add('button_inactive');
}

function handleProfileFormSubmit(evt) {
  const saveBtn = profileForm.querySelector('.popup__save-button');
  saveBtn.textContent = "Сохранение...";
  evt.preventDefault();
  updateProfileInfo(profileName.value, profileRole.value)
    .then((res) => loadProfileDataFromServer())
    .finally((res) => saveBtn.textContent = "Сохранить")
    .catch((err) => console.log(err));

  closePopup(profilePopup);
}

function handleNewCardSumbit(evt) {
  evt.preventDefault();
  const saveBtn = cardForm.querySelector('.popup__save-button');
  saveBtn.textContent = "Сохранение...";
  addCardToServer(cardTitleValue.value, cardSrcValue.value).then((res) => {
    const newCard = addNewCard(cardTitleValue.value, cardSrcValue.value, [], profile.id, res._id);
    renderCard(newCard);
    closePopup(cardPopup);
    cardForm.reset();
    saveBtn.disabled = true;
    saveBtn.classList.add('button_inactive');
  })
    .finally((res) => saveBtn.textContent = "Создать")
    .catch((err) => console.log(err));
}

function loadProfileData() {
  profileName.value = profile.name;
  profileRole.value = profile.about;
}

function loadProfileDataFromServer() {
  getProfileInfo().then((res) => {
    profile.name = res.name;
    profile.about = res.about;
    profile.id = res._id;
    profile.avatar = res.avatar;
    nameValue.textContent = res.name;
    roleValue.textContent = res.about;
    profilePhoto.src = res.avatar;
  }).catch((err) => {
    console.log(err);
  });
}




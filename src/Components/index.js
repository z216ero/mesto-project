import '../index.css';
import { enableValidation } from './validation.js';
import { closePopup } from './modals.js';
import { showPopup } from './modals.js';
import { addNewCard } from './card.js';
import { renderCard } from './card.js';
import { setDefaultCard } from './card.js';

//#region Variables
const popups = document.querySelectorAll('.popup');

const profilePopup = document.querySelector(".profile-popup");
const cardPopup = document.querySelector(".card-popup");

const profileEditBtn = document.querySelector(".profile__edit-button");
const newCardAddBtn = document.querySelector(".profile__add-button");

popups.forEach(pop => {
  pop.querySelector(".popup__close-button").addEventListener('click', () => closePopup(pop));
});

const profileForm = document.forms.profile;
const profileName = profileForm.elements.name;
const profileRole = profileForm.elements.role;

const cardForm = document.forms.card;
const cardTitleValue = cardForm.elements.title;
const cardSrcValue = cardForm.elements.src;

const nameValue = document.querySelector(".profile__name");
const roleValue = document.querySelector(".profile__role");

//#endregion

enableValidation();
setDefaultCard();

profileEditBtn.addEventListener("click", () => {
  loadProfileData();
  showPopup(profilePopup);
});

newCardAddBtn.addEventListener("click", () => {
  showPopup(cardPopup);
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
  closePopup(cardPopup);
  cardForm.reset();
}

function loadProfileData() {
  profileName.value = nameValue.textContent;
  profileRole.value = roleValue.textContent;
}
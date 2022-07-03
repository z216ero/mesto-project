import '../index.css';
import { enableValidation } from './validation.js';
import { closePopup } from './modals.js';
import { showPopup } from './modals.js';
import { addNewCard } from './card.js';
import { renderCard } from './card.js';
import { setDefaultCards } from './card.js';

//#region Variables
const popups = document.querySelectorAll('.popup');
const formList = Array.from(document.querySelectorAll('.popup__form'));
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

enableValidation(formList);
setDefaultCards();

profileEditBtn.addEventListener("click", () => {
  loadProfileData();
  showPopup(profilePopup);
});

newCardAddBtn.addEventListener("click", () => {
  showPopup(cardPopup);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleNewCardSumbit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameValue.textContent = profileName.value;
  roleValue.textContent = profileRole.value;
  closePopup(profilePopup);
}

function handleNewCardSumbit(evt) {
  evt.preventDefault();
  const newCard = addNewCard(cardTitleValue.value, cardSrcValue.value);
  renderCard(newCard);
  closePopup(cardPopup);
  cardForm.reset();
  const saveBtn = cardForm.querySelector('.popup__save-button');
  saveBtn.disabled = true;
  saveBtn.classList.add('button_inactive');
}

function loadProfileData() {
  profileName.value = nameValue.textContent;
  profileRole.value = roleValue.textContent;
}
import { showPopup } from "./modals";

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
const photoPopup = document.querySelector(".photo-popup");
const photoName = photoPopup.querySelector(".photo-popup__name");
const photoSrc = photoPopup.querySelector(".photo-popup__photo");


export function renderCard(newCard) {
    elements.prepend(newCard);
}

export function addNewCard(title, imgSrc) {
    const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
    const photoContent = cardElement.querySelector(".element__photo");
    photoContent.src = imgSrc;
    photoContent.alt = title;
    cardElement.querySelector(".element__name").textContent = title;

    const likeBtn = cardElement.querySelector(".element__like-button");
    const deleteBtn = cardElement.querySelector(".element__delete-button");

    deleteBtn.addEventListener("click", () => {
        cardElement.remove();
    });

    likeBtn.addEventListener("click", (evt) => {
        evt.target.classList.toggle("element_liked");
    });

    photoContent.addEventListener("click", () => openPhoto(title, imgSrc));

    return cardElement;
}

export function setDefaultCards() {
    initialCards.forEach((item) => {
        const newCard = addNewCard(item.name, item.link);
        renderCard(newCard);
    });
}

function openPhoto(title, imgSrc) {
    photoName.textContent = title;
    photoSrc.src = imgSrc;
    photoSrc.alt=title;
    console.log('eed');
    showPopup(photoPopup);
}
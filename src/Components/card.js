import { showPopup } from "./modals";
import { getCards } from "./api";
import { profile } from "./index";
import { deleteCardFromServer } from "./api";
import { setLikeToPhoto } from "./api";
import { removeLikeFromPhoto } from "./api";

const cardTemplate = document.querySelector("#element-template").content;
const elements = document.querySelector(".elements");
const photoPopup = document.querySelector(".photo-popup");
const photoName = photoPopup.querySelector(".photo-popup__name");
const photoSrc = photoPopup.querySelector(".photo-popup__photo");

export function renderCard(newCard) {
    elements.prepend(newCard);
}

export function addNewCard(title, imgSrc, likes, userId, cardId) {
    const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
    const photoContent = cardElement.querySelector(".element__photo");
    const likeCountElement = cardElement.querySelector('.element__like-count');

    photoContent.src = imgSrc;
    photoContent.alt = title;
    likeCountElement.textContent = likes.length;

    cardElement.querySelector(".element__name").textContent = title;

    const likeBtn = cardElement.querySelector(".element__like-button");
    const deleteBtn = cardElement.querySelector(".element__delete-button");
    if (userId === profile.id) {
        deleteBtn.addEventListener("click", () => {
            deleteCardFromServer(cardId)
                .then((res) => cardElement
                    .remove()).
                catch((err) => console.log(err));
        });
    }
    else {
        deleteBtn.remove();
    }

    (likes.some(user => user._id === profile.id)) ? likeBtn.classList.add('element_liked') : '';

    likeBtn.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("element_liked")) {
            setLikeToPhoto(cardId).then((res) => {
                likeCountElement.textContent = res.likes.length;
                evt.target.classList.add("element_liked");
            })
                .catch((err) => console.log(err));
        }
        else {
            removeLikeFromPhoto(cardId).then((res) => {
                likeCountElement.textContent = res.likes.length;
                evt.target.classList.remove("element_liked");
            })
                .catch((err) => console.log(err));
        }
    });

    photoContent.addEventListener("click", () => openPhoto(title, imgSrc));

    return cardElement;
}

export function setDefaultCards(res) {
    res.forEach(obj => {
        const newCard = addNewCard(obj.name, obj.link, obj.likes, obj.owner._id, obj._id);
        renderCard(newCard);
    });
}

function openPhoto(title, imgSrc) {
    photoName.textContent = title;
    photoSrc.src = imgSrc;
    photoSrc.alt = title;
    showPopup(photoPopup);
}



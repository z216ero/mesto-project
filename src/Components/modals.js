
let currentPopup;

/**
 * 
 * @param {HTMLElement} popupContainer 
 */
export function closePopup(popupContainer) {
    currentPopup = null;
    popupContainer.classList.remove("popup__container-visible");
    popupContainer.removeEventListener('click',closeByHit);
    document.removeEventListener('keydown', closeByEscape);
}

/**
 * 
 * @param {HTMLElement} popupContainer 
 */
export function showPopup(popupContainer) {
    currentPopup = popupContainer;
    popupContainer.classList.add("popup__container-visible");
    popupContainer.addEventListener('click', closeByHit);
    document.addEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
    if (evt.code === 'Escape') {
        closePopup(currentPopup);
    }
}

function closeByHit(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(currentPopup);
    }
}
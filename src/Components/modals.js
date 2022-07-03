
let currentPopup;

/**
 * 
 * @param {HTMLElement} popupContainer 
 */
export function closePopup(popupContainer) {
    currentPopup = null;
    popupContainer.classList.remove("popup_opened");
    popupContainer.removeEventListener('click',closeByClick);
    document.removeEventListener('keydown', closeByEscape);
}

/**
 * 
 * @param {HTMLElement} popupContainer 
 */
export function showPopup(popupContainer) {
    currentPopup = popupContainer;
    popupContainer.classList.add("popup_opened");
    popupContainer.addEventListener('click', closeByClick);
    document.addEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
    if (evt.code === 'Escape') {
        closePopup(currentPopup);
    }
}

function closeByClick(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(currentPopup);
    }
}
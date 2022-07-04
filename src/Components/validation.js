export const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        const fieldsetList = Array.from(formElement.querySelectorAll(validationConfig.popupFieldsetSelector));
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(validationConfig, fieldSet);
        });
    });
};

const showInputError = (validationConfig, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.popupInputTypeError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.formInputErrorActive);
};

const hideInputError = (validationConfig, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.popupInputTypeError);
    errorElement.classList.remove(validationConfig.formInputErrorActive);
    errorElement.textContent = '';
};

const checkInputValidity = (validationConfig, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(validationConfig, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(validationConfig, formElement, inputElement);
    }
};

const setEventListeners = (validationConfig, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.popupSaveButtonSelector);
    toggleButtonState(validationConfig, inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            toggleButtonState(validationConfig, inputList, buttonElement);
            checkInputValidity(validationConfig, formElement, inputElement);
        });
    });
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(validationConfig, inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationConfig.buttonInactive);
        buttonElement.disabled = true;
    }
    else {
        buttonElement.classList.remove(validationConfig.buttonInactive);
        buttonElement.disabled = false;
    }
}
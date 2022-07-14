const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-12/',
    headers: {
        authorization: 'c4197417-e087-4a59-83a9-426a682aed65',
        'Content-Type': 'application/json'
    }
}

export const getCards = () => {
    return fetch(`${config.baseUrl}cards`, {
        headers: {
            authorization: config.headers.authorization,
        }
    }).then(checkResponse);
}

export const getProfileInfo = () => {
    return fetch(`${config.baseUrl}users/me`, {
        headers: {
            authorization: config.headers.authorization,
        }
    }).then(checkResponse);
}

export const updateProfileInfo = (newName, newrole) => {
    return fetch(`${config.baseUrl}users/me`, {
        method: 'PATCH',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': config.headers["Content-Type"]
        },
        body: JSON.stringify({
            name: newName,
            about: newrole
        })
    }).then(checkResponse);
}

export const addCardToServer = (cardName, cardLink) => {
    return fetch(`${config.baseUrl}cards`, {
        method: 'POST',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': config.headers["Content-Type"]
        },
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })
    }).then(checkResponse);
}

export const deleteCardFromServer = (cardId) => {
    console.log(cardId)
    return fetch(`${config.baseUrl}cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization,
        }
    }).then(checkResponse);
}

export const setLikeToPhoto = (cardId) => {
    console.log(cardId)
    return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: config.headers.authorization,
        }
    }).then(checkResponse);
}

export const removeLikeFromPhoto = (cardId) => {
    console.log(cardId)
    return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization,
        }
    }).then(checkResponse);
}

export const updateProfileAvatar = (newSrc) => {
    return fetch(`${config.baseUrl}users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': config.headers["Content-Type"]
        },
        body: JSON.stringify({
            avatar: newSrc,
        })
    }).then(checkResponse);
}

function checkResponse(res){
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}
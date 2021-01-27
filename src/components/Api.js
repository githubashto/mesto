export class Api {
  constructor({baseUrl, groupId, token}) {
      this._address = `${baseUrl}/${groupId}`;
      this._token = token;
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(response.status);
    })
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(response.status);
    })
  }

  patchUserInfo(data) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.profession,
      })
    })
    .then(result => result.ok
      ? result.json()
      : Promise.reject(`Ошибка ${result.status}`));
  }

  postNewCard(data) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.placename,
        link: data.url,
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(response.status);
    })
  }

  deleteCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(response.status);
    })
  }

  putCardLike(cardId) {
    return fetch(`${this._address}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      },
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(response.status);
  })
  }

 deleteCardLike(cardId) {
    return fetch(`${this._address}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(response.status);
  })
 }

 patchUserPortrait() {

  }
}



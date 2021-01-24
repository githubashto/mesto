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

      return Promise.reject(response.status)
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

      return Promise.reject(response.status)
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
      : Promise.reject(`Ошибка ${result.status}`))
  }


  postNewCard() {

  }

  getCardLikes() {

  }

  deleteCard() {

  }

  putCardLike() {

  }

  patchUserPortrait() {

  }
}



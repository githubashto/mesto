export class Api {
  constructor({baseUrl, groupId, token}) {
      this._address = `${baseUrl}/${groupId}`;
      this._token = token;
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
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

  patchUserInfo() {

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



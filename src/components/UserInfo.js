export class UserInfo {
  constructor({ profileNameSelector, profileProfessionSelector }) {
    this._name = profileNameSelector;
    this._profession = profileProfessionSelector;
  }

  getUserInfo() {
    this._userData = {name: document.querySelector(this._name).textContent, profession: document.querySelector(this._profession).textContent};
    return this._userData;
  }

  setUserInfo({name, profession}) {
    document.querySelector(this._name).textContent = name;
    document.querySelector(this._profession).textContent = profession;
  }
}

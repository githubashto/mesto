export class UserInfo {
  constructor({ profileName, profileProfession }) {
    this._name = profileName;
    this._profession = profileProfession;
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

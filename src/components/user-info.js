export class UserInfo {
  constructor({ profileNameSelector, profileProfessionSelector }) {
    this._name = document.querySelector(profileNameSelector);
    this._profession =  document.querySelector(profileProfessionSelector);
  }

  getUserInfo() {
    this._userData = {name: this._name.textContent, profession: this._profession.textContent};
    return this._userData;
  }

  setUserInfo({name, profession}) {
    this._name.textContent = name;
    this._profession.textContent = profession;
  }
}

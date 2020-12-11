import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, submitter) {
    super(popupSelector);
    this._submitter = submitter;
  }

  _getInputValues() {
    this._inputValues = {};
    const inputList = Array.from(this._element.querySelectorAll('.popup__input'));
    inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener('submit', evt =>
    {
      evt.preventDefault();
      console.log(this._getInputValues());
      this._submitter(this._getInputValues());
      this.close();
    });
  };

  close() {
    super.close();
    this._element.querySelector('.popup__form').reset();
  }
}

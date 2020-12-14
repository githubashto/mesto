import { Popup } from './popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, submitter, formSelector, inputSelector) {
    super(popupSelector);
    this._submitter = submitter;
    this._form = this._element.querySelector(formSelector);
    this._input = inputSelector;
  }

  _getInputValues() {
    this._inputValues = {};
    const inputList = Array.from(this._element.querySelectorAll(this._input));
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
      this._submitter(this._getInputValues());
      this.close();
    });
  };

  close() {
    super.close();
    this._form.reset();
  }
}

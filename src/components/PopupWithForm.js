import { Popup } from './Popup.js';
import { validationSettings } from '../utils/constants.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, submitter) {
    super(popupSelector);
    this._submitter = submitter;
    this._form = this._element.querySelector(validationSettings.formSelector);
  }

  _getInputValues() {
    this._inputValues = {};
    const inputList = Array.from(this._element.querySelectorAll(validationSettings.inputSelector));
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

  _clearErrors() {
    const popupInputs = Array.from(this._element.querySelectorAll(validationSettings.inputSelector));
    popupInputs.forEach((element) => {
      element.classList.remove(validationSettings.inputErrorClass);
    });
    const popupErrors = Array.from(this._element.querySelectorAll('[id$=-error]'));
    popupErrors.forEach((element) => {
      element.classList.remove(validationSettings.errorClass);
      element.textContent = '';
    });
  }


  close() {
    super.close();
    this._form.reset();
    this._clearErrors();
  }
}

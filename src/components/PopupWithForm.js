import { Popup } from './Popup.js';
import { validationSettings } from '../utils/constants.js'
export class PopupWithForm extends Popup {
  constructor(popupSelector, submitter, formSelector, inputSelector, submitButtonSelector, submitButtonText) {
    super(popupSelector);
    this._submitter = submitter;
    this._form = this._element.querySelector(formSelector);
    this._input = inputSelector;
    this._submitButton = this._element.querySelector(submitButtonSelector);
    this._submitButtonText = submitButtonText;
    this._inputList = Array.from(this._element.querySelectorAll(this._input));
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener('submit', evt =>
    {
      evt.preventDefault();
      this._submitButton.textContent = 'Сохранение…';
      this._submitter(this._getInputValues());
    });
  };

  open() {
    this._submitButton.textContent = this._submitButtonText;
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }
}

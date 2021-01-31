import { Popup } from './Popup.js';
import { validationSettings } from '../utils/constants.js'
export class PopupWithForm extends Popup {
  constructor(popupSelector, submitter, formSelector, inputSelector, submitButtonSelector) {
    super(popupSelector);
    this._submitter = submitter;
    this._form = this._element.querySelector(formSelector);
    this._input = inputSelector;
    this._submitButton = this._element.querySelector(submitButtonSelector);
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
      this._submitButton.textContent = 'Сохранение…';
      this._submitter(this._getInputValues());
    });
  };

  close() {
    super.close();
    this._form.reset();
  }
}

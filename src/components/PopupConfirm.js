import { Popup } from './Popup.js';
export class PopupConfirm extends Popup {
  open(card) {
    super.open();
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener('submit', evt =>
    {
      evt.preventDefault();
      this._card._deleteCard();
      super.close();
    });
 };
}

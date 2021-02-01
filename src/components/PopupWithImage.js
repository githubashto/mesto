import { Popup } from './Popup.js';
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewImage = this._element.querySelector('.popup__image');
    this._previewCaption = this._element.querySelector('.popup__caption');
  }

  open(name, link) {
    this._previewImage.src = link;
    this._previewImage.alt = name;
    this._previewCaption.textContent = name;
    super.open();
  }
}

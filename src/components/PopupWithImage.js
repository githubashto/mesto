import { Popup } from './Popup.js';
export class PopupWithImage extends Popup {
  open(name, link) {
    const imagePreview = this._element.querySelector('.popup__container_content_preview');
    const popupImage = imagePreview.querySelector('.popup__image');
    const popupCaption = imagePreview.querySelector('.popup__caption');
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    super.open();
  }
}

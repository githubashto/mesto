import { Popup } from './popup.js';
export class PopupWithImage extends Popup {
  open(name, link) {
    const imagePreview = this._element.querySelector('.popup__container_content_preview');
    const previewImage = imagePreview.querySelector('.popup__image');
    const previewCaption = imagePreview.querySelector('.popup__caption');
    previewImage.src = link;
    previewImage.alt = name;
    previewCaption.textContent = name;
    super.open();
  }
}

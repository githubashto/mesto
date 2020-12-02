import { openPopup } from './popups.js';
export class Card {
  constructor(name, link, template) {
    this._name = name;
    this._link = link;
    this._template = template;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventsListener();
    const cardTitle = this._element.querySelector('.element__title');
    const cardImage = this._element.querySelector('.element__image');
    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    return this._element;
  }

  _setEventsListener() {
// добавляем слушатели
    // — лайк/анлайк
    this._element.querySelector('.element__like').addEventListener('click', this._likeCard);
    // — удаление карточки
    this._element.querySelector('.element__delete').addEventListener('click', () => this._remove());
    // — превью изображения
    this._element.querySelector('.element__image').addEventListener("click", () => this._handleImagePreview());
  }

  // лайк и анлайк
   _likeCard(evt) {
    evt.target.classList.toggle('element__like_active');
  }

  //открытие превью
  _handleImagePreview() {
    const popupPreview = document.querySelector(".popup_type_image");
    const imagePreview = popupPreview.querySelector(".popup__container_content_preview");
    const popupImage = imagePreview.querySelector(".popup__image");
    const popupCaption = imagePreview.querySelector(".popup__caption");
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupCaption.textContent = this._name;
    openPopup(popupPreview);
  }

  // удаление карточки
  _remove() {
    this._element.remove();
  }
}


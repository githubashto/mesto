// import { openPopup } from './popups.js';
export class Card {
  constructor(name, link, template, handleCardClick) {
    this._name = name;
    this._link = link;
    this._template = template;
    this._handleCardClick = handleCardClick;
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
    this._element.querySelector('.element__image').addEventListener("click", () => {
       this._handleCardClick(this._name, this._link);
    });
  }

  // лайк и анлайк
   _likeCard(evt) {
    evt.target.classList.toggle('element__like_active');
  }

    // удаление карточки
  _remove() {
    this._element.remove();
  }
}

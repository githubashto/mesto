import { Card } from './Card.js';
import { PopupConfirm } from './PopupConfirm.js';

export class OwnCard extends Card {
  constructor(name, link, likes, selector, handleCardClick, handleDelete) {
    super(name, link, likes, selector, handleCardClick);
    this._handleDelete = handleDelete;
  }

  generateCard() {
    this._element = super._getTemplate();
    this._addContent();
    this._setEventsListener();
    return this._element;
  }

  _addContent() {
    super._addContent();
  }

   _setEventsListener() {
    super._setEventsListener();
    // кнопка удаления
    this._element
      .querySelector('.element__delete')
      .addEventListener('click', () => this._handleDelete(this));
   }

   // удаление карточки
  remove() {
    this._element.remove();
    this._element = null;
  }
}


import { Card } from './Card.js';

export class OwnCard extends Card {
  constructor(name, link, selector, handleCardClick) {
    super(name, link, selector, handleCardClick);
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
    // удаление карточки
    this._element.querySelector('.element__delete').addEventListener('click', () => this._remove());
   }

   // удаление карточки
  _remove() {
    this._element.remove();
    this._element = null;
  }
}


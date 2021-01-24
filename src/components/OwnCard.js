import Api from '../../../../../../../Documents/_Веб-разработка/ПРАКТИКУМ/_Вебинары/9Спринт_Livecoding_Работы_с_API_ Максим_Чеченёв/19_sprint9_frontend_LIVE/js/components/Api.js';
import { Card } from './Card.js';
import { PopupConfirm } from './PopupConfirm.js';

export class OwnCard extends Card {
  constructor(name, link, likes, id, selector, handleCardClick, handleDeleteClick, deleteCard) {
    super(name, link, likes, id, selector, handleCardClick);
    this._handleDeleteClick = handleDeleteClick;
    this._deleteCard = deleteCard;
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
      .addEventListener('click', () => this._handleDeleteClick(this));
   }

   // удаление карточки
  remove() {
    this._element.remove();
    this._element = null;
    this._deleteCard(this._id);
  }
}


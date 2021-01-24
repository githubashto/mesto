export class Card {
   constructor(name, link, likes, id, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._selector = cardSelector;
    this._id = id;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._addContent();
    this._setEventsListener();

    return this._element;
  }

  _addContent() {
    const cardTitle = this._element.querySelector('.element__title');
    const cardImage = this._element.querySelector('.element__image');
    const cardLikes = this._element.querySelector('.element__likes-number');
    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardLikes.textContent = (this._likes !== 0)
      ? this._likes
      : '';
  }

  _setEventsListener() {
// добавляем слушатели
    // — лайк/анлайк
    this._element.querySelector('.element__like').addEventListener('click', this._likeCard);

    // - превью
    this._element.querySelector('.element__image').addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  // лайк и анлайк
   _likeCard(evt) {
    evt.target.classList.toggle('element__like_active');
  }
}


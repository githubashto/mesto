export class Card {
   constructor({name, link, likes, id}, isOwn, selector, isLiked, handleCardClick, handleLike,
    handleDeleteClick, deleteCard,
    { cardElementSelector,
      cardTitleSelector,
      cardImageSelector,
      cardLikesSelector,
      likeButtonSelector,
      activeLikeClass,
      deleteButtonSelector }) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = id;
    this._isOwn = isOwn;
    this._isLiked = isLiked;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._handleDeleteClick = handleDeleteClick;
    this._deleteCard = deleteCard;
    this._cardElementSelector = cardElementSelector;
    this._cardTitleSelector = cardTitleSelector;
    this._cardImageSelector = cardImageSelector;
    this._cardLikesSelector = cardLikesSelector;
    this._likeButtonSelector = likeButtonSelector;
    this._activeLikeClass = activeLikeClass;
    this._deleteButtonSelector = deleteButtonSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector(this._cardElementSelector)
      .cloneNode(true);
    return cardElement;
  }

  getId() {
    return this._id;
  }

  getLikeState() {
    return this._isLiked;
  }

  getData() {
    return [this._name, this._link];
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardTitle = this._element.querySelector(this._cardTitleSelector);
    this._cardImage = this._element.querySelector(this._cardImageSelector);
    this._cardLikes = this._element.querySelector(this._cardLikesSelector);
    this._likeButton = this._element.querySelector(this._likeButtonSelector);
    this._addContent();
    this._setEventsListener();
    return this._element;
  }

  _addContent() {
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._updateLikes(this._likes);
    if (this._isLiked) {
      this._likeButton.classList.add(this._activeLikeClass);
    }
  }

  _setEventsListener() {
// добавляем слушатели
    // — лайк/анлайк
    this._likeButton.addEventListener('click', () => {
      this._handleLike(this.getId());
    });

    // - превью
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this.getData());
    });

    // - кнопка удаления
    if (this._isOwn) {
      this._element
      .querySelector(this._deleteButtonSelector)
      .addEventListener('click', () => this._handleDeleteClick(this));
    }
  }

  // лайк и анлайк
   likeCard(likesNumber) {
    this._likeButton.classList.add(this._activeLikeClass);
    this._isLiked = true;
    this._updateLikes(likesNumber);
  }

   unlikeCard(likesNumber) {
     this._likeButton.classList.remove(this._activeLikeClass);
     this._isLiked = false;
     this._updateLikes(likesNumber);
    }

  // удаление карточки
  remove() {
    this._element.remove();
    this._element = null;
  }

  _updateLikes(likesNumber) {
    this._likes = likesNumber;
    this._cardLikes.textContent = (likesNumber !== 0)
    ? likesNumber
    : '';
  }

}


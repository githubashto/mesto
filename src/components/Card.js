import { cardTitleSelector,
         cardImageSelector,
         cardLikesSelector,
         likeButtonSelector,
         activeLikeClass,
         deleteButtonSelector } from "../utils/constants.js";
export class Card {
   constructor(name, link, likes, id, isOwn, selector, isLiked, handleCardClick, handleLike, handleUnlike, handleDeleteClick, deleteCard) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = id;
    this._isOwn = isOwn;
    this._isLiked = isLiked;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._handleUnlike = handleUnlike;
    this._handleDeleteClick = handleDeleteClick;
    this._deleteCard = deleteCard;
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
    this._cardTitle = this._element.querySelector(cardTitleSelector);
    this._cardImage = this._element.querySelector(cardImageSelector);
    this._cardLikes = this._element.querySelector(cardLikesSelector);
    this._likeButton = this._element.querySelector(likeButtonSelector);
    this._addContent();
    this._setEventsListener();
    return this._element;
  }

  _addContent() {
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this.updateLikes(this._likes);
    if (this._isLiked) {
      this._likeButton.classList.add(activeLikeClass);
    }
  }

  _setEventsListener() {
// добавляем слушатели
    // — лайк/анлайк
    this._likeButton.addEventListener('click', evt => {
      this._likeCard(evt);
    });

    // - превью
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    // - кнопка удаления
    if (this._isOwn) {
      this._element
      .querySelector(deleteButtonSelector)
      .addEventListener('click', () => this._handleDeleteClick(this));
    }
  }

  // лайк и анлайк
   _likeCard(evt) {
     //если лайк стоит — снимаем
      if (this._isLiked) {
        this._likeButton.classList.remove(activeLikeClass);
        this._isLiked = false;
        this._handleUnlike(this._id);
       } else {
        this._likeButton.classList.add(activeLikeClass);
        this._isLiked = true;
        this._handleLike(this._id);

      }
  }

  // удаление карточки
  remove() {
    this._element.remove();
    this._element = null;
    this._deleteCard(this._id);
  }

  updateLikes(likesNumber) {
    this._likes = likesNumber;
    this._cardLikes.textContent = (likesNumber !== 0)
    ? likesNumber
    : '';
  }

}


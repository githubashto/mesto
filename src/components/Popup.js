export class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
  }

  open() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', evt => {
      this._handleEscClose(evt)
    });
    this._element.addEventListener('click', evt => {
      this._handleOverlayClick(evt)
    });
  }

  close(evt) {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    const clickTarget = evt.target.closest('.popup__container');
    // проверяем, не произошёл ли клик внутри попапа
    if (!clickTarget) {
      this.close();
    }
  }

  setEventListeners() {
    const buttonClose = this._element.querySelector('.popup__close');
    buttonClose.addEventListener('click', () => this.close());
  }
}
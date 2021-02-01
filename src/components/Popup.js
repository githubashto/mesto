export class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    const clickTargetPopup = evt.target.closest('.popup__container');
    // проверяем, не произошёл ли клик внутри попапа
    if (!clickTargetPopup) {
      this.close();
    }
  }

  setEventListeners() {
    const buttonClose = this._element.querySelector('.popup__close');
    buttonClose.addEventListener('click', () => this.close());
    this._element.addEventListener('click', evt => {
      this._handleOverlayClick(evt)
    });
  }
}

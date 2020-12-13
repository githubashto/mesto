// секция карточек
export const cardsContainer = '.elements';
// попапы и формы
export const popupProfileSelector = '.popup_type_profile';
export const popupPlaceSelector = '.popup_type_place';
export const popupImageSelector = '.popup_type_image';
export const formEditProfile = document.querySelector('.popup__container_content_profile');
export const formAddPlace = document.querySelector('.popup__container_content_place');

// кнопки открытия попапов с формами
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonAddPlace = document.querySelector('.profile__add-button');

// поля карточки и формы
export const nameInput = document.querySelector('.popup__input_content_name');
export const jobInput = document.querySelector('.popup__input_content_profession');
export const profileNameSelector = '.profile__name';
export const profileProfessionSelector = '.profile__profession';


// настройки валидации (формы, кнопки, поля и ошибки)
export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

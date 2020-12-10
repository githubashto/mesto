import { initialCards } from './initialCards.js'
import { Card } from './Card.js';
import { openPopup, closePopup, handleProfileForm, handlePlaceForm } from './popups.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js'

export const cardsContainer = '.elements';
// попапы и формы
export const popupProfile = document.querySelector('.popup_type_profile');
export const popupPlace = document.querySelector('.popup_type_place');
const formEditProfile = document.querySelector('.popup__container_content_profile');
const formAddPlace = document.querySelector('.popup__container_content_place');

// кнопки открытия попапов
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddPlace = document.querySelector('.profile__add-button');

// поля карточки и формы
export const nameInput = document.querySelector('.popup__input_content_name');
export const jobInput = document.querySelector('.popup__input_content_profession');
export const profileName = document.querySelector('.profile__name');
export const profileProfession = document.querySelector('.profile__profession');

// добавление валидации
// - настройки валидации
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
const validateProfile = new FormValidator(validationSettings, formEditProfile);
validateProfile.enableValidation();

const validatePlace = new FormValidator(validationSettings, formAddPlace);
validatePlace.enableValidation();


// обработка нажатий мыши, слушатели событий

// — открыть форму редактирования профиля и заполнить значения
buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  openPopup(popupProfile);
});

// - открыть форму добавления места
buttonAddPlace.addEventListener('click', () => openPopup(popupPlace));

// — закрытие попапов крестиком
function enableCloseButtons() {
  const buttonCloseList = Array.from(document.querySelectorAll('.popup__close'));
  buttonCloseList.forEach((buttonClose) => {
    buttonClose.addEventListener('click', evt => {
    const targetPopup = evt.target.closest('.popup');
    closePopup(targetPopup);
    });
  });
}

enableCloseButtons();

// - закрытие попапов кликом по оверлею
function handleOverlayClick(evt, targetPopup) {
  const popupContainer = evt.target.closest('.popup__container');
  // проверяем, не произошёл ли клик внутри контейнера формы
  if (!popupContainer) {
    closePopup(targetPopup);
  }
}

function enableClickClose() {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((targetPopup) => {
    targetPopup.addEventListener('click', evt => handleOverlayClick(evt, targetPopup));
  });
}

enableClickClose();

// — отправка форм нажатием кнопки
formEditProfile.addEventListener('submit', handleProfileForm);
formAddPlace.addEventListener('submit', handlePlaceForm);


export const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, '.template');
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
  }
}, cardsContainer);

cardList.renderItems();

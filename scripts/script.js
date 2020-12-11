import { initialCards } from './initialCards.js'
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js'
import { PopupWithImage } from './PopupWithImage.js';
import { UserInfo } from './UserInfo.js';
import { PopupWithForm } from './PopupWithForm.js';


const cardsContainer = '.elements';
// попапы и формы
const popupProfileSelector = '.popup_type_profile';
const popupPlaceSelector = '.popup_type_place';
const formEditProfile = document.querySelector('.popup__container_content_profile');
const formAddPlace = document.querySelector('.popup__container_content_place');

// кнопки открытия попапов
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddPlace = document.querySelector('.profile__add-button');

// поля карточки и формы
const nameInput = document.querySelector('.popup__input_content_name');
const jobInput = document.querySelector('.popup__input_content_profession');
const profileName = '.profile__name';
const profileProfession = '.profile__profession';

// настройки валидации
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
// добавление валидации
const validateProfile = new FormValidator(validationSettings, formEditProfile);
validateProfile.enableValidation();

const validatePlace = new FormValidator(validationSettings, formAddPlace);
validatePlace.enableValidation();

// попапы и слушатели в них
const userProfile = new UserInfo({ profileName, profileProfession} );
const popupProfile = new PopupWithForm(popupProfileSelector, (data) => {
    userProfile.setUserInfo(data);
});
popupProfile.setEventListeners()

const popupPlace = new PopupWithForm(popupPlaceSelector, (data) => {
  const card = new Card(data.placename, data.url, '.template', handleCardClick);
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
  const submitButton = popupPlace._element.querySelector('.popup__submit');
  submitButton.classList.add('popup__submit_disabled');
  submitButton.setAttribute('disabled', '');
});
popupPlace.setEventListeners()

// обработка нажатий мыши, слушатели событий

// — открыть форму редактирования профиля и заполнить значения
buttonEditProfile.addEventListener('click', () => {
  nameInput.value = userProfile.getUserInfo().name;
  jobInput.value = userProfile.getUserInfo().profession;
  popupProfile.open();
});

// - открыть форму добавления места
buttonAddPlace.addEventListener('click', () => {
  popupPlace.open();
});

export function handleCardClick(link, name) {
  const popupPreview = new PopupWithImage('.popup_type_image');
  popupPreview.open(link, name);
}

// начальная загрузка карточек
export const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name,
                          item.link,
                          '.template',
                          (name, link) =>  {
                            const popupPreview = new PopupWithImage('.popup_type_image');
                            popupPreview.open(name, link);
                          });
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
  }
}, cardsContainer);

cardList.renderItems();

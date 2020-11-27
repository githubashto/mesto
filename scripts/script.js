// карточки и контейнер
import { Card, cardsContainer } from './Card.js';

// попапы и формы
const popupProfile = document.querySelector(".popup_type_profile");
const popupPlace = document.querySelector(".popup_type_place");
const formEditProfile = document.querySelector(".popup__container_content_profile");
const formAddPlace = document.querySelector(".popup__container_content_place");

// кнопки открытия попапов
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddPlace = document.querySelector(".profile__add-button");

// поля карточки и формы
const nameInput = document.querySelector(".popup__input_content_name");
const jobInput = document.querySelector(".popup__input_content_profession");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const placenameInput = document.querySelector(".popup__input_content_placename");
const linkInput = document.querySelector(".popup__input_content_url");


// открытие попапа
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', evt => handleEscKey(evt, popup));
}
// закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscKey);
}

// редактирование профиля
function handleProfileForm(evt) {
  evt.preventDefault();
   // записываем в текст страницы значения полей из формы
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popupProfile);
}

// добавление карточки
function handlePlaceForm(evt) {
  evt.preventDefault();
  const card = new Card(placenameInput.value, linkInput.value, '.template');
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
  closePopup(popupPlace);
}

// обработка нажатий мыши и клавиатуры, слушатели событий

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

// - закрытие попапов нажатием Esc на клавиатуре
function handleEscKey(evt, targetPopup) {
  if (evt.key === 'Escape') {
    closePopup(targetPopup);
  }
}

// — отправка форм нажатием кнопки
formEditProfile.addEventListener('submit', handleProfileForm);
formAddPlace.addEventListener('submit', handlePlaceForm);

// - отправка форм нажатием Enter
function handleEnterKey(inputElement) {

  if (evt.key === 'Enter') {
   switch(inputElement)  {
    case nameInput:
    case jobInput:
      handleProfileForm();
      break;
    case placenameInput:
    case linkInput:
      handlePlaceForm();
      break;
    }
  }
}

import { Card } from './Card.js';
import { popupProfile, popupPlace, nameInput, jobInput, profileName, profileProfession, cardsContainer } from './script.js'

// поля формы
const placenameInput = document.querySelector(".popup__input_content_placename");
const linkInput = document.querySelector(".popup__input_content_url");

// открытие попапа
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', evt => handleEscKey(evt, popup));
}

  // закрытие попапа
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscKey);
}

// - закрытие попапов нажатием Esc на клавиатуре
function handleEscKey(evt, targetPopup) {
  if (evt.key === 'Escape') {
    closePopup(targetPopup);
  }
}

// редактирование профиля
export function handleProfileForm(evt) {
  evt.preventDefault();
   // записываем в текст страницы значения полей из формы
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popupProfile);
}

// добавление карточки
export function handlePlaceForm(evt) {
  evt.preventDefault();
  const card = new Card(placenameInput.value, linkInput.value, '.template');
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
  evt.target.reset();
  const submitButton = evt.target.querySelector('.popup__submit');
  submitButton.classList.add('popup__submit_disabled');
  submitButton.setAttribute('disabled', '');
  closePopup(popupPlace);
}

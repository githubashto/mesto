import { initialCards } from './Card.js';
import { showError, hideError, hasInvalidInput, toggleButtonState, checkInputValidity, setInputListeners, enableValidation } from './FormValidator.js';

//карточки и контейнер
const template = document.querySelector(".template");
const cardsContainer = document.querySelector(".elements");

// попапы и формы
const popupProfile = document.querySelector(".popup_type_profile");
const popupPlace = document.querySelector(".popup_type_place");
const popupPreview = document.querySelector(".popup_type_image");
const formEditProfile = document.querySelector(".popup__container_content_profile");
const formAddPlace = document.querySelector(".popup__container_content_place");
const imagePreview = document.querySelector(".popup__container_content_preview");

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
const popupImage = imagePreview.querySelector(".popup__image");
const popupCaption = imagePreview.querySelector(".popup__caption");

// формирование карточки
function getCard(card) {
  const cardElement = template.cloneNode(true).content;
  const cardTitle = cardElement.querySelector(".element__title");
  const cardImage = cardElement.querySelector(".element__image");
  const cardLike = cardElement.querySelector('.element__like');
  const cardDelete = cardElement.querySelector('.element__delete');

  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  // добавляем слушатели
  // — лайк/анлайк
  cardLike.addEventListener('click', likeCard);
  // — удаление карточки
  cardDelete.addEventListener('click', removeCard);
 // — превью изображения
  cardImage.addEventListener("click", () => handleImagePreview(card));

  return cardElement;
}

// открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', evt => handleEscKey(evt, popup));
}

// закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscKey);
}

// открытие превью
function handleImagePreview(card) {
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;
  openPopup(popupPreview);
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
  const card = getCard({
      name: placenameInput.value,
      link: linkInput.value
    });
  cardsContainer.prepend(card);
  closePopup(popupPlace);
}

// удаление карточки
function removeCard(evt) {
  const card = evt.target.closest('.element');
  card.remove();
}

// лайк и анлайк
function likeCard(evt) {
  evt.target.classList.toggle('element__like_active');
}

// обраюотка нажатий мыши и клавиатуры, слушатели событий

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

// начальная загрузка карточек
initialCards.forEach((data) => {
  const card = getCard(data);
  cardsContainer.append(card);
});

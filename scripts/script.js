//массив карточек при начальной загрузке страницы
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const template = document.querySelector(".template");
const cardsContainer = document.querySelector(".elements");

// попапы и формы
const formEditProfile = document.querySelector(".popup__container_content_profile");
const formAddPlace = document.querySelector(".popup__container_content_place");
const popup = document.querySelector(".popup");

// кнопки открытия и закрытия попапов
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddPlace = document.querySelector(".profile__add-button");
const buttonCloseProfilePopup = document.querySelector(".popup__close_content_profile");
const buttonClosePlacePopup = document.querySelector(".popup__close_content_place");

// поля карточки и формы
let nameInput = document.querySelector(".popup__input_content_name");
let jobInput = document.querySelector(".popup__input_content_profession");
let profileName = document.querySelector(".profile__name");
let profileProfession = document.querySelector(".profile__profession");

const getCard = (card) => {
  const cardElement = template.cloneNode(true).content;
  const cardTitle = cardElement.querySelector(".element__title");
  const cardImage = cardElement.querySelector(".element__image");

  // cardImage.addEventListener("click", () => handleImagePreview(cardDetails));
  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  return cardElement;
};


// function togglePopup() {
//   popup.classList.toggle('popup_opened'); // переключаем видимость попапа
//   if (popup.classList.contains('popup_opened') === true) { // если попап открыт
//     nameInput.value = profileName.textContent; // записываем в значения полей текст из текущей страницы
//     jobInput.value = profileProfession.textContent;
//   }
// }

function openPopup(popupForm) {
  popup.classList.add('popup_opened');
  popupForm.classList.add('popup_opened');
}

function closePopup (popupButton) {
  popup.classList.remove('popup_opened');
  const popupContainer = popupButton.closest('.popup__container');
  popupContainer.classList.remove('popup_opened');
}

function handleProfileForm (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value; // записываем в текст страницы значения полей из формы
  profileProfession.textContent = jobInput.value;
  closePopup();
}

function handlePlaceForm (evt) {
  evt.preventDefault();

  closePopup();
}

// слушатели событий
buttonEditProfile.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  openPopup(formEditProfile);
});

buttonAddPlace.addEventListener('click', function() {
  openPopup(formAddPlace);
});

buttonCloseProfilePopup.addEventListener('click',  function() {
  closePopup(buttonCloseProfilePopup);
});

buttonClosePlacePopup.addEventListener('click',  function() {
  closePopup(buttonClosePlacePopup);
});

formEditProfile.addEventListener('submit', handleProfileForm);

formAddPlace.addEventListener('submit', handlePlaceForm);


// начальная загрузка карточек
initialCards.forEach((data) => {
  const card = getCard(data);
  cardsContainer.append(card);
});



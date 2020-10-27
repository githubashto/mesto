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
const formElement = document.querySelector(".popup__container");
const popup = document.querySelector(".popup");

// кнопки открытия и закрытия попапов
let buttonEditProfile = document.querySelector(".profile__edit-button");
let buttonClosePopup = document.querySelector(".popup__close");

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


function togglePopup() {
  popup.classList.toggle('popup_opened'); // переключаем видимость попапа
  if (popup.classList.contains('popup_opened') === true) { // если попап открыт
    nameInput.value = profileName.textContent; // записываем в значения полей текст из текущей страницы
    jobInput.value = profileProfession.textContent;
  }
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value; // записываем в текст страницы значения полей из формы
  profileProfession.textContent = jobInput.value;
  togglePopup();
}


// слушатели событий
buttonEditProfile.addEventListener('click', togglePopup);
buttonClosePopup.addEventListener('click', togglePopup);
formElement.addEventListener('submit', handleFormSubmit);

initialCards.forEach((data) => {
  const card = getCard(data);
  cardsContainer.append(card);
});

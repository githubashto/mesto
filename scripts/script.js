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
const popup = document.querySelector(".popup");
const formEditProfile = document.querySelector(".popup__container_content_profile");
const formAddPlace = document.querySelector(".popup__container_content_place");
const imagePreview = document.querySelector(".popup__container_content_preview");

// кнопки открытия и закрытия попапов
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddPlace = document.querySelector(".profile__add-button");
const buttonCloseProfilePopup = document.querySelector(".popup__close_content_profile");
const buttonClosePlacePopup = document.querySelector(".popup__close_content_place");
const buttonClosePreviewPopup = document.querySelector(".popup__close_content_preview");

// поля карточки и формы
const nameInput = document.querySelector(".popup__input_content_name");
const jobInput = document.querySelector(".popup__input_content_profession");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const placenameInput = document.querySelector(".popup__input_content_placename");
const linkInput = document.querySelector(".popup__input_content_url");
const popupImage = imagePreview.querySelector(".popup__image");
const popupCaption = imagePreview.querySelector(".popup__caption");


function getCard(card) {
  const cardElement = template.cloneNode(true).content;
  const cardTitle = cardElement.querySelector(".element__title");
  const cardImage = cardElement.querySelector(".element__image");
  cardElement.querySelector('.element__like').addEventListener('click', evt => evt.target.classList.toggle('element__like_active'));

  cardElement.querySelector('.element__delete').addEventListener('click', evt => {
    const card = evt.target.closest('.element');
    card.remove();
  });

  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardImage.addEventListener("click", () => handleImagePreview(card));

  return cardElement;
};

function handleImagePreview(card) {
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;
  openPopup(imagePreview);
}

function openPopup(popupForm) {
  popup.classList.add('popup_opened');
  popupForm.classList.add('popup_opened');
}

function closePopup(popupForm) {
  popup.classList.remove('popup_opened');
  popupForm.classList.remove('popup_opened');
}

function handleProfileForm(evt) {
  evt.preventDefault();
   // записываем в текст страницы значения полей из формы
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(formEditProfile);
}

function handlePlaceForm(evt) {
  evt.preventDefault();
  const card = getCard({
      name: placenameInput.value,
      link: linkInput.value
    });
  cardsContainer.prepend(card);
  closePopup(formAddPlace);
}


// слушатели событий
buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  openPopup(formEditProfile);
});

buttonAddPlace.addEventListener('click', () => openPopup(formAddPlace));

buttonCloseProfilePopup.addEventListener('click',  () => closePopup(formEditProfile));

buttonClosePlacePopup.addEventListener('click',  () => closePopup(formAddPlace));

buttonClosePreviewPopup.addEventListener('click',  () => closePopup(imagePreview));


formEditProfile.addEventListener('submit', handleProfileForm);
formAddPlace.addEventListener('submit', handlePlaceForm);

// начальная загрузка карточек
initialCards.forEach((data) => {
  const card = getCard(data);
  cardsContainer.append(card);
});




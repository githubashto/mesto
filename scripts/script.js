//массив карточек для начальной загрузки
const template = document.querySelector(".template");
const cardsContainer = document.querySelector(".elements");

// попапы и формы
const popupProfile = document.querySelector(".popup_type_profile");
const popupPlace = document.querySelector(".popup_type_place");
const popupPreview = document.querySelector(".popup_type_image");
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

// формирование карточки
function getCard(card) {
  const cardElement = template.cloneNode(true).content;
  const cardTitle = cardElement.querySelector(".element__title");
  const cardImage = cardElement.querySelector(".element__image");
  //слушатель для лайка/анлайка
  cardElement.querySelector('.element__like').addEventListener('click', evt => likeCard(evt));
  //слушатель для удаления карточки
  cardElement.querySelector('.element__delete').addEventListener('click', evt => removeCard(evt));

  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
// слушатель клика по изображению (превью)
  cardImage.addEventListener("click", () => handleImagePreview(card));

  return cardElement;
}

// открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
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

//удаление карточки
function removeCard(evt) {
  const card = evt.target.closest('.element');
  card.remove();
}

//лайк и анлайк
function likeCard(evt) {
  evt.target.classList.toggle('element__like_active');
}

// слушатели событий — открытие попапов
buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  openPopup(popupProfile);
});

buttonAddPlace.addEventListener('click', () => openPopup(popupPlace));

// слушатели событий — закрытие попапов
buttonCloseProfilePopup.addEventListener('click',  () => closePopup(popupProfile));

buttonClosePlacePopup.addEventListener('click',  () => closePopup(popupPlace));

buttonClosePreviewPopup.addEventListener('click',  () => closePopup(popupPreview));

// слушатели событий — отправка форм
formEditProfile.addEventListener('submit', handleProfileForm);
formAddPlace.addEventListener('submit', handlePlaceForm);

// начальная загрузка карточек
initialCards.forEach((data) => {
  const card = getCard(data);
  cardsContainer.append(card);
});




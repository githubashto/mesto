let buttonEditProfile = document.querySelector(".profile__edit-button");
let buttonClosePopup = document.querySelector(".popup__close");
let formElement = document.querySelector(".popup__container");
let popup = document.querySelector(".popup");

let nameInput = document.querySelector(".popup__input_content_name");
let jobInput = document.querySelector(".popup__input_content_profession");
let profileName = document.querySelector(".profile__name");
let profileProfession = document.querySelector(".profile__profession");

function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  popup.classList.add('popup_opened');
}

buttonEditProfile.addEventListener('click', openPopup);

function closePopup() {
  popup.classList.remove('popup_opened');
}

buttonClosePopup.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);

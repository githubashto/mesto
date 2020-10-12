let buttonEditProfile = document.querySelector(".profile__edit-button");
let buttonClosePopup = document.querySelector(".popup__close");
let formElement = document.querySelector(".popup__container");
let popup = document.querySelector(".popup");

let nameInput = document.querySelector(".popup__input_content_name");
let jobInput = document.querySelector(".popup__input_content_profession");
let profileName = document.querySelector(".profile__name");
let profileProfession = document.querySelector(".profile__profession");

function togglePopup() {
  popup.classList.toggle('popup_opened'); // переключаем видимость попапа
  if (popup.classList.contains('popup_opened') === true) { // если попап открыт
    nameInput.value = profileName.textContent; // записываем в значения полей текст из текущей страницы
    jobInput.value = profileProfession.textContent;
  }
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value; // записываем в текст страницы значения полей из формы
  profileProfession.textContent = jobInput.value;
  togglePopup();
}

buttonEditProfile.addEventListener('click', togglePopup);
buttonClosePopup.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);

import './index.css';
import { Card } from '../components/Card.js';
import { OwnCard } from '../components/OwnCard.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Api } from '../components/Api.js';
import { cardsContainer,
         popupProfileSelector,
         popupPlaceSelector,
         formEditProfile,
         formAddPlace,
         buttonEditProfile,
         buttonAddPlace,
         nameInput,
         jobInput,
         profileNameSelector,
         profileProfessionSelector,
         validationSettings,
         popupImageSelector,
         cardSelector,
         cardSelectorInitial,
         profileAvatarSelector,
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1',
  groupId: 'cohort-19',
  token: '1dc60437-1a25-4631-a3f7-2f7b0fec8038',
});

// попапы и слушатели в них
const userProfile = new UserInfo({ profileNameSelector, profileProfessionSelector });
const popupProfile = new PopupWithForm(popupProfileSelector, (data) => {
    userProfile.setUserInfo(data);
    api.patchUserInfo(data);
  },
  validationSettings.formSelector,
  validationSettings.inputSelector);
popupProfile.setEventListeners();

// функция создания карточки
function getCard(name, link, likes, selector) {
  const card = (selector === cardSelectorInitial)
    ? new Card(name, link, likes, selector, (name, link) =>  {
      popupPreview.open(name, link);
    })
    : new OwnCard(name, link, likes, selector, (name, link) =>  {
      popupPreview.open(name, link);
    })
  const cardElement = card.generateCard();
  return cardElement;
}

const popupPlace = new PopupWithForm(popupPlaceSelector, (data) => {
  cardList.addItem(getCard(data.placename, data.url, '', cardSelector));
  api.postNewCard(data);
  },
  validationSettings.formSelector,
  validationSettings.inputSelector
);
popupPlace.setEventListeners();
const popupPreview = new PopupWithImage(popupImageSelector);
popupPreview.setEventListeners();

// включить валидацию
const validateProfile = new FormValidator(validationSettings, formEditProfile);
validateProfile.enableValidation();
const validatePlace = new FormValidator(validationSettings, formAddPlace);
validatePlace.enableValidation();

// обработка нажатий мыши, слушатели событий

// - открыть форму редактирования профиля
buttonEditProfile.addEventListener('click', () => {
  // заполнить значения полей
  nameInput.value = userProfile.getUserInfo().name;
  jobInput.value = userProfile.getUserInfo().profession;
  validateProfile.clearErrors();
  popupProfile.open();
});

// - открыть форму добавления места
buttonAddPlace.addEventListener('click', () => {
  validatePlace.clearErrors();
  popupPlace.open();
});

// загрузка данных пользователя
api.getUserInfo()
  .then(result => {
    userProfile.setUserInfo({name: result.name, profession: result.about});
    document.querySelector(profileAvatarSelector).src = result.avatar;
  })
  .catch(err => console.log(`Ошибка при получении данных ${err}`));

// начальная загрузка карточек
const cardList = new Section({ renderer:
  item => {
    cardList.setItem(getCard(item.name, item.link, item.likes.length, cardSelectorInitial));
  }
}, cardsContainer);

api.getInitialCards()
.then(result => {
  cardList.renderItems(result);
})
.catch(err => console.log(`Ошибка при получении данных ${err}`));




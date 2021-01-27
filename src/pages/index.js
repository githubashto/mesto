import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupConfirm } from '../components/PopupConfirm.js';
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
         popupConfirmSelector,
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1',
  groupId: 'cohort-19',
  token: '1dc60437-1a25-4631-a3f7-2f7b0fec8038',
});

// узнаём наш id
let userId = '';
api.getUserInfo()
  .then(result => {
    userId = result._id;
  })
  .catch(err => console.log(`Ошибка при получении данных ${err}`));

// функция создания карточки
function getCard(name, link, likes, id, isOwn, selector, isLiked) {
  const card = new Card(name, link, likes, id, isOwn, selector, isLiked, (name, link) => {
      popupPreview.open(name, link);
      }, id => {
        api.putCardLike(id)
          .then(response => {
           card.updateLikes(response.likes.length);
         })
         .catch(err => console.log(`Ошибка при получении данных ${err}`));
       }, id => {
        api.deleteCardLike(id)
          .then(response => {
             card.updateLikes(response.likes.length);
           })
          .catch(err => console.log(`Ошибка при получении данных ${err}`));
       }, id => {
        api.deleteCardLike(id);
        }, card => {
        popupConfirmDelete.open(card);
        }, id => {
        api.deleteCard(id);
  });

  const cardElement = card.generateCard();
  return cardElement;
}

// попапы и слушатели в них
const userProfile = new UserInfo({ profileNameSelector, profileProfessionSelector });
const popupProfile = new PopupWithForm(popupProfileSelector, data => {
    userProfile.setUserInfo(data);
    api.patchUserInfo(data);
  },
  validationSettings.formSelector,
  validationSettings.inputSelector);
popupProfile.setEventListeners();

const popupPlace = new PopupWithForm(popupPlaceSelector, data => {
  cardList.addItem(getCard(data.placename, data.url, '', '', cardSelector));
  api.postNewCard(data);

  },
  validationSettings.formSelector,
  validationSettings.inputSelector
);
popupPlace.setEventListeners();

const popupPreview = new PopupWithImage(popupImageSelector);
popupPreview.setEventListeners();

const popupConfirmDelete = new PopupConfirm(popupConfirmSelector);
popupConfirmDelete.setEventListeners();


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
    // если владелец — не я, карточка без кнопки удаления
    const isOwn = item.owner._id === userId;
    const selector = isOwn === true
       ? cardSelector
       : cardSelectorInitial;
    const isLiked = item.likes.some(liker =>
      {
        return liker._id === userId;
      });
      cardList.setItem(getCard(item.name, item.link, item.likes.length, item._id, isOwn, selector, isLiked));
  }
}, cardsContainer);

api.getInitialCards()
  .then(result => {
    cardList.renderItems(result);
  })
  .catch(err => console.log(`Ошибка при получении данных ${err}`));




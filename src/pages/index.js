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
         popupAvatarSelector,
         formEditProfile,
         formEditAvatar,
         formAddPlace,
         buttonEditProfile,
         buttonEditAvatar,
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
         cardElementSelector,
         cardTitleSelector,
         cardImageSelector,
         cardLikesSelector,
         likeButtonSelector,
         activeLikeClass,
         deleteButtonSelector } from "../utils/constants.js";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1',
  groupId: 'cohort-19',
  token: '1dc60437-1a25-4631-a3f7-2f7b0fec8038',
});

// наш id
let userId = '';

// функция создания карточки
function getCard({name, link, likes, id}, isOwn, selector, isLiked) {
  const card = new Card({name, link, likes, id}, isOwn, selector, isLiked,
    // обработка нажатия картинки
    ([name, link]) => {
      popupPreview.open(name, link);
    },
    // обработка кнопки лайка
    () => {
      if (card.getLikeState()) {
        // если лайк стоит, убираем
        api.deleteCardLike(card.getId())
          .then(result => {
            card.unlikeCard(result.likes.length);
        })
          .catch(err => console.log(`Ошибка при снятии лайка ${err}`));
      } else {
        api.putCardLike(card.getId())
          .then(result => {
            card.likeCard(result.likes.length);
        })
        .catch(err => console.log(`Ошибка при отправке лайка ${err}`));
      }
    },
    // обработка кнопки удаления
    () => {
      popupConfirmDelete.open(card);
    },
    // удаление после подтверждения
    () => {
        api.deleteCard(card.getId())
        .then(result => {
          card.remove();
        })
        .catch(err => console.log(`Ошибка при удалении карточки ${err}`));
    },
    { cardElementSelector,
      cardTitleSelector,
      cardImageSelector,
      cardLikesSelector,
      likeButtonSelector,
      activeLikeClass,
      deleteButtonSelector },
  );
  const cardElement = card.generateCard();
  return cardElement;
};

// попапы и слушатели в них
const userProfile = new UserInfo({ profileNameSelector, profileProfessionSelector, profileAvatarSelector });
const popupProfile = new PopupWithForm(popupProfileSelector, data => {
  api.patchUserInfo(data)
    .then(result => {
      popupProfile.close();
      userProfile.setUserInfo({name: result.name, profession: result.about});
    })
    .catch(err => console.log(`Ошибка при обновлении профиля ${err}`));
    },
  validationSettings.formSelector,
  validationSettings.inputSelector,
  validationSettings.submitButtonSelector,
  'Сохранить',
  );
popupProfile.setEventListeners();

const popupAvatar = new PopupWithForm(popupAvatarSelector, data => {
  api.patchUserAvatar(data)
    .then(result => {
      popupAvatar.close();
      userProfile.setUserAvatar(result.avatar);
    })
    .catch(err => console.log(`Ошибка при обновлении портрета ${err}`));
  },
  validationSettings.formSelector,
  validationSettings.inputSelector,
  validationSettings.submitButtonSelector,
  'Сохранить',
);
popupAvatar.setEventListeners();

const popupPlace = new PopupWithForm(popupPlaceSelector, data => {
  api.postNewCard(data)
    .then(result => {
        popupPlace.close();
        cardList.addItem(getCard({name: result.name, link: result.link, likes: result.likes.length, id: result._id}, true, cardSelector, false));
      })
    .catch(err => console.log(`Ошибка при добавлении карточки ${err}`));
  },
  validationSettings.formSelector,
  validationSettings.inputSelector,
  validationSettings.submitButtonSelector,
  'Создать',
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
const validateAvatar = new FormValidator(validationSettings, formEditAvatar);
validateAvatar.enableValidation();


// обработка нажатий мыши, слушатели событий

// - открыть форму редактирования профиля
buttonEditProfile.addEventListener('click', () => {
  // заполнить значения полей
  nameInput.value = userProfile.getUserInfo().name;
  jobInput.value = userProfile.getUserInfo().profession;
  validateProfile.clearErrors();
  popupProfile.open();
});


// - открыть форму редактирования портрета
buttonEditAvatar.addEventListener('click', () => {
  validateAvatar.clearErrors();
  popupAvatar.open();
});

// - открыть форму добавления места
buttonAddPlace.addEventListener('click', () => {
  validatePlace.clearErrors();
  popupPlace.open();
});

// загрузка данных пользователя
api.getUserInfo()
  .then(result => {
    userId = result._id;
    userProfile.setUserInfo({name: result.name, profession: result.about});
    userProfile.setUserAvatar(result.avatar);
  })
  .catch(err => console.log(`Ошибка при получении профиля ${err}`));

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
      cardList.setItem(getCard({name: item.name, link: item.link, likes: item.likes.length, id: item._id}, isOwn, selector, isLiked));
  }
}, cardsContainer);

api.getInitialCards()
  .then(result => {
    cardList.renderItems(result);
  })
  .catch(err => console.log(`Ошибка при получении карточек ${err}`));




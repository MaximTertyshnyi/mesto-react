import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardLike, onCardDelete, ...props }) {
  const currentUser = React.useContext(CurrentUserContext);


  return (
    <main className="content">
      <section className="profile page__container-profile">
        <div className="profile__avatar-container">
          <button
            className="profile__avatar-button"
            onClick={onEditAvatar}
            type="button"
            aria-label="Редактировать"
          >
            <img
              src={
                currentUser?.avatar ?? 'https://anatomised.com/wp-content/uploads/2016/05/spinner-test4.gif'
              }
              alt="Аватар профиля"
              className="profile__avatar"
            />
          </button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser?.name ?? '... getting data'}</h1>
          <button
            className="profile__edit-button"
            onClick={onEditProfile}
            type="button"
            aria-label="Редактировать"
          >
          </button>
          <p className="profile__subtitle">{currentUser?.about ?? '... getting data'}</p>
        </div>
        <button
          className="profile__add-button"
          onClick={onAddPlace}
          type="button"
          aria-label="Добавить карточку"
        >
        </button>
      </section>
      <section className="elements page__container-elements">
        {/* Сюда добавляем карточки. Нужно пройтись по массиву с карточками, сразу делаем деструктуризацию. Отдельно пробрасываем id, а все остальные пропсы собираем spread-оператором   */}
        {props.cards.map(({ _id, ...props }) => (
          <Card
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            key={_id}
            id={_id}
            {...props}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;

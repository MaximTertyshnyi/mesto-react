import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ id, name, link, likes, owner, onCardClick, onCardLike, onCardDelete, ...props }) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = owner._id === currentUser._id;
    const cardDeleteButtonClassName = `element__delite-button ${!isOwn && 'element__delite-button_hidden'}`;

    const isLiked = likes.some((i) => i._id === currentUser._id);
    const likeButtonClassName = `element__like-button ${isLiked && 'element__like-button_active'}`;

    function handleClick() {

        onCardClick({ name, link });
    }

    function handleLikeClick() {
        onCardLike(id, isLiked);
    }

    function handleDeleteCard() {
        // onCardDelete(isOwn, id);
        // onCardDelete(id);
        onCardDelete(id);
    }


    return (
        <article className="element">
            <img className="element__ithem" src={link} alt={name} onClick={handleClick} />
            <div className="element__detail">
                <h2 className="element__title">{name}</h2>
                <div className="element__like-conteiner">
                    <button
                        className={likeButtonClassName}
                        onClick={handleLikeClick}
                        type="button"
                        aria-label="Отметить понравившимся"
                    ></button>
                    <span className="element__like-counter">{likes.length}</span>
                </div>
            </div>
            <button
                className={cardDeleteButtonClassName}
                onClick={handleDeleteCard}
                type="button"
                aria-label="Удалить карточку"
            ></button>
        </article>
    );
}

export default Card;
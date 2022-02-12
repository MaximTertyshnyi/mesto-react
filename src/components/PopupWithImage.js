import React from 'react';

function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_type_img ${!!card.name && !!card.link ? 'popup_opened' : ''}`}>
            <div className="popup__container-img">
                <button className="popup__button-close" onClick={onClose} type="button" aria-label="Закрыть"></button>
                <img className="popup__img" src={card.link} alt={card.name} />
                <h2 className="popup__title-img">{card.name}</h2>
            </div>
        </div>
    );
}

export default ImagePopup;


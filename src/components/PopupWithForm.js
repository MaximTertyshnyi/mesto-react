import React from 'react';

function PopupWithForm({ name, title, button, onClose, children, isOpen, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form name={`form-${name}`} className="popup__form" onSubmit={onSubmit}>
          {children}
          <button className="popup__button-save" type="submit">
            {button}
          </button>
        </form>
        <button className="popup__button-close" type="button" aria-label="Закрыть" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;

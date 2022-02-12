import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const [avatar, setAvatar] = React.useState('');
  const inputRef = React.useRef({});

  function handleChangeAvatar(e) {
    setAvatar(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  React.useEffect(() => {
    setAvatar('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      button="Сохранить"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__inputs">
        <input
          className="popup__input popup__input_type_avatar"
          id="type_avatar"
          type="url"
          placeholder="Ссылка на аватар"
          name="link"
          required
          minLength="2"
          maxLength="200"
          autoComplete="off"
          ref={inputRef}
          onChange={handleChangeAvatar}
          value={avatar ?? ''}
        />
        <span className="popup__input-error popup__input-error_type_avatar"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

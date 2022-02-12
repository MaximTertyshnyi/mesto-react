//замена на кнопке сохранения
export const renderLoad = (popup, isLoad = false) => {
  const currentActiveButton = document.querySelector(`${popup} .popup__button-save`);
  if (isLoad) {
    currentActiveButton.textContent = 'Загрузка...';
  } else {
    currentActiveButton.textContent = 'Сохранить';
  }
};
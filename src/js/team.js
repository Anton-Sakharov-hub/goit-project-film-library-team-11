const refs = {
  openFooterModal: document.querySelector('[data-action="open-teambox"]'),
  backdropClick: document.querySelector('.modal-backdrop'),
};

refs.openFooterModal.addEventListener('click', onOpenModal);

function onOpenModal() {
  refs.backdropClick.classList.remove('is-hidden');
}
window.addEventListener('keydown', onEscClick);

refs.backdropClick.addEventListener('click', onBackdropClick);

function onCloseModal() {
  refs.backdropClick.classList.add('is-hidden');
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onEscClick(event) {
  const ESC_KEY_CODE = 'Escape';
  console.log(event.code);

  if (event.code === ESC_KEY_CODE) {
    onCloseModal();
  }
}

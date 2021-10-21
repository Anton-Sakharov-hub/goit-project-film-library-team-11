const refs = {
  openFooterModal: document.querySelector('[data-action="open-teambox"]'),
  backdropClick: document.querySelector('.modal-backdrop'),
  teamModalCloseBtn: document.querySelector('[data-team-modal-close]')
};

refs.openFooterModal.addEventListener('click', onOpenModal);
refs.teamModalCloseBtn.addEventListener('click', onCloseModal)

function onOpenModal() {
  refs.backdropClick.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}
window.addEventListener('keydown', onEscClick);

refs.backdropClick.addEventListener('click', onBackdropClick);

function onCloseModal() {
  refs.backdropClick.classList.add('is-hidden');
  document.body.style.overflow = 'visible';
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onEscClick(event) {
  const ESC_KEY_CODE = 'Escape';
  // console.log(event.code);

  if (event.code === ESC_KEY_CODE) {
    onCloseModal();
  }
}

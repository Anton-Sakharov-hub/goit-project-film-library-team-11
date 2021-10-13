import refs from '../js/refs.js';

const { cardsContainer, lightboxContainer, backdrop, closeBtn } = refs;

cardsContainer.addEventListener('click', onCardsContainerClick);
backdrop.addEventListener('click', onBackdropClick);

function onCardsContainerClick(e) {
    window.addEventListener('keydown', onEscKeyPress, { once: true })
  closeBtn.addEventListener('click', onCloseLightbox, { once: true });

  e.preventDefault()


    if (e.target.nodeName !== 'IMG') {
        return;
    }


    console.log(e.target.nodeName);
    lightboxContainer.classList.add('is-open');
    
}

function onCloseLightbox(e) {

  lightboxContainer.classList.remove('is-open');

  // window.removeEventListener('keyup', onEscKeyPress);
}


function onBackdropClick(e) {
   onCloseLightbox(e)
}

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    onCloseLightbox(e)
  }
}
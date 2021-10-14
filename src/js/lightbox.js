import lightboxTpl from '../templates/lightbox.hbs';
import localStorage from '../js/local_storage';
import refs from '../js/refs.js';


const { cardsContainer, lightboxContainer, backdrop, closeBtn } = refs;

cardsContainer.addEventListener('click', onCardsContainerClick);
backdrop.addEventListener('click', onBackdropClick);

function onCardsContainerClick(e) {

  e.preventDefault()


    if (e.target.nodeName !== 'IMG') {
        return;
    }

    console.log(e.target.nodeName);
    lightboxContainer.classList.add('is-open');

      const filmId = Number(e.target.dataset.filmid)

  const filmsArray = localStorage.getLocalStorage('Query'); // это массив фильмов с local storage

  const dataFilm = findFilm(filmId, filmsArray);
  
  const markup = lightboxTpl(dataFilm);


  lightboxContainer.innerHTML = markup;

  
    window.addEventListener('keydown', onEscKeyPress, { once: true })
  // closeBtn.addEventListener('click', onCloseLightbox, { once: true });

      console.log(filmsArray);
    
}

function onCloseLightbox(e) {

  lightboxContainer.classList.remove('is-open');

}


function onBackdropClick(e) {
  if (e.target === e.currentTarget) {
    onCloseLightbox(e);
  }
}

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    onCloseLightbox(e)
  }
}


function findFilm (filmId, filmsArray) {
  
  
  const filmData = filmsArray.find(film => filmId === film.id
  );

  return filmData; 
}

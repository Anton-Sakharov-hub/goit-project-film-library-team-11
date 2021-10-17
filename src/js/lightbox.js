import lightboxTpl from '../templates/lightbox.hbs';
import localStorage from '../js/local_storage';
import refs from '../js/refs.js';

const { cardsContainer, lightboxContainer, backdrop, } = refs;

let modalFilm = {};

cardsContainer.addEventListener('click', onCardsContainerClick);
backdrop.addEventListener('click', onBackdropClick);

function onCardsContainerClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  console.log(e.target.nodeName);
  lightboxContainer.classList.add('is-open');
  console.log((e.target.dataset.id));
  const filmId = Number(e.target.dataset.id);
  console.log(filmId);

  const filmsArray = localStorage.getLocalStorage('Query'); // это массив фильмов с local storage

  const dataFilm = findFilm(filmId, filmsArray);

  // localStorage.setLocalStorage('modalFilm', dataFilm);
  modalFilm =  dataFilm;

  const markup = lightboxTpl(dataFilm);

  lightboxContainer.innerHTML = markup;

  const btnsRefs = addModalBtnsRefs();
  

  // const div = document.querySelector('.lightbox__buttons');
  // console.log(div);
  btnsRefs.watchedBtn.addEventListener('click', addToWatchedHandler);
  btnsRefs.queueBtn.addEventListener('click', addToQueueHandler);
  window.addEventListener('keydown', onEscKeyPress, { once: true });
  // closeBtn.addEventListener('click', onCloseLightbox, { once: true });

  // console.log(filmsArray);
}

function onCloseLightbox(e) {
  const btnsRefs = addModalBtnsRefs();

  lightboxContainer.classList.remove('is-open');
  btnsRefs.watchedBtn.removeEventListener('click', addToWatchedHandler);
  btnsRefs.queueBtn.removeEventListener('click', addToQueueHandler);

}

function onBackdropClick(e) {
  if (e.target === e.currentTarget) {
    onCloseLightbox(e);
  }
}

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    onCloseLightbox(e);
  };
};

function findFilm(filmId, filmsArray) {
  const filmData = filmsArray.find(film => filmId === film.id);

  return filmData;
}

// ----------------------- добавляет фильмы watchedLibrary и queueLibrary на local storage -----------------

function addToWatchedHandler(e) {
  const watchedFilms = localStorage.getLocalStorage('watchedLibrary') || [];
  const filmId = Number(e.target.dataset.id);
  const checkedFilmInWatched = watchedFilms.find(el => el.id === filmId);

  if (checkedFilmInWatched) {
    localStorage.setLocalStorage('watchedLibrary', watchedFilms.filter(el => el.id !== filmId));
  } else {
    localStorage.setLocalStorage('watchedLibrary', [...watchedFilms, modalFilm]);
  };
};

function addToQueueHandler(e) {
  const queueFilms = localStorage.getLocalStorage('queueLibrary') || [];
  const filmId = Number(e.target.dataset.id);
  const checkedFilmInQueue = queueFilms.find(el => el.id === filmId);

  if (checkedFilmInQueue) {
    localStorage.setLocalStorage('queueLibrary', queueFilms.filter(el => el.id !== filmId));
  } else {
    localStorage.setLocalStorage('queueLibrary', [...queueFilms, modalFilm]);
  };
};

function addModalBtnsRefs() {
  return {
    watchedBtn: document.querySelector('.js-watched'),
    queueBtn: document.querySelector('.js-queue'),
  };
};

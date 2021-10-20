import lightboxTpl from '../templates/lightbox.hbs';
import cardsTemplate from '../templates/cardsTemplate.hbs';
import localStorage from '../js/local_storage';
import refs from '../js/refs.js';

const { cardsContainer, lightboxContainer, backdrop, closeBtn} = refs;
const { getLocalStorage, setLocalStorage } = localStorage

let modalFilm = {};
let watchedFilms = [];
let queueFilms = [];
let filmId = null;

cardsContainer.addEventListener('click', onCardsContainerClick);
backdrop.addEventListener('click', onBackdropClick);
// watchedBtn.addEventListener('click', addToWatchedHandler);
// queueBtn.addEventListener('click', addToQueueHandler);

function onCardsContainerClick(e) {
  e.preventDefault();
  // debugger;
  
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  lightboxContainer.classList.add('is-open');
  backdrop.classList.remove('visually-hidden');
  console.log(backdrop);
  console.log("отработал");
  filmId = Number(e.target.dataset.id);

  const localStorageFilms = restLocalStorage(); // это массив фильмов с local storage

  const dataFilm = findFilm(filmId, localStorageFilms);

  modalFilm =  {...dataFilm,
    isWatched: !!(getLocalStorage('watchedLibrary') || []).find(el => el.id === filmId), isQueue: Boolean((getLocalStorage('queueLibrary') || []).find(el => el.id === filmId)),
  };

  const markup = lightboxTpl(modalFilm);

  lightboxContainer.innerHTML = markup;

  const btnsRefs = addModalBtnsRefs();
  

  // const div = document.querySelector('.lightbox__buttons');
  btnsRefs.watchedBtn.addEventListener('click', addToWatchedHandler);
  btnsRefs.queueBtn.addEventListener('click', addToQueueHandler);
  window.addEventListener('keydown', onEscKeyPress, { once: true });
  // closeBtn.addEventListener('click', onCloseLightbox, { once: true });
}

function onCloseLightbox(e) {
  const btnsRefs = addModalBtnsRefs();

  lightboxContainer.classList.remove('is-open');
  backdrop.classList.add('visually-hidden');
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
  const btnsRefs = addModalBtnsRefs();
  watchedFilms = getLocalStorage('watchedLibrary') || [];
  const checkedFilmInWatched = watchedFilms.find(el => el.id === filmId);
  

  if (checkedFilmInWatched) {
    watchedFilms = watchedFilms.filter(el => el.id !== filmId);
    setLocalStorage('watchedLibrary', watchedFilms);
    makeMarkupByAtr('watched', watchedFilms);
    btnsRefs.watchedBtn.textContent = 'ADD TO WATCHED'
  } else {
    watchedFilms = [...watchedFilms, modalFilm];
    setLocalStorage('watchedLibrary', watchedFilms);
    makeMarkupByAtr('watched', watchedFilms);
    btnsRefs.watchedBtn.textContent = 'REMOVE FROM WATCHED';

  };
};

function addToQueueHandler(e) {
  const btnsRefs = addModalBtnsRefs();
  queueFilms = getLocalStorage('queueLibrary') || [];
  const checkedFilmInQueue = queueFilms.find(el => el.id === filmId);
  
  if (checkedFilmInQueue) {
    queueFilms = [...queueFilms.filter(el => el.id !== filmId)];
    setLocalStorage('queueLibrary', queueFilms);
    makeMarkupByAtr('queue', queueFilms);
    btnsRefs.queueBtn.textContent = 'ADD TO QUEUE';
  } else {
    queueFilms = [...queueFilms, modalFilm];
    setLocalStorage('queueLibrary', queueFilms);
    makeMarkupByAtr('queue', queueFilms);
    btnsRefs.queueBtn.textContent = 'REMOVE FROM QUEUE';
  };
};

function addModalBtnsRefs() {
  return {
    watchedBtn: document.querySelector('.js-watched'),
    queueBtn: document.querySelector('.js-queue'),
  };
};

// собирает все данные local storage
function restLocalStorage() {
  const filmArr = [...getLocalStorage('Query'),
    ...getLocalStorage('watchedLibrary') || [],
    ...getLocalStorage('queueLibrary') || []];
  
  return filmArr;
}

function makeMarkupByAtr(containerAtr, filmsData) {
  const container = document.querySelector(`[data-${containerAtr}]`);

  if (container) {
    container.innerHTML = cardsTemplate(filmsData);
  };
};

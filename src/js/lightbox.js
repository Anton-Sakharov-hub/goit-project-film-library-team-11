import lightboxTpl from '../templates/lightbox.hbs';
// import cardTemplate from '../template/cardMarkup.hbs';
import cardMarkup from '../templates/cardMarkup.hbs';
import cardsTemplate from '../templates/cardsTemplate.hbs';
import localStorage from '../js/local_storage';
import refs from '../js/refs.js';

const { cardsContainer, lightboxContainer, backdrop, } = refs;
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

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  lightboxContainer.classList.add('is-open');
  filmId = Number(e.target.dataset.id);

  const localStorageFilms = restLocalStorage(); // это массив фильмов с local storage

  const dataFilm = findFilm(filmId, localStorageFilms);

  modalFilm =  {...dataFilm,
    isWatched: !!(getLocalStorage('watchedLibrary') || []).find(el => el.id === filmId), isQueue: Boolean((getLocalStorage('queueLibrary') || []).find(el => el.id === filmId)),
  };
  console.log(modalFilm);

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
  // const filmId = Number(e.target.dataset.id);
  const checkedFilmInWatched = watchedFilms.find(el => el.id === filmId);
  

  if (checkedFilmInWatched) {
    watchedFilms = watchedFilms.filter(el => el.id !== filmId);
    setLocalStorage('watchedLibrary', watchedFilms);
    btnsRefs.watchedBtn.textContent = 'ADD TO WATCHED';
    cardsContainer.innerHTML = cardsTemplate(watchedFilms);
    // const elToDelete = document.querySelector(`[data-id="${filmId}"]`);
    // elToDelete.remove();
    // const markup = cardTemplate(watchedFilms);
    // lightboxContainer.innerHTML = markup;
  } else {
    console.log(modalFilm);
    // cardsContainer.insertAdjacentHTML('beforeend', cardMarkup(modalFilm))
    watchedFilms = [...watchedFilms, modalFilm];
    setLocalStorage('watchedLibrary', watchedFilms);
    cardsContainer.innerHTML = cardsTemplate(watchedFilms);
    btnsRefs.watchedBtn.textContent = 'REMOVE FROM WATCHED';
    // const markup = cardTemplate(watchedFilms);
    // lightboxContainer.innerHTML = markup;
  };
};

function addToQueueHandler(e) {
  const btnsRefs = addModalBtnsRefs();
  queueFilms = getLocalStorage('queueLibrary') || [];
  // const filmId = Number(e.target.dataset.id);
  const checkedFilmInQueue = queueFilms.find(el => el.id === filmId);
  
  if (checkedFilmInQueue) {
    queueFilms = [...queueFilms.filter(el => el.id !== filmId)];
    setLocalStorage('queueLibrary', queueFilms);
    btnsRefs.queueBtn.textContent = 'ADD TO QUEUE';
    const elToDelete = document.querySelector(`[data-id="${filmId}"]`);
    elToDelete.remove();
    // const markup = lightboxTpl(queueFilms);
    // lightboxContainer.innerHTML = markup;
  } else {
    console.log(modalFilm);
    cardsContainer.insertAdjacentHTML('beforeend', cardMarkup(modalFilm))
    queueFilms = [...queueFilms, modalFilm];
    setLocalStorage('queueLibrary', queueFilms);
    btnsRefs.queueBtn.textContent = 'REMOVE FROM QUEUE';
    // const markup = lightboxTpl(queueFilms);
    // lightboxContainer.innerHTML = markup;
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


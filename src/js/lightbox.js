import lightboxTpl from '../templates/lightbox.hbs';
import localStorage from '../js/local_storage';
import refs from '../js/refs.js';

const { cardsContainer, lightboxContainer, backdrop, closeBtn, } = refs;

cardsContainer.addEventListener('click', onCardsContainerClick);
backdrop.addEventListener('click', onBackdropClick);

let watchedArr = [];
let queueArr = [];

function onCardsContainerClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  console.log(e.target.nodeName);
  lightboxContainer.classList.add('is-open');

  const filmId = Number(e.target.dataset.filmid);
  // renderModalCard(data);
  // console.log(e.target.dataset.filmid);

  const filmsArray = localStorage.getLocalStorage('Query'); // это массив фильмов с local storage

  // id = 550988;
  const dataFilm = findFilm(filmId, filmsArray);
  localStorage.setLocalStorage('modalFilm', dataFilm);

  const markup = lightboxTpl(dataFilm);

  lightboxContainer.innerHTML = markup;

  const watchedBtn = document.querySelector('.js-watched');
  const queueBtn = document.querySelector('.js-queue');

  // const div = document.querySelector('.lightbox__buttons');
  // console.log(div);
  watchedBtn.addEventListener('click', addToWatchedHandler);
  queueBtn.addEventListener('click', addToQueueHandler);
  window.addEventListener('keydown', onEscKeyPress, { once: true });
  // closeBtn.addEventListener('click', onCloseLightbox, { once: true });

  // console.log(filmsArray);
}

function onCloseLightbox(e) {
  lightboxContainer.classList.remove('is-open');

  // window.removeEventListener('keyup', onEscKeyPress);
}

function onBackdropClick(e) {
  if (e.target === e.currentTarget) {
    onCloseLightbox(e);
  }
}

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    onCloseLightbox(e);
  }
}

// function renderModalCard(data) {
//   lightboxContainer.insertAdjacentHTML('beforeend', lightboxTpl(data));
// }

function findFilm(filmId, filmsArray) {
  // console.log(filmId);

  const filmData = filmsArray.find(film => filmId === film.id);

  return filmData;
}

// ----------------------- добавляет фильмы watched на local storage -----------------
function addToWatchedHandler(e) {
  
  const modalFilm = localStorage.getLocalStorage('modalFilm');
  watchedArr.push(modalFilm);
  localStorage.setLocalStorage('watched', watchedArr);

  const filmId = Number(e.target.dataset.id);

  const watchedFilms = localStorage.getLocalStorage('watched');
  const findFilmToDelete = watchedFilms.find(el => {
    console.log(watchedFilms.indexOf(el));
    return el.id === filmId;
  }
  );
  console.log(findFilmToDelete);
  const index = watchedFilms.indexOf(findFilmToDelete);
  console.log(index);


  // if (findFilmToDelete) {
  //   watchedFilms.
  // }
};
function addToQueueHandler(e) {
  
  const modalFilm = localStorage.getLocalStorage('modalFilm');
  queueArr.push(modalFilm);
  localStorage.setLocalStorage('queue', queueArr);

  const filmId = Number(e.target.dataset.id);

  const queueFilms = localStorage.getLocalStorage('queue');
  const findFilmToDelete = queueFilms.find(el => {
    console.log(queueFilms.indexOf(el));
    return el.id === filmId;
  }
  );
  console.log(findFilmToDelete);
  const index = queueFilms.indexOf(findFilmToDelete);
  console.log(index);


  // if (findFilmToDelete) {
  //   watchedFilms.
  // }
};

// console.log(localStorage.getLocalStorage('watched'));


import lightboxTpl from '../templates/lightbox.hbs';
import localStorage from '../js/local_storage';
import refs from '../js/refs.js';

const { cardsContainer, lightboxContainer, backdrop, closeBtn, watchedBtn, queueBtn } = refs;

cardsContainer.addEventListener('click', onCardsContainerClick);
backdrop.addEventListener('click', onBackdropClick);

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
  console.log(watchedBtn);
  // watchedBtn.addEventListener('click', addToWatchedHandler);

  window.addEventListener('keydown', onEscKeyPress, { once: true });
  // closeBtn.addEventListener('click', onCloseLightbox, { once: true });

  console.log(filmsArray);
}

function onCloseLightbox(e) {
  lightboxContainer.classList.remove('is-open');

  // window.removeEventListener('keyup', onEscKeyPress);
}

function onBackdropClick(e) {
  if (e.target === e.currentTarget) {
    onCloseLightbox(e);
    // lightboxContainer.insertAdjacentHTML = '';
  }
}

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    onCloseLightbox(e);
    // lightboxContainer.insertAdjacentHTML = '';
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
function addToWatchedHandler() {
  let watchedArr = [];
  const modalFilm = localStorage.getLocalStorage('modalFilm');
  watchedArr.push(modalFilm);
  localStorage.setLocalStorage('watched', watchedArr);
}
// watchedBtn.addEventListener('click', addToWatchedHandler);

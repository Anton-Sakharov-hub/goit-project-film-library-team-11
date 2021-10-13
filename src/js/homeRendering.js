import requests from './requests.js';

export default function homeRendering() {
  requests
    .trendingFetch()
    .then(({ results }) => {
      console.log(results);
      requests.createMarkup(results);
      // добавляет в local storage
      addFilmsToLclStorage(results);
    })
    .catch(err => console.log(err));
}

homeRendering();

// логика добавления на local storge 

function addFilmsToLclStorage(ResponseRusult) {
  const localFilmsData = JSON.stringify({filmsArr: ResponseRusult});
  localStorage.setItem('trending_films', localFilmsData);
}

function getFilmsFromLclStorage(key) {
  const localFilmsData = JSON.parse(localStorage.getItem(key));
  const { filmsArr } = localFilmsData;

  return filmsArr;
}

// функция для поиска фильма по id

function findFilm (filmId, filmsArray) {
  const filmData = filmsArray.find(film => film.id === filmId);

  return filmData;
}

const filmsArray = getFilmsFromLclStorage('trending_films'); // это массив фильмов с local storage

// id = 550988;
console.log(findFilm(550988, filmsArray));
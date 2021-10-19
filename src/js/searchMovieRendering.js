import requests from './requests.js';
import refs from './refs.js';
import LS from './local_storage.js';
import { togleClass, createMarkup, clearInput } from './commonFunction.js';
import GenresDataWork from './GenresDataWork';
import { searchMoviePagination } from './pagination-btns';
import trendingFetch from './homeRendering';

//импорт toastr notification
import toastr from 'toastr';
import 'toastr/build/toastr.css';
//настройи toastr notification
toastr.options = {
  closeButton: false,
  debug: true,
  newestOnTop: false,
  progressBar: true,
  positionClass: 'toast-top-center',
  preventDuplicates: true,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '3000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

const { formSearch, paginationHome, paginationSearch } = refs;

const genresDataWork = new GenresDataWork();

formSearch.addEventListener('submit', onFormSearchsubmit);

function onFormSearchsubmit(e) {
  const input = e.currentTarget.elements.query;
  e.preventDefault();
  updateQuery(input.value);
  
  if (input.value.trim() == '') {
    toastr.warning('Пожалуйста, введите ваш запроc');
    clearInput(input);
  }

  requests
    .movieFetch()
    .then(({ results, total_results }) => {
      
      if (results.length < 1) {
        toastr.error('Фильм не найден! Измените ввод и повторите попытку');
        clearInput(input);
        trendingFetch();
      }
      createMarkup(results);
      clearInput(input);
      togleClass(paginationSearch, paginationHome, 'visually-hidden');
      searchMoviePagination.setTotalItems(total_results);
      searchMoviePagination.movePageTo(1);
      LS.setLocalStorage('Query', results);
    })
    .catch(err => console.log(err));
}

const updateQuery = newQuery => {
  requests.query = newQuery;
};

searchMoviePagination.on('afterMove', event => {
  requests.page = event.page;
  requests
    .movieFetch()
    .then(({ results }) => {
      genresDataWork.addGenres(results);
      genresDataWork.changeDate(results);
      createMarkup(results);
      LS.setLocalStorage('Query', results);
    })
    .catch(err => console.log(err));
});

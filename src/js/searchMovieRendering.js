import requests from './requests.js';
import refs from './refs.js';
import LS from './local_storage.js';
import { searchMoviePagination } from './pagination-btns.js';
import { togleClass, createMarkup } from './commonFunction.js';
const { formSearch, paginationHome, paginationSearch } = refs;

formSearch.addEventListener('submit', onFormSearchsubmit);

function onFormSearchsubmit(e) {
  const input = e.currentTarget.elements.query;
  e.preventDefault();
  updateQuery(input.value);

  requests
    .movieFetch()
    .then(({ results, total_results }) => {
      createMarkup(results);
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
      createMarkup(results);
      LS.setLocalStorage('Query', results);
    })
    .catch(err => console.log(err));
});
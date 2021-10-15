import requests from './requests.js';
import refs from '../js/refs.js';
import LS from './local_storage.js';
import { searchMoviePagination } from './pagination-btns';
const { formSearch } = refs;

formSearch.addEventListener('submit', onFormSearchsubmit);

function onFormSearchsubmit(e) {
  const input = e.currentTarget.elements.query;
  e.preventDefault();
  updateQuery(input.value);

  requests
    .movieFetch()
    .then(({ results, total_results }) => {
      requests.createMarkup(results);
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
      requests.createMarkup(results);
      LS.setLocalStorage('Query', results);
    })
    .catch(err => console.log(err));
});

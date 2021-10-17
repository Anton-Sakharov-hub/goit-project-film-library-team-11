import requests from './requests.js';
import refs from './refs.js';
import LS from './local_storage.js';
import { togleClass, createMarkup } from './commonFunction.js';
import GenresDataWork from './GenresDataWork';
import { searchMoviePagination } from './pagination-btns';
const { header, formSearch, paginationHome, paginationSearch } = refs;

const genresDataWork = new GenresDataWork();

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

searchMoviePagination.on('afterMove', e => {
  requests.page = e.page;
  requests
    .movieFetch()
    .then(({ results }) => {
      genresDataWork.addGenres(results);
      genresDataWork.changeDate(results);
      createMarkup(results);
      LS.setLocalStorage('Query', results);
      header.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    })
    .catch(err => console.log(err));
});

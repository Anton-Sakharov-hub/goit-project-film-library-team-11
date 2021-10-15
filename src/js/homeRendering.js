import requests from './requests.js';
import refs from '../js/refs.js';
import LS from './local_storage.js';
import { homePagePagination } from './pagination-btns';
const { paginationHome, paginationSearch } = refs;

export default function homeRendering() {
  requests
    .trendingFetch()
    .then(({ results, total_results }) => {
      requests.createMarkup(results);

      paginationSearch.classList.add('visually-hidden');
      paginationHome.classList.remove('visually-hidden');

      homePagePagination.setTotalItems(total_results);
      homePagePagination.movePageTo(1);
      LS.setLocalStorage('Query', results);
    })
    .catch(err => console.log(err));
}

homePagePagination.on('afterMove', event => {
  requests.page = event.page;
  requests
    .trendingFetch()
    .then(({ results }) => {
      requests.createMarkup(results);
      LS.setLocalStorage('Query', results);
    })
    .catch(err => console.log(err));
});

homeRendering();

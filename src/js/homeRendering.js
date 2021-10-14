import requests from './requests.js';
import LS from './local_storage.js';
import { homePagePagination } from './pagination-btns';

export default function homeRendering() {
  requests
    .trendingFetch()
    .then(({ results, total_results }) => {
      requests.createMarkup(results);
      homePagePagination._options.totalItems = total_results;
      LS.setLocalStorage('Query', results);
    })
    .catch(err => console.log(err));
}

homeRendering();

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

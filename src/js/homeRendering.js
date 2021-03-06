import requests from './requests.js';
import refs from './refs.js';
import LS from './local_storage.js';
import { homePagePagination } from './pagination-btns';
import { togleClass, createMarkup, showPreloader, hidePreloader } from './commonFunctions';
import GenresDataWork from './GenresDataWork';
const { header, paginationHome, paginationSearch } = refs;

const genresDataWork = new GenresDataWork();

export default function homeRendering() {
  showPreloader();
  requests
    .trendingFetch()
    .then(({ results, total_results }) => {
      createMarkup(results);
      togleClass(paginationHome, paginationSearch, 'visually-hidden');
      homePagePagination.setTotalItems(total_results);
      homePagePagination.movePageTo(1);
      LS.setLocalStorage('Query', results);
    })
    .catch(err => console.log(err))
    .finally(hidePreloader);
}

homePagePagination.on('afterMove', event => {
  showPreloader();
  requests.page = event.page;
  requests
    .trendingFetch()
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
    .catch(err => console.log(err))
    .finally(hidePreloader);
});

homeRendering();


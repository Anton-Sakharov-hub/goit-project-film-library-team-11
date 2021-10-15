import requests from './requests.js';
import refs from '../js/refs.js';
import LS from './local_storage.js';
import GenresDataWork from './genres';
// import cardMarkup from '../template/cardMarkup.hbs';
const { formSearch, cardContainer } = refs;

const genresDataWork = new GenresDataWork();

formSearch.addEventListener('submit', onFormSearchsubmit);

function onFormSearchsubmit(e) {
  const input = e.currentTarget.elements.query;
  e.preventDefault();
  // clearMainScn();
  updateQuery(input.value);

  requests
    .movieFetch()
    .then(({ results }) => {
      // cardContainer.insertAdjacentHTML('beforeend', cardMarkup(results));
      console.log(results);
      genresDataWork.addGenres(results);
      requests.createMarkup(results);
      LS.setLocalStorage('Query', results);
    })
    .catch(err => console.log(err));
  // input.value = '';
}

// const clearMainScn = () => {
//   cardContainer.innerHTML = '';
// };

const updateQuery = newQuery => {
  requests.query = newQuery;
};
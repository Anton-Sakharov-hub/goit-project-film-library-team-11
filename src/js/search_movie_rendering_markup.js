import searchMovie from './search_movie_fech.js';
import refs from '../js/refs.js';
import cardMarkup from '../template/cardMarkup.hbs';
const { formSearch, cardContainer } = refs;

formSearch.addEventListener('submit', onFormSearchsubmit);

function onFormSearchsubmit(e) {
  const input = e.currentTarget.elements.query;
  e.preventDefault();
  clearMainScn();
  updateQuery(input.value);

  searchMovie
    .fetchMovie()
    .then(({ results }) => {
      cardContainer.insertAdjacentHTML('beforeend', cardMarkup(results));
    })
    .catch(err => console.log(err));
}

const clearMainScn = () => {
  cardContainer.innerHTML = '';
};

const updateQuery = newQuery => {
  searchMovie.query = newQuery;
};

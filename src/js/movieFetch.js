import cardMarkup from '../template/cardMarkup.hbs';

const BASE_URL = `https://api.themoviedb.org/3`;
const KEY = ``;

export default function movieFetch(searchQuery) {
  if (searchQuery) {
    return fetch(`${BASE_URL}/movie/popular?api_key=${KEY}&language=en-US`)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('Error');
      })
      .catch(error => {
        console.log(error);
      });
  }
}
console.log(movieFetch);

import { API_KEY } from './api_key';
import cardsTemplate from '../template/cardMarkup.hbs';
import refs from './refs';

export default {
  query: '',
  page: 1,
  movie_id: null,
  // -----запрос трендов-----
  async trendingFetch() {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${this.page}`,
    );
    if (response.ok) return response.json();
    throw new Error('Error fetching data');
  },
  // -----запрос фильма по ключевому слову-----
  async movieFetch() {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=${this.page}&query=${this.query}&include_adult=false`,
    );
    if (response.ok) return response.json();
    throw new Error('Error fetching data');
  },
  // -------запрос деталей одного фильма по ID----
  async movieDetailsFetch() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${this.movie_id}?api_key=${API_KEY}&language=en-US`,
    );
    if (response.ok) return response.json();
    throw new Error('Error fetching data');
  },

  createMarkup(films) {
    refs.cardContainer.innerHTML = cardsTemplate(films);
  },
};

import { API_KEY } from './api_key';

export default {
  query: '',
  page: 1,
  async fetchMovie() {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${this.query}&include_adult=false`,
    );
    if (response.ok) return response.json();
    throw new Error('Error fetching data');
  },
};

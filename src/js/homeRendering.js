import requests from './requests.js';
import LS from './local_storage.js';
import GenresDataWork from './genres'

const genresDataWork = new GenresDataWork();

export default function homeRendering() {
  requests
    .trendingFetch()
    .then(({ results }) => {
      genresDataWork.addGenres(results);
      requests.createMarkup(results);
      LS.setLocalStorage('Query', results);
    })
    .catch(err => console.log(err));
}

homeRendering();

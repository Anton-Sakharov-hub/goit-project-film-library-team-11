import requests from './requests.js';
import LS from './local_storage.js';
import {renderGenres, genresArr} from './genres'

export default function homeRendering() {
  requests
    .trendingFetch()
    .then(({ results }) => {
      // console.log(results);
      requests.createMarkup(results);
      renderGenres();
      LS.setLocalStorage('Query', results);
    })
    .catch(err => console.log(err));
}

homeRendering();

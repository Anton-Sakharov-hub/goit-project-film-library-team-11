import requests from './requests.js';
import LS from './local_storage.js';

export default function homeRendering() {
  requests
    .trendingFetch()
    .then(({ results }) => {
      // console.log(results);
      requests.createMarkup(results);
      LS.setLocalStorage('Query', results);
    })
    .catch(err => console.log(err));
}

homeRendering();

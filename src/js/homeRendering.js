import requests from './requests.js';

export default function homeRendering() {
  requests
    .trendingFetch()
    .then(({ results }) => {
      console.log(results);
      requests.createMarkup(results);
    })
    .catch(err => console.log(err));
}

homeRendering();


import { API_KEY } from "./api_key";
import cardsTemplate from '../template/cardMarkup.hbs'
import refs from './refs'

async function trendingFetch () {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
    if (response.ok) return response.json();
    throw new Error('Error fetching data');
};

function createMarkup (films) {
    refs.cardContainer.innerHTML = cardsTemplate(films);
};

trendingFetch().then(({ results }) => {
    console.log(results);
    createMarkup(results);
}).catch(err => console.log(err));

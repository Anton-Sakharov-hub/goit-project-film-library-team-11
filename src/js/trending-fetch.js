
import { API_KEY } from "./api_key"

async function trendingFetch () {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
    if (response.ok) return response.json();
    throw new Error('Error fetching data');
}

trendingFetch().then(console.log).catch(err => console.log(err));
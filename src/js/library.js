import refs from '../js/refs.js';
import cardMarkup from '../template/cardMarkup.hbs';
import setToLS from '../js/lightbox';
import localStorage from '../js/local_storage';


const { btnMyLibrary, cardContainer, btnQueue, btnWatched, } = refs;

btnMyLibrary.addEventListener('click', onBtnMyLibraryCLick);
btnWatched.addEventListener('click', onBtnWatchedCLick);
btnQueue.addEventListener('click', onBtnQueueCLick);

function onBtnMyLibraryCLick(e) {
    e.preventDefault();
    cardContainer.innerHTML = '';
}


function onBtnWatchedCLick(e) {
    e.preventDefault();
    const watchedArray = localStorage.getLocalStorage('watched');
    console.log(localStorage.getLocalStorage('watched'));


    const markup = cardMarkup(watchedArray);

  cardContainer.innerHTML = markup;
}

function onBtnQueueCLick(e) {
    e.preventDefault();
    const queueArray = localStorage.getLocalStorage('queue');
    console.log(localStorage.getLocalStorage('queue'));


    const markup = cardMarkup(queueArray);

  cardContainer.innerHTML = markup;
}
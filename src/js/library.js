import refs from '../js/refs.js';
import cardMarkup from '../template/cardMarkup.hbs';
import localStorage from '../js/local_storage';


const { btnMyLibrary, cardContainer, btnQueue, btnWatched, sentinel, paginationHome, logo, btnHome } = refs;

btnMyLibrary.addEventListener('click', onBtnMyLibraryCLick);
btnWatched.addEventListener('click', onBtnWatchedCLick);
btnQueue.addEventListener('click', onBtnQueueCLick);
logo.addEventListener('click', onLogoCLick);
btnHome.addEventListener('click', onBtnHomeCLick);

let watchedQueueFlag = true;
let visualNumberOfItems = 3;
let startIndex = 3;

function onBtnMyLibraryCLick(e) {
    e.preventDefault();
  cardContainer.innerHTML = '';
  paginationHome.classList.add('visually-hidden');
  sentinel.classList.remove('display-none');
  // btnWatched.classList.add('button__current');
  // renewParam(3);
  onBtnWatchedCLick(e)
}


function onBtnWatchedCLick(e) {
  
  e.preventDefault();
  btnQueue.classList.remove('button__current');
  btnWatched.classList.add('button__current');
  watchedQueueFlag = true;
  cardContainer.innerHTML = '';
  renewParam(3);
    const watchedArray = localStorage.getLocalStorage('watchedLibrary') || [];
    // console.log(localStorage.getLocalStorage('watchedLibrary'));

    // const markup = cardMarkup(watchedArray);

  // cardContainer.innerHTML = markup;


  const partOfItems = watchedArray.slice(0, 3);
  
  cardContainer.insertAdjacentHTML('beforeend', cardMarkup(partOfItems));
}

function onBtnQueueCLick(e) {
  e.preventDefault();
  btnWatched.classList.remove('button__current');
  btnQueue.classList.add('button__current');
  watchedQueueFlag = false;
  cardContainer.innerHTML = '';
  renewParam(3);
  
// console.log(renevParam(3));
    const queueArray = localStorage.getLocalStorage('queueLibrary') || [];
    // console.log(localStorage.getLocalStorage('queueLibrary'));

  

  //   const markup = cardMarkup(queueArray);

  // cardContainer.innerHTML = markup;

  const partOfQueueItems = queueArray.slice(0, 3);
  
  cardContainer.insertAdjacentHTML('beforeend', cardMarkup(partOfQueueItems));

  // loadMoreQueue()
}

const loadMoreWatched = function () {
  const watchedLibrary = localStorage.getLocalStorage('watchedLibrary') || [];
  console.log(watchedLibrary);

   let numberOfItems = 3;
  visualNumberOfItems += numberOfItems;
  if (watchedLibrary === null) {
    return;
  }
  const visualItems = watchedLibrary.slice(startIndex, visualNumberOfItems);
  cardContainer.insertAdjacentHTML('beforeend', cardMarkup(visualItems));
  startIndex += numberOfItems;
}


const loadMoreQueue = function () {
  const queueLibrary = localStorage.getLocalStorage('queueLibrary') || [];
  console.log(queueLibrary);

   let numberOfItems = 3;
  visualNumberOfItems += numberOfItems;
  if (queueLibrary === null) {
    return;
  }
  const visualItems = queueLibrary.slice(startIndex, visualNumberOfItems);
  cardContainer.insertAdjacentHTML('beforeend', cardMarkup(visualItems));
  startIndex += numberOfItems;
}

function onEntry(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (watchedQueueFlag) {
        loadMoreWatched();
      } else {
        loadMoreQueue();
      }
    }
  });
}

const options = {
  threshold: 0.8,
  rootMargin: '0px 0px 50px 0px',
};

const interObserv = new IntersectionObserver(onEntry, options);

interObserv.observe(sentinel);



function renewParam(num) {
  visualNumberOfItems = num;
  startIndex = num;
}


function onBtnHomeCLick(e) {
    e.preventDefault();
  sentinel.classList.add('display-none');
}

function onLogoCLick(e) {
    e.preventDefault();
  sentinel.classList.add('display-none');
}
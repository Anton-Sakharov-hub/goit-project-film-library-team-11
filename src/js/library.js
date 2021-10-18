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
    const watchedArray = localStorage.getLocalStorage('watchedLibrary');
    // console.log(localStorage.getLocalStorage('watchedLibrary'));


    const markup = cardMarkup(watchedArray);

  cardContainer.innerHTML = markup;
}

function onBtnQueueCLick(e) {
    e.preventDefault();
    const queueArray = localStorage.getLocalStorage('queueLibrary');
    // console.log(localStorage.getLocalStorage('queueLibrary'));


    const markup = cardMarkup(queueArray);

  cardContainer.innerHTML = markup;
}



















// рабочий код
// [].reduce((acc, item) => {
//    acc.byId[item.id] = item;
//    acc.allIds.push(item.id);
//    return acc   
// }, { byId: {}, allIds: [] })
// {byId: {…}, allIds: Array(0)}

// пример работы
// [{ id:1, name: 'Vasya'}, {id:3, name: 'Petya'}].reduce((acc, item) => {
//    acc.byId[item.id] = item;
//    acc.allIds.push(item.id);
//    return acc   
// }, { byId: {}, allIds: [] })

// пример создания normolize data объекта 
// var normilizedObj = [{ id:1, name: 'Vasya'}, {id:3, name: 'Petya'}].reduce((acc, item) => {
//    acc.byId[item.id] = item;
//    acc.allIds.push(item.id);
//    return acc   
// }, { byId: {}, allIds: [] })

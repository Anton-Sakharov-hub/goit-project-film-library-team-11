import refs from './refs';
import cardsTemplate from '../templates/cardsTemplate.hbs';
const { cardContainer, formSearch } = refs;

function togleClass(refsRemove, refsAdd, classs) {
  refsRemove.classList.remove(classs);
  refsAdd.classList.add(classs);
}

function createMarkup(films) {
  cardContainer.innerHTML = cardsTemplate(films);
}

 function clearInput() {
  const input = formSearch.elements.query;
  input.value = '';
}


//ф-ция для отображения загрузчика
function hidePreloader() {
  refs.preloader.classList.add('hidden');
}

function showPreloader() {
  refs.preloader.classList.remove('hidden');
}

export { togleClass, createMarkup, clearInput, hidePreloader, showPreloader };

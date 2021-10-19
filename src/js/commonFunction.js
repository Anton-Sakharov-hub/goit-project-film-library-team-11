import refs from './refs';
import cardsTemplate from '../template/cardMarkup.hbs';
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

export { togleClass, createMarkup, clearInput };

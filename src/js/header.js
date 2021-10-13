import refs from '../js/refs.js';

const { header, btnHome, btnMyLibrary, formSearch, navLibrary } = refs;

btnHome.addEventListener('click', onBtnHomeClick);
btnMyLibrary.addEventListener('click', onBtnMyLibraryClick);

function onBtnMyLibraryClick() {
  formSearch.classList.add('visually-hidden');
  btnMyLibrary.classList.add('current-page');
  header.classList.add('header__bg-ml');
  btnHome.classList.remove('current-page');
  navLibrary.classList.remove('visually-hidden');
  header.classList.remove('header__bg-home');
}

function onBtnHomeClick() {
  formSearch.classList.remove('visually-hidden');
  btnMyLibrary.classList.remove('current-page');
  header.classList.remove('header__bg-ml');
  btnHome.classList.add('current-page');
  navLibrary.classList.add('visually-hidden');
  header.classList.add('header__bg-home');
}

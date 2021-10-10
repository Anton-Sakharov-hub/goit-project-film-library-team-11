import refs from '../js/refs.js';

const { header, btnHome, btnMyLibrary, btnSubmit, formSearch, navLibrary } = refs;

btnMyLibrary.addEventListener('click', onBtnMyLibraryClick);

function onBtnMyLibraryClick() {
  formSearch.classList.add('visually-hidden');
  btnMyLibrary.classList.add('current-page');
  header.classList.add('header__bg-ml');
  btnHome.classList.remove('current-page');
  navLibrary.classList.remove('visually-hidden');
  header.classList.remove('header__bg-home');
}

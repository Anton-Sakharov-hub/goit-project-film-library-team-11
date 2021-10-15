import refs from './refs.js';
import homeRendering from './homeRendering.js';
import { togleClass, clearInput } from './commonFunction.js';

const { header, logo, btnHome, btnMyLibrary, formSearch, navLibrary } = refs;

logo.addEventListener('click', onLogoClick);
btnHome.addEventListener('click', onBtnHomeClick);
btnMyLibrary.addEventListener('click', onBtnMyLibraryClick);

function onLogoClick() {
  homeRendering();
  clearInput();
}

function onBtnMyLibraryClick() {
  togleClass(navLibrary, formSearch, 'visually-hidden');
  togleClass(btnHome, btnMyLibrary, 'current-page');
  header.classList.add('header__bg-ml');
  header.classList.remove('header__bg-home');
}

function onBtnHomeClick() {
  togleClass(formSearch, navLibrary, 'visually-hidden');
  togleClass(btnMyLibrary, btnHome, 'current-page');
  header.classList.remove('header__bg-ml');
  header.classList.add('header__bg-home');
  homeRendering();
  clearInput();
}

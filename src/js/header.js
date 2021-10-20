import refs from './refs.js';
import homeRendering from './homeRendering.js';
import { togleClass, clearInput } from './commonFunctions.js';

const { header, logo, btnHome, btnMyLibrary, formSearch, navLibrary } = refs;

logo.addEventListener('click', onBtnLogoHomeClick);
btnHome.addEventListener('click', onBtnLogoHomeClick);
btnMyLibrary.addEventListener('click', onBtnMyLibraryClick);

function onBtnLogoHomeClick() {
  togleClass(formSearch, navLibrary, 'visually-hidden');
  togleClass(btnMyLibrary, btnHome, 'current-page');
  header.classList.remove('header__bg-ml');
  header.classList.add('header__bg-home');
  homeRendering();
  clearInput();
}

function onBtnMyLibraryClick() {
  togleClass(navLibrary, formSearch, 'visually-hidden');
  togleClass(btnHome, btnMyLibrary, 'current-page');
  header.classList.add('header__bg-ml');
  header.classList.remove('header__bg-home');
}

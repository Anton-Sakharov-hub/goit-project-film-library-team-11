import refs from './refs';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

if (!localStorage.getItem('Theme')) {
  localStorage.setItem('Theme', Theme.LIGHT);
  refs.body.classList.add(Theme.LIGHT);
} else {
  refs.body.classList.add(localStorage.getItem('Theme'));
  if (localStorage.getItem('Theme') === Theme.LIGHT) {
    refs.inputCheckbox.checked = false;
  } else {
    refs.inputCheckbox.checked = true;
  }
}

refs.inputCheckbox.addEventListener('change', () => {
  if (localStorage.getItem('Theme') === Theme.LIGHT) {
    localStorage.setItem('Theme', Theme.DARK);
    refs.body.classList.replace(Theme.LIGHT, Theme.DARK);
  } else {
    localStorage.setItem('Theme', Theme.LIGHT);
    refs.body.classList.replace(Theme.DARK, Theme.LIGHT);
  }
});

// const Theme = {
//   LIGHT: 'light-theme',
//   DARK: 'dark-theme',
// };

// // дефолтная тема
// function defaultTheme() {
//   //const defaultTheme = localStorage.getItem('Theme');
//   const defaultTheme = localStorage['Theme'];

//   if (defaultTheme === Theme.DARK) {
//     body.classList.add(Theme.DARK);
//     inputCheckbox.checked = true;
//   }
// }
// defaultTheme();

// //смена темы со светлой на тёмную

// bodyRef.addEventListener('change', onThemeChenge);

// function onThemeChenge(event) {
//   if (event.target.checked) {
//     body.classList.remove(Theme.LIGHT);
//     body.classList.add(Theme.DARK);

//     localStorage.setItem('Theme', Theme.DARK);
//   } else {
//     body.classList.remove(Theme.DARK);
//     body.classList.add(Theme.LIGHT);

//     localStorage.setItem('Theme', Theme.LIGHT);
//   }
// }

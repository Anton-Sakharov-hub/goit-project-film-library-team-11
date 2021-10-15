import localStorage from "./local_storage";


export default class GenresDataWork {
  constructor() {
    this.genresData = [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 16, name: 'Animation' },
      { id: 35, name: 'Comedy' },
      { id: 80, name: 'Crime' },
      { id: 99, name: 'Documentary' },
      { id: 18, name: 'Drama' },
      { id: 10751, name: 'Family' },
      { id: 14, name: 'Fantasy' },
      { id: 36, name: 'History' },
      { id: 27, name: 'Horror' },
      { id: 10402, name: 'Music' },
      { id: 9648, name: 'Mystery' },
      { id: 10749, name: 'Romance' },
      { id: 878, name: 'Science Fiction' },
      { id: 10770, name: 'TV Movie' },
      { id: 53, name: 'Thriller' },
      { id: 10752, name: 'War' },
      { id: 37, name: 'Western' },
    ];
  }
  
  addGenres(filmData) {
    const genresIdsArr = filmData.map(film => {
      return film.genre_ids;
    });

    const genresNameArr = genresIdsArr.map(el => {
      return el.map(id => {
        const genreObj = this.genresData.find(gen => gen.id === id);
        return (id = genreObj.name);
      });
    });
    
    const genresNamesForFilmData = genresNameArr.map(ArrNames => {
      if (ArrNames.length === 0) {
        return (ArrNames = 'No genre information');
      }

      if (ArrNames.length === 1) {
        return ArrNames;
      }
      
      if (ArrNames.length === 2) {
        return `${ArrNames[0]},  ${ArrNames[1]}`;
      }
      
      if (ArrNames.length > 2) {
        return `${ArrNames[0]},  ${ArrNames[1]},  Other`;
      }
    });
    
    let index = 0;
    filmData.forEach(el => {
      el.genre_ids = genresNamesForFilmData[index];
      index += 1;
    });
  };
};


// export const genresData = [
//       { id: 28, name: 'Action' },
//       { id: 12, name: 'Adventure' },
//       { id: 16, name: 'Animation' },
//       { id: 35, name: 'Comedy' },
//       { id: 80, name: 'Crime' },
//       { id: 99, name: 'Documentary' },
//       { id: 18, name: 'Drama' },
//       { id: 10751, name: 'Family' },
//       { id: 14, name: 'Fantasy' },
//       { id: 36, name: 'History' },
//       { id: 27, name: 'Horror' },
//       { id: 10402, name: 'Music' },
//       { id: 9648, name: 'Mystery' },
//       { id: 10749, name: 'Romance' },
//       { id: 878, name: 'Science Fiction' },
//       { id: 10770, name: 'TV Movie' },
//       { id: 53, name: 'Thriller' },
//       { id: 10752, name: 'War' },
//       { id: 37, name: 'Western' },
//     ];
  
// export function addGenres(filmData) {
  //   const genresIdsArr = filmData.map(film => {
    //     return film.genre_ids;
    //   });
//   console.log(genresIdsArr);

//   const genresNameArr = genresIdsArr.map(el => {
//     return el.map(id => {
//       const genreObj = genresData.find(gen => gen.id === id);
//       return (id = genreObj.name);
//     });
//   });
//   console.log(genresNameArr);

//   const genresNamesForFilmData = genresNameArr.map(ArrNames => {
//     if (ArrNames.length === 0) {
//       return (ArrNames = 'No genre information');
//     }

//     if (ArrNames.length === 1) {
//       return ArrNames;
//     }

//     if (ArrNames.length === 2) {
//       return `${ArrNames[0]},  ${ArrNames[1]}`;
//     }

//     if (ArrNames.length > 2) {
//       return `${ArrNames[0]},  ${ArrNames[1]},  Other`;
//     }
//   });

//   console.log(genresNamesForFilmData);

//   let index = 0;
//   filmData.forEach(el => {
//     el.genre_ids = genresNamesForFilmData[index];
//     index += 1;
//   });
// };

// localStorage.setLocalStorage('Query', addGenres(filmData));






// export function renderGenres() {
//   let genresEl = document.querySelectorAll('.genresSpan');
//   genresEl = [...genresEl]
//   console.log(genresEl);
//   // let idData = (genresEl.dataset.genres).split(',');
// //   idData = idData.map(el => Number(el));
  
// //   const filtredId = genresArr.filter(genre => { })
// }

//   let index = 0;
//   filmData.forEach(el => {
  //     el.genre_ids = genresName[index];
  //     index += 1;
//   });
// };
// } 
// const filmData = localStorage.getLocalStorage('Query');
// console.log(filmData);

// const filmDataWithGenres = filmData.map(el => el.genre_ids.map(id => ))

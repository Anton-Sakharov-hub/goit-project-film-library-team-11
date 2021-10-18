import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import refs from './refs.js';

const { paginationHome, paginationSearch } = refs;

const options1 = {
  totalItems: 1000,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  usageStatistics: false,
  firstItemClassName: 'tui-first-child1',
  lastItemClassName: 'tui-last-child2',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected acent">{{page}}</strong>',
  },
};

const options2 = {
  totalItems: 1000,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  usageStatistics: false,
  firstItemClassName: 'tui-first-child1',
  lastItemClassName: 'tui-last-child2',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected acent">{{page}}</strong>',
  },
};

const homePagePagination = new Pagination(paginationHome, options1);
const searchMoviePagination = new Pagination(paginationSearch, options2);

export { searchMoviePagination, homePagePagination };

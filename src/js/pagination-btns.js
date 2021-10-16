import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import refs from '../js/refs.js';
const { paginationHome, paginationSearch } = refs;
const options1 = {
  totalItems: 1000,
  itemsPerPage: 20,
  visiblePages: 8,
  page: 1,
  centerAlign: true,
  usageStatistics: false,
};

const options2 = {
  totalItems: 1000,
  itemsPerPage: 20,
  visiblePages: 8,
  page: 1,
  centerAlign: true,
  usageStatistics: false,
};

const homePagePagination = new Pagination(paginationHome, options1);
const searchMoviePagination = new Pagination(paginationSearch, options2);

export { searchMoviePagination, homePagePagination };

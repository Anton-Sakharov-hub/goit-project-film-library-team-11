import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

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

const container1 = document.getElementById('pagination1');
const container2 = document.getElementById('pagination2');
const homePagePagination = new Pagination(container1, options1);
const searchMoviePagination = new Pagination(container2, options2);

export { searchMoviePagination, homePagePagination };

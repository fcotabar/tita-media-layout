'use-strict';

///////////////////////
// CONFIG
//////////////////////

const API_URL = 'https://api.unsplash.com/search/photos?';
const API_KEY = 'vodmIJuD9An8bl57-l_CkGeUBy8kCmDQ3sCZwihGr94';
const ITEMS_PER_PAGE = 12;

let page = 1;
const mainMenu = document.querySelector('.nav-main--header');
const btnHamburguerNav = document.querySelector('.btn__hamburger-nav');
const portfolioGrid = document.querySelector('.portfolio__grid');
const btnsPortfolioFilter = document.querySelectorAll('.nav-main__link');
const btnGridType = document.querySelector('.grid-selector');
const btnShowMore = document.querySelector('.btn__show-more');

///////////////////////////////////////////////////////
//    FUNCTIONS
///////////////////////////////////////////////////////

const getItemSize = function (height, width) {
  const sizes = [
    'item-size--small-0',
    'item-size--small-1',
    'item-size--small-2',
    'item-size--small-3',
    'item-size--small-4',
    'item-size--small-5',
    'item-size--small-6',
    'item-size--small-7',
    'item-size--small-8',
    'item-size--small-9',
    'item-size--medium-0',
    'item-size--medium-1',
    'item-size--medium-2',
    'item-size--medium-3',
    'item-size--medium-4',
    'item-size--medium-5',
    'item-size--medium-6',
    'item-size--medium-7',
    'item-size--medium-8',
    'item-size--medium-9',
  ];

  return sizes[Math.floor((height / width) * 10)];
};

const renderPhotos = function (imgSrc, imgTitle, imgSize) {
  return `
  <div class="portfolio__grid-item ${imgSize}">
  <img
  class="portfolio__grid-item-img"
  src="${imgSrc}"
  alt="${imgTitle}"
  />
  <div class="portfolio__branding">
  <h3 class="portfolio__grid-item-title">CREATIVE LOGO</h3>
  <p class="portfolio__grid-item-text">Branding</p>
  </div>

  </div>
  `;
};

const loadPhotos = async function (url) {
  try {
    const fetchData = await fetch(url);
    const { results } = await fetchData.json();
    results.map((photo) => {
      const { urls, alt_description, height, width } = photo;
      const itemSize = getItemSize(height, width);

      const markup = renderPhotos(urls.regular, alt_description, itemSize);
      portfolioGrid.insertAdjacentHTML('beforeend', markup);
    });
    // console.log(results);
    // return res;
  } catch (err) {
    console.error(err);
  }
};

///////////////////////////////////////////////////////
//    HANDLERS
///////////////////////////////////////////////////////

const showMenuHandler = function (e) {
  e.preventDefault();
  mainMenu.classList.toggle('show');
};

const showMoreHandler = function (e) {
  e.preventDefault();
  console.log(e.target);
  console.log('handle event');
  page++;
  loadPhotos(
    `${API_URL}query=london&page=${page}&per_page=${ITEMS_PER_PAGE}&client_id=${API_KEY}`
  );
};

const changeGridTypeHandler = function (e) {
  e.preventDefault();
  if (e.target.closest('.btn__grid-column')) {
    portfolioGrid.classList.add('portfolio__grid--columns');
    portfolioGrid.classList.remove('portfolio__grid--rows');
  }

  if (e.target.closest('.btn__grid-row')) {
    portfolioGrid.classList.remove('portfolio__grid--columns');
    portfolioGrid.classList.add('portfolio__grid--rows');
  }
};

const portfolioFilterHandler = function (e) {
  e.preventDefault();
  const { query } = e.target.dataset;
  if (query) {
    console.log(e.target.dataset.query);
    page = 1;
    portfolioGrid.innerHTML = '';
    loadPhotos(
      `${API_URL}query=${query}&page=${page}&per_page=${ITEMS_PER_PAGE}&client_id=${API_KEY}`
    );
    btnsPortfolioFilter.forEach((btn) => {
      if (btn.dataset.query === query)
        btn.classList.add('nav-main__item--active');
      else btn.classList.remove('nav-main__item--active');
    });
  }
};
///////////////////////////////////////////////////////
//    EVENT LISTENERS
///////////////////////////////////////////////////////

btnHamburguerNav.addEventListener('click', showMenuHandler);
btnShowMore.addEventListener('click', showMoreHandler);
btnGridType.addEventListener('click', changeGridTypeHandler);
btnsPortfolioFilter.forEach((btn) =>
  btn.addEventListener('click', portfolioFilterHandler)
);

///////////////////////////////////////////////////////
//    INITIALIZATION
///////////////////////////////////////////////////////

const init = function () {
  // `${API_URL}query=london&page=${page}&per_page=${ITEMS_PER_PAGE}&client_id=${API_KEY}`
  loadPhotos(
    `${API_URL}query=nature&page=${page}&per_page=${ITEMS_PER_PAGE}&client_id=${API_KEY}`
  );
};
init();

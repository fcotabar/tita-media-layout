'use strict';

const API_URL = 'https://api.unsplash.com/search/photos?';
const API_KEY = 'vodmIJuD9An8bl57-l_CkGeUBy8kCmDQ3sCZwihGr94';
const ITEMS_PER_PAGE = 9;

let page = 1;

const portfolioGrid = document.querySelector('.portfolio__grid');

const renderPhotos = function (img, title) {
  return `
  <img
    class="portfolio__grid-item"
    src="${img}"
    alt="${title}"
  />
  `;
};

const loadPhotos = async function (url) {
  try {
    const fetchData = await fetch(url);
    const { results } = await fetchData.json();
    results.map((photo) => {
      const markup = renderPhotos(photo.urls.thumb, photo.alt_description);
      portfolioGrid.insertAdjacentHTML('beforeend', markup);
    });
    // .insertAdjacentHTML('afterbegin', markup)
    console.log(results);
    // return res;
  } catch (err) {
    console.error(err);
  }
};

// const renderPhotos = function() {};

loadPhotos(
  `${API_URL}query=london&page=${page}&per_page=${ITEMS_PER_PAGE}&client_id=${API_KEY}`
);
console.log(portfolioGrid);

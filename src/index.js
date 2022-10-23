import axios from 'axios';
import './css/common.css';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fotoCard from './templates/foto-card.hbs';
const lightbox = new SimpleLightbox('.gallery a');
const refs = {
  searchButton: document.querySelector('button'),
  searchForm: document.querySelector('#search-form'),
};

const options = {
  BASE_URL: 'https://pixabay.com/api/',
  KEY: '30766085-b4f368f4aeb8dd702f746c591',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};
let page = 1;

refs.searchForm.addEventListener('submit', searchFotos);

function searchFotos(e) {
  e.preventDefault();
  newFotos();
}

async function newFotos() {
  const query = refs.searchForm.elements.searchQuery.value;
  return await axios
    .get(
      `${options.BASE_URL}?key=${options.KEY}&q=${query}&${options.image_type}&${page}`
    )
    .then(response => {
      page += 1;
      console.log(response);
    });
}
// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });

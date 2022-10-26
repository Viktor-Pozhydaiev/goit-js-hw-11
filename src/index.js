import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
import fotoCard from './templates/foto-card.hbs';
import SearchService from './js/search-service';
import { data } from 'infinite-scroll';

const refs = {
  searchButton: document.querySelector('button'),
  searchForm: document.querySelector('#search-form'),
  divGallery: document.querySelector('.gallery'),
  loadButton: document.querySelector('.load-more'),
  input: document.querySelector('input'),
};
const lightbox = new SimpleLightbox('.gallery a');

const searchService = new SearchService();

refs.searchForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  reloadSearch();
  searchService.query = e.currentTarget.elements.searchQuery.value;

  searchService.resetPage();
  searchService.searchFotos().then(data => {
    if (searchService.query === '' || data.hits.length === 0) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    createMarkup(data.hits);
  });

  searchService.addPage();
}
// function onLoad() {
//   searchService.searchFotos().then(data => {
//     createMarkup(data.hits);
//   });
// }

function createMarkup(hits) {
  refs.divGallery.insertAdjacentHTML('beforeend', fotoCard(hits));
  lightbox.refresh();
}

const sentinel = document.querySelector('.sentinel');

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && searchService.query !== '') {
      searchService.searchFotos().then(data => {
        if (data.hits.length === 0) {
          return Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );
        }
        createMarkup(data.hits);
        return Notify.success(`Hooray! We found ${data.totalHits} images.`);

        searchService.addPage();
      });
    }
  });
};

//scroll
const elements = {};
const observer = new IntersectionObserver(onEntry, elements);
observer.observe(sentinel);

function reloadSearch() {
  refs.divGallery.innerHTML = '';
}

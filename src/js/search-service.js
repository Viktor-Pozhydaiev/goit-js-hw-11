import axios from 'axios';
const axios = require('axios').default;

const options = {
  BASE_URL: 'https://pixabay.com/api/',
  KEY: '30766085-b4f368f4aeb8dd702f746c591',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

export default class SearchService {
  constructor() {
    this.searchQery = '';
    this.page = 1;
  }
  async searchFotos() {
    const url = `${options.BASE_URL}?key=${options.KEY}&q=${this.searchQery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;

    return await axios
      .get(url)
      .then(response => {
        this.addPage();

        return response.data;
      })
      .catch(error => {
        console.error(error);
      })
      .finally(response => {
        console.log('Your code works :-)');
      });
  }
  addPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQery;
  }
  set query(newQuery) {
    this.searchQery = newQuery;
  }
}

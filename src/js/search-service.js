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

    return await fetch(url)
      .then(response => response.json())
      .then(data => {
        this.addPage();
        return data;
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

import Notiflix from "notiflix";

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '19797525-803e10272823be06aee41a8f4';

export default class ImageService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    };


    fetchImages() {
        return fetch(`${API_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
            .then(response => response.json())
            .then(({ total, hits }) => {
                if (total > 0 && this.page === 1) {
                    Notiflix.Notify.success(`Hooray! We found ${total} images.`);
                }
                this.page += 1;
                return hits;
            })
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
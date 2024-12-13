// console.log(100);
import axios from 'axios';
import createMarkup from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

const loadMoreBtn = document.querySelector('.load-more');
const gallerY = document.querySelector('.gallery');
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '47413156-c8c9abea8f6d88937b7892740';
const forM = document.querySelector('.feedback-form');
let spn = document.querySelector('.loader');
let page = 1;
let totalHitsData;
let qData;

forM.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  page = 1;
  spn.classList.add('is-hidden');
  event.preventDefault();
  qData = event.currentTarget.elements.photo.value.trim();
  event.target.reset();
  if (qData === '') {
    iziToast.show({
      color: 'red',
      position: 'topRight',
      message:
      'Sorry, there are no images matching your search query. Please try again!',
    });
    spn.classList.remove('is-hidden');
    return;
  }
  
  async function searchData() {
    loadMoreBtn.addEventListener('click', onLoadMore);
    const params = new URLSearchParams({
      key: API_KEY,

      q: qData,
      page,
      per_page: 15,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    });
    const { data } = await axios(`${BASE_URL}?${params}`);
    return data;
  }
  searchData(qData)
    .then(data => {
      totalHitsData = data.totalHits;

      if (!data.hits.length) {
        iziToast.show({
          color: 'red',
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });

        loadMoreBtn.classList.replace('load-more', 'load-more-hidden');
        gallerY.innerHTML = '';
        spn.classList.remove('is-hidden');
        return;
      }

      gallerY.innerHTML = '';
      gallerY.insertAdjacentHTML('afterbegin', createMarkup(data.hits));
      spn.classList.remove('is-hidden');
      if (gallerY.children.length < data.totalHits) {
        loadMoreBtn.classList.replace('load-more-hidden', 'load-more');
      }
      if (gallerY.children.length >= totalHitsData) {
        loadMoreBtn.classList.replace('load-more', 'load-more-hidden');
      }

      lightbox.refresh();
    })
    .catch(error => {
      iziToast.show({
        color: 'red',
        position: 'topRight',
        message: `${error.massage}`,
      });
      gallerY.innerHTML = '';
      spn.classList.remove('is-hidden');
      return;
    });
    
  async function onLoadMore() {
    page += 1;

    loadMoreBtn.disabled = true;

    try {
      spn.classList.remove('is-hidden');
      const data = await searchData(page);

      gallerY.insertAdjacentHTML('beforeend', createMarkup(data.hits));

      if (gallerY.children.length >= data.totalHits) {
        iziToast.show({
          color: 'blue',
          position: 'topRight',
          message: "We're sorry, but you've reached the end of search results.",
        });
        loadMoreBtn.classList.replace('load-more', 'load-more-hidden');
      }
      const card = document.querySelector('.gallery-item');
      const cardHeight = card.getBoundingClientRect().height;
      window.scrollBy({
        left: 0,
        top: cardHeight * 2,
        behavior: 'smooth',
      });

      lightbox.refresh();
    } catch (error) {
      iziToast.show({
        color: 'red',
        position: 'center',
        message: `${error.message}`,
      });
      console.log(error.message);

      spn.classList.remove('is-hidden');
    } finally {
      forM.reset();
      loadMoreBtn.disabled = false;
    }
  }
}
// loadMoreBtn.addEventListener('click', onLoadMore);
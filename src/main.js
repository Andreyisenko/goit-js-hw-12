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

// iziToast.info({
//   timeout: 3000,
//   title: 'Hello',
//   position: 'center',
//   message: 'Welcome!',
// //   backgroundColor: 'green',
//   titleColor: 'red',
//   Width: 200,
// });
const gallerY = document.querySelector('.gallery');
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '47413156-c8c9abea8f6d88937b7892740';
const forM = document.querySelector('.feedback-form');
const loadMoreBtn = document.querySelector('.load-more');
// console.log(forM);
let page = 1;
let qData;
loadMoreBtn.addEventListener('click', onLoadMore);
// forM.addEventListener('submit', handleSubmit);

// function handleSubmit(event) {
//   event.preventDefault();
//   qData = event.currentTarget.elements.photo.value.trim();
//   // console.log(qData);
//   searchData(`${qData}`);

async function searchData(datA) {
  if (datA === '') {
    iziToast.show({
      color: 'red',
      position: 'topRight',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    // spn.classList.remove('is-hidden');
    return;
  }

  const params = new URLSearchParams({
    key: API_KEY,

    q: `caT`,
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
    // console.log(data);
    gallerY.insertAdjacentHTML('afterbegin', createMarkup(data.hits));

    if (gallerY.children.length < data.totalHits) {
      loadMoreBtn.classList.replace('load-more-hidden', 'load-more');
    } 
      
    

    lightbox.refresh();
  })
  .catch(error => console.log(error.massage));
// }

async function onLoadMore() {
  page += 1;
  loadMoreBtn.disabled = true;

  try {
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
const card = document.querySelector(".gallery-item");
console.log(card.getBoundingClientRect().height);
const cardHeight = card.getBoundingClientRect().height
window.scrollBy({
  left: 0,
  top: cardHeight * 2,
  behavior: "smooth"
})

    lightbox.refresh();
    console.log(data);
    console.log(data.totalHits);
    console.log(data.hits.length);
    console.log(gallerY.children.length);

  } catch (error) {
    alert(error.massage);
  }finally {
    loadMoreBtn.disabled = false;
  }
}

// async function handleSubmit(event) {
// event.preventDefault();

//   const params = new URLSearchParams({
//     key: API_KEY,

//     q: 'cat',
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: 'true',
//   });
//   axios(`https://pixabay.com/api/?${params}`)
// .then ((res)=> console.log(res)

// )

// console.log(100);
import axios from 'axios';
import createMarkup from './js/render-functions'


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
let page;

async function serviceImg(page = 1) {
  const params = new URLSearchParams({
    key: API_KEY,

    q: `cat`,
    page,
    per_page: 15,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true'
  });
  const { data } = await axios(`${BASE_URL}?${params}`);
  console.log(22);
  return data;
  
}
serviceImg(page)
.then(data => {
  console.log(data);
  gallerY.insertAdjacentHTML("afterbegin", createMarkup(data.hits));
  loadMoreBtn.classList.replace("load-more-hidden", "load-more")
  lightbox.refresh();
})
.catch(error => alert(error.massage)
)
console.log(11);









// forM.addEventListener('submit', handleSubmit);

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

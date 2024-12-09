// console.log(100);
import axios from 'axios';

// console.log(axios.isCancel('something'));
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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
// console.log(forM);

forM.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  const params = new URLSearchParams({
    key: API_KEY,

    q: 'cat',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  const responsE = await axios(`${BASE_URL}/?${params}`)
    .then(response => {
      console.log(response);
      // return response.json();
    })
    .catch(error => console.log(error));

  console.log('ok');
}

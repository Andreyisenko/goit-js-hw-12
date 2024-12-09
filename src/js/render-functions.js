// console.log(65);
export default createMarkup


function createMarkup(arr) {
    return arr
      .map(
        ({
          id,
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => `<li data-id="${id}" class="gallery-item">
              <a href=${largeImageURL} class="gallery-link">
              <img src=${webformatURL} class="gallery-image" alt=${tags}> 
              <div class="wrap"><h2 class="title-like">Likes <span class="span-text"> ${likes} </span></h2>
               <h2 class="title-views">Views <span class="span-text"> ${views} </span></h2>
               <h2 class="title-comments">Comments <span class="span-text">${comments}</span> </h2>
               <h2 class="title-downloads">Downloads <span class="span-text">${downloads} </span></h2></div>
  </a>
              </li>`
      )
      .join('');
  }


import searchImages from './imageSearchApp';
import { Notify } from 'notiflix';

//==========================================

//const searchQuery = document.querySelector('input[name=searchQuery]');
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

//==========================================
//                        dataImages.hits
const addPhotoCards = images => {
  const galleryItem = images
    .map(img => {
      gallery.innerHTML += `<div class="photo-card">
    <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes: ${img.likes}</b>
      </p>
      <p class="info-item">
        <b>Views: ${img.views}</b>
      </p>
      <p class="info-item">
        <b>Comments: ${img.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads: ${img.downloads}</b>
      </p>
    </div>
  </div>`;
    })
    .join('');
  return galleryItem;
};

form.addEventListener('submit', e => {
  e.preventDefault();

  const { searchQuery } = e.currentTarget;
  const searchQueryInput = searchQuery.value;
  //console.log(searchQueryInput);

  searchImages(searchQueryInput)
    .then(dataImages => {
      if (dataImages.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        console.log(dataImages);
        addPhotoCards(dataImages.hits);
        Notify.success(`"Hooray! We found ${dataImages.totalHits} images."`);

        return dataImages.hits;
      }
    })
    .catch(error => console.log(error));
});

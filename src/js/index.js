import searchImages from './imageSearchApp';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
// Additional style import
import 'simplelightbox/dist/simple-lightbox.min.css';

//==========================================
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
const gallerySimpleLightBox = new SimpleLightbox('.gallery a', {});
//paginacja
let pageNr = 1;
//button "load more" deafoult
loadMore.style.display = 'none';
// The value of the search field
let searchQueryInput = '';

//==========================================
// CLEAR GALLRY
const clearGallery = () => {
  gallery.innerHTML = '';
  pageNr = 1;
  loadMore.style.display = 'none';
};

//==========================================
// ADD SEARCHED IMAGES
const addPhotoCards = images => {
  const galleryItem = images
    .map(img => {
      gallery.innerHTML += `<div class="photo-card">
      <a class="photo-item" href="${img.largeImageURL}">
          <img class="photo-img" src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
      </a>
      <div class="info">
          <p class="info-item">
              <b>Likes: </b>
              <span class="info-item__numbers">${img.likes}</span>
          </p>
          <p class="info-item">
              <b>Views: </b>
              <span class="info-item__numbers">${img.views}</span>
          </p>
          <p class="info-item">
              <b>Comments: </b>
              <span class="info-item__numbers">${img.comments}</span>
          </p>
          <p class="info-item">
              <b>Downloads: </b>
              <span class="info-item__numbers">${img.downloads}</span>
          </p>
      </div>
  </div>`;
    })
    .join('');

  // smooth page scrolling
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  if (pageNr > 1) {
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } else {
    window.scrollBy({ behavior: 'smooth' });
  }

  return galleryItem;
};

//===========================================================
//SEARCHING IMG
form.addEventListener('submit', e => {
  e.preventDefault();

  clearGallery();

  const { searchQuery } = e.currentTarget;
  searchQueryInput = searchQuery.value;

  if (searchQueryInput === searchQuery.value) {
    searchImages(searchQueryInput, pageNr)
      .then(dataImages => {
        if (dataImages.hits.length === 0) {
          Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );
        } else {
          console.log(dataImages);
          addPhotoCards(dataImages.hits);
          Notify.success(`"Hooray! We found ${dataImages.totalHits} images."`);
          console.log(`first: ${pageNr}`);

          loadMore.style.display = 'block';

          gallerySimpleLightBox.refresh();

          return dataImages.hits;
        }
      })
      .catch(error => console.log(error));

    return searchQuery.value;
  } else {
    return (searchQueryInput = '');
  }
});

//===========================================================
//SEARCHING MORE!!! IMG
loadMore.addEventListener('click', e => {
  e.preventDefault();

  loadMore.style.display = 'none';

  pageNr++;

  searchImages(searchQueryInput, pageNr)
    .then(dataImages => {
      if (dataImages.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        console.log(dataImages);
        addPhotoCards(dataImages.hits);
        Notify.success(`"Hooray! We found ${dataImages.totalHits} images."`);
        loadMore.style.display = 'block';
        return dataImages.hits;
      }
    })
    .catch(error => console.log(error));
});

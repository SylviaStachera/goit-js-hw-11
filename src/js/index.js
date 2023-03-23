import searchImages from './imageSearchApp';

//==========================================

//const searchQuery = document.querySelector('input[name=searchQuery]');
const form = document.querySelector('.search-form');

form.addEventListener('submit', e => {
  e.preventDefault();
  //const { elements } = e.currentTarget;

  console.log(e.currentTarget);

  const { searchQuery } = e.currentTarget;

  console.log(searchQuery.value);

  searchImages(searchQuery.value);
});

{/* <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div> */}


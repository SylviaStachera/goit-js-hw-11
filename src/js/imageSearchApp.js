import { Notify } from 'notiflix';

const KEY = '34667296-fe4db44c106503806ff969e6a';

const searchImages = q => {
  return fetch(
    `https://pixabay.com/api/?key=${KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
        return [];
      }
      return response.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        return Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        console.log(data.hits);
        // return data.hits;
      }
    })
    .catch(console.error);
};

export default searchImages;

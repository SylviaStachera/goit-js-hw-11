//import { Notify } from 'notiflix';

const KEY = '34667296-fe4db44c106503806ff969e6a';

const searchImages = async (q, pageNr) => {
  const baseUrl = await fetch(
    `https://pixabay.com/api/?key=${KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageNr}`
  );
  const response = async response => {
    try {
      if (!response.ok) {
        throw new Error(response.status);
        return [];
      } else {
        return await response.json();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return response(baseUrl);
};

export default searchImages;

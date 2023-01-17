import axios from 'axios';

const API_KEY = '31279729-f68fda383816d4b8eaf8d923a';

const BASE_URL = `https://pixabay.com/api/`;

const OTHER_SETTINGS = '&image_type=photo&orientation=horizontal&per_page=12';

export const fetchImages = async (searchQuery, page) => {
  try {
    const URL = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}${OTHER_SETTINGS}`;

    const data = await axios.get(URL);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const api = {
  fetchImages,
};
import md5 from 'md5';

const publicKey = '50e28446f0738e53d1c9c94f8b08ef6b';
const privateKey = 'b5f90357e7c99606ff719bc2145872bf1fd521bf';
const ts = 1;
const hash = md5(ts + privateKey + publicKey);

export const fetchComics = async () => {
  const response = await fetch(
    `https://gateway.marvel.com/v1/public/comics?orderBy=modified&limit=100&ts=${ts}&apikey=${publicKey}&hash=${hash}`
  );
  const data = await response.json();
  return data.data.results; 
};

export const fetchComicById = async (id) => {
  const response = await fetch(
    `https://gateway.marvel.com/v1/public/comics/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
  );
  const data = await response.json();
  return data.data.results[0];
};

export const fetchCharactersByComicId = async (comicId) => {
  const response = await fetch(
    `https://gateway.marvel.com/v1/public/comics/${comicId}/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`
  );
  const data = await response.json();
  return data.data.results; 
};

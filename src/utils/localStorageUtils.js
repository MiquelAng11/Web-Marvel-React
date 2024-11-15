export const getFavorites = () => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  };
  
  export const addFavorite = (comic) => {
    const favorites = getFavorites();
    localStorage.setItem('favorites', JSON.stringify([...favorites, comic]));
  };
  
  export const removeFavorite = (id) => {
    const favorites = getFavorites().filter((comic) => comic.id !== id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };
  
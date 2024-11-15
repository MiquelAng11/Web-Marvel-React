import React, { useState, useEffect } from 'react';
import { getFavorites, removeFavorite } from '../utils/localStorageUtils';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleRemoveFavorite = (id) => {
    removeFavorite(id);
    setFavorites(getFavorites());
  };

  return (
    <div>
      <h2>Favoritos</h2>
      <ul>
        {favorites.map((comic) => (
          <li key={comic.id}>
            <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
            <p>{comic.title}</p>
            <button onClick={() => handleRemoveFavorite(comic.id)}>Eliminar de Favoritos</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useComics } from '../hooks/useMarvelApi';
import { getFavorites, addFavorite, removeFavorite } from '../utils/localStorageUtils';
import './ComicList.css';
import loadingGif from '../media/loading.gif';

const NextArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={`${className} custom-arrow next-arrow`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

const PrevArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={`${className} custom-arrow prev-arrow`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

const ComicList = () => {
  const { comics, loading } = useComics();
  const [favorites, setFavorites] = useState(getFavorites());

  const isFavorite = (comicId) => favorites.some((comic) => comic.id === comicId);

  const toggleFavorite = (comic) => {
    if (isFavorite(comic.id)) {
      removeFavorite(comic.id);
    } else {
      addFavorite(comic);
    }
    setFavorites(getFavorites());
  };

  if (loading) {
    return (
      <div className="loading-container">
        <img src={loadingGif} className="loading-image" alt="Loading..." />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="comic-list-container">
      <div className="carousel-wrapper">
        <h1 className="title">Últimos cómics</h1>
        <Slider {...settings}>
          {comics.map((comic) => (
            <div key={comic.id} className="comic-slide">
              <Link to={`/comic/${comic.id}`}>
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                />
                <p>{comic.title}</p>
              </Link>
              <button onClick={() => toggleFavorite(comic)}>
                {isFavorite(comic.id) ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
              </button>
            </div>
          ))}
        </Slider>
      </div>

      {/* Favorites Section */}
      <div className="favorites-section">
        <h2 className="title">Tus Favoritos</h2>
        {favorites.length === 0 ? (
          <p style={{ color: 'white', textAlign: 'center' }}>
            No tienes cómics favoritos aún.
          </p>
        ) : (
          <div className="favorites-list">
            {favorites.map((comic) => (
              <div key={comic.id} className="comic-slide">
                <Link to={`/comic/${comic.id}`}>
                  <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                    className="favorite-comic-image"
                  />
                  <p>{comic.title}</p>
                </Link>
                <button onClick={() => toggleFavorite(comic)}>
                  Quitar de Favoritos
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComicList;
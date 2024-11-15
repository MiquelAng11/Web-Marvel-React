import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchComicById, fetchCharactersByComicId } from '../api/marvelApi';
import './ComicDetail.css';
import loadingGif from '../media/loading.gif';

const ComicDetail = () => {
  const { id } = useParams();
  const [comic, setComic] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getComicData = async () => {
      setLoading(true);
      try {
        const comicData = await fetchComicById(id);
        setComic(comicData);

        const characterData = await fetchCharactersByComicId(id);
        setCharacters(characterData);
      } catch (error) {
        console.error('Error al fetchear detalles del comic:', error);
      } finally {
        setLoading(false);
      }
    };
    getComicData();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <img src={loadingGif} className="loading-image" alt="Loading..." />
      </div>
    );
  }
  if (!comic) return <p>Error loading comic data.</p>;

  return (
    <div className="comic-detail-container">
      <div className="comic-detail-wrapper">
        <h2>{comic.title}</h2>
        <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} className="comic-image" />
        <div className="comic-info">
          <div className="comic-description">
            <p>{comic.description || 'No description available.'}</p>
          </div>
          <div className="comic-extra-info">
            <p><strong>Issue Number:</strong> {comic.issueNumber}</p>
            <p><strong>Series:</strong> {comic.series?.name}</p>
            <p><strong>Creators:</strong> {comic.creators?.items.map(creator => creator.name).join(', ') || 'N/A'}</p>
          </div>
        </div>

        <h3>Characters</h3>
        <div className="character-list">
          {characters.map((character) => (
            <div key={character.id} className="character-item">
              {character.thumbnail ? (
                <img 
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`} 
                  alt={character.name} 
                  className="character-image"
                />
              ) : (
                <div className="no-image">No image available</div>
              )}
              <p className="character-name">{character.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComicDetail;
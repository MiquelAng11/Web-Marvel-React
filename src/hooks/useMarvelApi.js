
import { useState, useEffect } from 'react';
import { fetchComics, fetchComicById } from '../api/marvelApi';

export const useComics = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getComics = async () => {
      setLoading(true);
      try {
        const data = await fetchComics();
        setComics(data);
      } catch (error) {
        console.error('Error al fetchear comics:', error);
      } finally {
        setLoading(false);
      }
    };
    getComics();
  }, []);

  return { comics, loading };
};

export const useComicById = (id) => {
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getComic = async () => {
      setLoading(true);
      try {
        const data = await fetchComicById(id);
        setComic(data);
      } catch (error) {
        console.error('Error al fetchear comic:', error);
      } finally {
        setLoading(false);
      }
    };
    getComic();
  }, [id]);

  return { comic, loading };
};

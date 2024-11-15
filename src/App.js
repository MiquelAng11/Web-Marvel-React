import 'slick-carousel/slick/slick.css';        
import 'slick-carousel/slick/slick-theme.css';   
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ComicList from './components/ComicList';
import ComicDetail from './components/ComicDetail';
import Favorites from './components/Favorites';
import './App.css';  

const App = () => {
  return (
    <div>
      <h1>Marvel Comics</h1>
      <Routes>
        <Route path="/" element={<ComicList />} />
        <Route path="/comic/:id" element={<ComicDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
};

export default App;

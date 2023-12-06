// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Recipe from './routes/Recipe';
import RecipeInfo from './routes/RecipeInfo';
import Favorites from './routes/Favorites';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/recipe-info/:recipeId" element={<RecipeInfo />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App

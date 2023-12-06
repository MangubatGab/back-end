// Recipe.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import './Recipe.css';

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipesFromDB = async () => {
      try {
        const response = await fetch('https://back-end-six-iota.vercel.app/api/recipes',{
          method: 'GET',
          mode: 'no-cors'
        });
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipesFromDB();
  }, []);

  return (
    <div>
      <div style={{ paddingBottom: '80px' }}>
        <Navbar />
      </div>
      <h2>RECIPES</h2>
      <div className="display-card">
        {recipes.map((recipe) => {
          return (
            <Link to={`/recipe-info/${recipe._id}`} key={recipe._id} className="recipe-link">
              <Card
                key={recipe._id}
                id={recipe._id}
                title={recipe.title}
                imageUrl={recipe.imageUrl}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Recipe;

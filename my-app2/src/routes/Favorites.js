import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const fetchFavorites = async () => {
    try {
      const response = await fetch('https://back-end-six-iota.vercel.app/api/favorites', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setFavorites(data.favorites);
      } else {
        throw new Error('Failed to fetch favorites');
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
      // Handle error, show error message, etc.
    }
  };

  const fetchRecipeDetails = async (recipeId) => {
    try {
      const response = await fetch(`https://back-end-six-iota.vercel.app/recipes/${recipeId}`, {
        credentials: 'include',
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to fetch recipe details');
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchFavoritesDetails = async () => {
      try {
        const favoriteRecipesDetails = [];
  
        for (const recipeId of favorites) {
          try {
            const response = await fetch(`https://back-end-six-iota.vercel.app/api/recipes/${recipeId}`, {
              credentials: 'include',
            });
  
            if (response.ok) {
              const recipeDetails = await response.json();
              favoriteRecipesDetails.push(recipeDetails);
              // After setting favoriteRecipes
              console.log('Favorite Recipes:', favoriteRecipes);

            } else {
              console.error(`Failed to fetch details for recipe ID ${recipeId}`);
              // Handle specific error cases if needed
            }
          } catch (fetchError) {
            console.error(`Error fetching recipe ID ${recipeId}:`, fetchError);
            // Handle fetch error for individual recipe
          }
        }
  
        setFavoriteRecipes(favoriteRecipesDetails);
      } catch (error) {
        console.error('Error fetching favorite recipes details:', error);
        // Handle error or show an error message
      }
    };
  
    fetchFavoritesDetails();
  }, [favorites]);
   // Fetch recipe details when favorites change

  return (
    <div>
      <div style={{ paddingBottom: '80px' }}>
        <Navbar />
      </div>
      <h2>Favorites</h2>
      <div className="favorites-grid">
        {favoriteRecipes.map((favoriteRecipe) => (
          <Link to={`/recipe-info/${favoriteRecipe._id}`} key={favoriteRecipe._id} className="recipe-link">
            <Card
              key={favoriteRecipe._id}
              id={favoriteRecipe._id}
              title={favoriteRecipe.title}
              imageUrl={favoriteRecipe.imageUrl}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Favorites;

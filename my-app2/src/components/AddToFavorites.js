import React, { useState, useEffect, useCallback } from 'react';

const AddToFavorites = ({ recipeId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const checkIfFavorite = useCallback(async () => {
    try {
      const response = await fetch('https://back-end-six-iota.vercel.app/api/favorites', {
        credentials: 'include',
      });
  
      if (response.ok) {
        const data = await response.json();
        setIsFavorite(data.favorites.includes(recipeId));
      } else if (response.status === 404) {
        setIsFavorite(false);
      } else {
        throw new Error('Failed to fetch favorites');
      }
    } catch (error) {
      console.error('Error checking if recipe is a favorite:', error);
    }
  }, [recipeId]);

  useEffect(() => {
    checkIfFavorite();
  }, [checkIfFavorite]);

  const addToFavorites = async () => {
    try {
      if (!isFavorite) {
        const response = await fetch(`https://back-end-six-iota.vercel.app/api/favorites/${recipeId}`, {
          method: 'POST',
          credentials: 'include',
        });
  
        if (response.ok) {
          setIsFavorite(true);
          console.log('Recipe added to favorites!');
        } else if (response.status === 409) {
          console.log('Recipe is already in favorites');
        } else {
          throw new Error('Failed to add recipe to favorites');
        }
      } else {
        console.log('Recipe is already in favorites');
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };
  
  const removeFromFavorites = async () => {
    try {
      const response = await fetch(`https://back-end-six-iota.vercel.app/api/favorites/${recipeId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
  
      if (response.ok) {
        setIsFavorite(false);
        console.log('Recipe removed from favorites!');
      } else {
        throw new Error('Failed to remove recipe from favorites');
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  return (
    <div>
      {isFavorite ? (
        <button onClick={removeFromFavorites}>Remove from Favorites</button>
      ) : (
        <button onClick={addToFavorites}>Add to Favorites</button>
      )}
    </div>
  );
};

export default AddToFavorites;

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './RecipeInfo.css';
import { SlArrowLeftCircle } from "react-icons/sl";
import AddToFavorites from '../components/AddToFavorites';

const RecipeInfo = () => {
  const { recipeId } = useParams(); // Fetch the recipe ID from the URL params
  const [recipeData, setRecipeData] = useState(null);
  const [editingTitle, setEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const fetchRecipeData = useCallback(async () => {
    try {
      const response = await fetch(`https://deploy-nine-pi.vercel.app/api/recipes/${recipeId}`);
      if (response.ok) {
        const data = await response.json();
        setRecipeData(data);
      } else {
        throw new Error('Failed to fetch recipe data');
      }
    } catch (error) {
      console.error('Error fetching recipe data:', error);
    }
  }, [recipeId]);

  useEffect(() => {
    fetchRecipeData();
  }, [fetchRecipeData]);

  const updateRecipeTitle = async () => {
    try {
      const response = await fetch(`https://deploy-nine-pi.vercel.app/api/recipes/${recipeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle }),
      });

      if (response.ok) {
        console.log('Recipe title updated successfully');
        setEditingTitle(false);
        fetchRecipeData();
      } else {
        throw new Error('Failed to update recipe title');
      }
    } catch (error) {
      console.error('Error updating recipe title:', error);
    }
  };

  return (
    <div>
      <div style={{ paddingBottom: '70px' }}>
        <Navbar />
      </div>

      <div className="recipe-info-container">
        <Link to="/recipe" className="back-button">
          <SlArrowLeftCircle style={{ fontSize: '2em' }} />
        </Link>
        {recipeData ? (
          <div className="recipe-details">
            <div className="recipe-image-container">
              {recipeData.imageUrl && (
                <img
                  src={recipeData.imageUrl}
                  alt={recipeData.title}
                  className="recipe-image"
                />
              )}
            </div>
            <div className="recipe-info">
              <AddToFavorites recipeId={recipeId} />
              <div className="title-nutrition">
                {editingTitle ? (
                  <div className="edit-title">
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="edit-title-input"
                    />
                    <button onClick={updateRecipeTitle} className="save-button">
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="display-title">
                    <h1>{recipeData.title}</h1>
                    <button onClick={() => setEditingTitle(true)} className="edit-button">
                      Edit Title
                    </button>
                  </div>
                )}
                <div className="nutritional-facts">
                  <p>Fat: {recipeData.nutritionalValues?.fat} g</p>
                  <p>Protein: {recipeData.nutritionalValues?.protein} g</p>
                  <p>Carbs: {recipeData.nutritionalValues?.carbs} g</p>
                  <p>Calories: {recipeData.nutritionalValues?.calories} kcal</p>
                </div>
              </div>
              <div className="recipe-ingredients">
                <h2>Ingredients:</h2>
                <ul>
                  {recipeData.ingredients?.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div className="recipe-procedure">
                <h2>Procedure:</h2>
                <ol>
                  {recipeData.procedure?.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading recipe data...</p>
        )}
      </div>
    </div>
  );
};

export default RecipeInfo;

const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Your Recipe model
const FavoriteRecipe = require('./models/FavoriteRecipe'); // New model for favorite recipes
const cors = require('cors'); // Import the cors package

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://gabmangubat:Gabriel11082013@cluster0.qcgxnks.mongodb.net/recipeApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
});

app.use(express.json());

app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/recipes/:recipeId', async (req, res) => {
  const { recipeId } = req.params;

  try {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipe', error: error.message });
  }
});

app.post('/api/favorites/:recipeId', async (req, res) => {
  const { recipeId } = req.params;

  try {
    const existingFavorite = await FavoriteRecipe.findOne({ recipeId });

    if (existingFavorite) {
      return res.status(409).json({ message: 'Recipe is already in favorites' });
    }

    const newFavorite = new FavoriteRecipe({ recipeId });
    await newFavorite.save();

    res.status(200).json({ message: 'Recipe added to favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding recipe to favorites', error: error.message });
  }
});

app.delete('/api/favorites/:recipeId', async (req, res) => {
  const { recipeId } = req.params;

  try {
    await FavoriteRecipe.findOneAndDelete({ recipeId });

    res.status(200).json({ message: 'Recipe removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing recipe from favorites', error: error.message });
  }
});

app.get('/api/favorites', async (req, res) => {
  try {
    const favorites = await FavoriteRecipe.find();
    res.status(200).json(favorites.map((favorite) => favorite.recipeId));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user favorites', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

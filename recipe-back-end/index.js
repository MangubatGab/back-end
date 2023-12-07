const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Your Recipe model
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

const favorites = []; // Store favorite recipe IDs

app.post('/api/favorites/:recipeId', async (req, res) => {
  const { recipeId } = req.params;

  try {
    // Logic to add the recipe to favorites
    favorites.push(recipeId);
    res.status(200).json(recipeId);
  } catch (error) {
    res.status(500).json({ message: 'Error adding recipe to favorites', error: error.message });
  }
});

app.put('/api/recipes/:recipeId', async (req, res) => {
  const { recipeId } = req.params;
  const { title } = req.body;

  try {
    const recipe = await Recipe.findByIdAndUpdate(recipeId, { title }, { new: true });

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error updating recipe title', error: error.message });
  }
});

app.delete('/api/favorites/:recipeId', async (req, res) => {
  const { recipeId } = req.params;

  try {
    const index = favorites.indexOf(recipeId);

    if (index !== -1) {
      // Remove the recipe ID from favorites if it exists
      favorites.splice(index, 1);
      res.status(200).json({ message: 'Recipe removed from favorites' });
    } else {
      res.status(404).json({ message: 'Recipe not found in favorites' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing recipe from favorites', error: error.message });
  }
});

app.get('/api/favorites', async (req, res) => {
  try {
    // For demonstration, sending back the array of favorite IDs
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user favorites', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

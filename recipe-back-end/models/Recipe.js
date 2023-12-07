const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // Automatically generated ObjectId
  title: {
    type: String,
    required: true,
  },
  nutritionalValues: {
    type: Map,
    of: Number,
    default: {},
  },
  ingredients: [{
    type: String, // Assuming ingredients are strings
    required: true,
  }],
  procedure: [{
    type: String, // Assuming procedure steps are strings
    required: true,
  }],
  imageUrl: {
    type: String,
    required: true,
  },

});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

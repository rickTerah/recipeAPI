
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {type:String, required:true},
    ingredients: {type:String, required:true},
    instructions: {type:String, required:true},
    difficulty: {type:Number, required:true},
    time: {type:Number, required:true}
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
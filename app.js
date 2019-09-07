const express = require('express');
const bodyParser = require('body-parser');
const Recipe = require('./models/recipe');
const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.json());

app.get('/api/recipes', async (req, res) => {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
});

app.get('/api/recipes/:id', async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({message:'Recipe with the specified ID not found'});

    res.status(200).json(recipe);
});

app.post('/api/recipes', async (req, res) => {
    const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,
        time: req.body.time
    });
    await recipe.save();
    res.status(201).json({message: 'Recipe successfully created'});
});

app.put('/api/recipes/:id', async (req, res) => {
    const recipe = await Recipe.updateOne({_id:req.params.id}, {
        $set:{
            title: req.body.title,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            difficulty: req.body.difficulty,
            time: req.body.time 
        }
    });
    if (!recipe) return res.status(404).json({message:'Recipe with the specified ID not found'});
    res.status(201).json({message: 'Recipe successfully updated'});
});

app.delete('/api/recipes/:id', async (req, res) => {
    const recipe = await Recipe.findByIdAndRemove(req.params.id);
    if (!recipe) return res.status(404).json({message:'Recipe with the specified ID not found'});

    res.status(204).json({message: 'Recipe successfully deleted'});
});



module.exports = app;
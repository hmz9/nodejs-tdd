const express = require('express');
var router = express.Router();
var httpError = require('http-errors');

const recipes = [
  {
    id: 1,
    name: 'Karahi Gosht',
    description:
      'Karahi Gosht is a famous Pakistani cousin made with chicken or lamb meat. It is one of the most favorite holiday treat',
    featured: false,
  },
  {
    id: 2,
    name: 'Biryani',
    description:
      'Biryani is a famous Pakistani cousin made with chicken or lamb meat. It is one of the most favorite holiday treat',
    featured: false,
  },
  {
    id: 3,
    name: 'Daal Chawal',
    description:
      'Daal Chawal is a famous Pakistani cousin made with chicken or lamb meat. It is one of the most favorite holiday treat',
    featured: false,
  },
];

router.get('/', (req, res, next) => {
  res.status(200).json(recipes);
});

router.get('/:recipeId', (req, res, next) => {
  let recipe = recipes.find((recipe) => recipe.id == req.params.recipeId);

  if (!recipe) {
    error = new Error('Recipe not found');
    error.status = 404;
    next(error);
  }

  res.status(200).json(recipe);
});

router.post('/', (req, res, next) => {
  const { body } = req;
  const recipe = {
    id: recipes.length + 1,
    name: body.name,
    description: body.description,
    featured: false,
  };

  recipes.push(recipe);

  res.status(201).json(recipe);
});

module.exports = router;

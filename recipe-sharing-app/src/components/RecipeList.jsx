import React from 'react';
import { useRecipeStore } from './recipeStore';

function RecipeList() {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe.id}>{recipe.title}</li>
      ))}
    </ul>
  );
}

export default RecipeList;

import React from 'react';
import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';  // import Link

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.filteredRecipes.length ? state.filteredRecipes : state.recipes);

  return (
    <div>
      {recipes.map(recipe => (
        <div key={recipe.id}>
          <Link to={`/recipes/${recipe.id}`}>  {/* Wrap title in Link */}
            <h3>{recipe.title}</h3>
          </Link>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;

import React, { useState } from 'react';
import { useRecipeStore } from './recipeStore';

function EditRecipeForm({ recipe, onCancel }) {
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);

  const handleSubmit = (event) => {
    event.preventDefault();  // <-- Make sure this line is here!
    updateRecipe({ ...recipe, title, description });
    onCancel(); // maybe close the form after update
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Title" 
      />
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description" 
      />
      <button type="submit">Update Recipe</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default EditRecipeForm;

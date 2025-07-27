import React, { useState } from 'react';
import { useRecipeStore } from './recipeStore';

function AddRecipeForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const addRecipe = useRecipeStore(state => state.addRecipe);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    addRecipe({ id: Date.now(), title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Recipe title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Recipe description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default AddRecipeForm;

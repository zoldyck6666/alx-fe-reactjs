import React from 'react';
import { useRecipeStore } from './recipeStore';

const SearchBar = () => {
  const updateSearchTerm = useRecipeStore(state => state.updateSearchTerm);

  const handleChange = (e) => {
    updateSearchTerm(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search recipes..."
      onChange={handleChange}
      style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
    />
  );
};

export default SearchBar;

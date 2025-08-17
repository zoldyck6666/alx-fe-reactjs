import { useState } from "react";

function AddRecipeForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!ingredients.trim() || ingredients.split(",").length < 2) 
      newErrors.ingredients = "Please enter at least two ingredients, separated by commas";
    if (!steps.trim()) newErrors.steps = "Preparation steps are required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Call parent function to handle adding recipe
    onAdd({
      id: Date.now(),
      name: title,
      ingredients: ingredients.split(",").map((i) => i.trim()),
      instructions: steps.split("\n").map((s) => s.trim()),
    });

    // Clear form
    setTitle("");
    setIngredients("");
    setSteps("");
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Recipe</h2>

      {/* Title */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      {/* Ingredients */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Ingredients (comma separated)</label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          rows="3"
        />
        {errors.ingredients && (
          <p className="text-red-500 text-sm">{errors.ingredients}</p>
        )}
      </div>

      {/* Preparation Steps */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Preparation Steps (one per line)</label>
        <textarea
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          rows="5"
        />
        {errors.steps && <p className="text-red-500 text-sm">{errors.steps}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Recipe
      </button>
    </form>
  );
}

export default AddRecipeForm;

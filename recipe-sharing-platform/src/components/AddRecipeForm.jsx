import { useState } from "react";

export default function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim() || !ingredients.trim() || !steps.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    // Prepare recipe object
    const newRecipe = {
      id: Date.now(),
      name: title,
      ingredients: ingredients.split(",").map((item) => item.trim()),
      steps: steps.split("\n").map((step) => step.trim()),
    };

    console.log("New recipe submitted:", newRecipe);
    alert("Recipe added successfully!");

    // Reset form
    setTitle("");
    setIngredients("");
    setSteps("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-6">Add New Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-semibold">Recipe Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter recipe title"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block mb-1 font-semibold">
            Ingredients (comma separated)
          </label>
          <textarea
            className="w-full p-2 border rounded"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g. 2 eggs, 1 cup flour, 1 tsp sugar"
          />
        </div>

        {/* Steps */}
        <div>
          <label className="block mb-1 font-semibold">Preparation Steps</label>
          <textarea
            className="w-full p-2 border rounded"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            placeholder="Enter preparation steps, one per line"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
}

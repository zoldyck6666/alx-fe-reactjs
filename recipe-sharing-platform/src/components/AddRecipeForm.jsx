import { useState } from "react";

export default function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!title.trim()) validationErrors.title = "Title is required";
    if (!ingredients.trim() || ingredients.split(",").length < 2)
      validationErrors.ingredients = "At least two ingredients required";
    if (!steps.trim()) validationErrors.steps = "Preparation steps required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Submit logic here (e.g., API call or updating state)
    console.log({ title, ingredients, steps });

    // Clear form
    setTitle("");
    setIngredients("");
    setSteps("");
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-4 md:p-8"
    >
      <h2 className="text-2xl font-semibold mb-4">Add a New Recipe</h2>

      <div>
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded md:text-lg"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      <div>
        <textarea
          placeholder="Ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded md:h-32"
        ></textarea>
        {errors.ingredients && (
          <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
        )}
      </div>

      <div>
        <textarea
          placeholder="Preparation Steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded md:h-32"
        ></textarea>
        {errors.steps && (
          <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
        )}
      </div>

      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 md:px-6 md:py-3">
        Add Recipe
      </button>
    </form>
  );
}

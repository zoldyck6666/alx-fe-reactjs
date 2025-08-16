import { useEffect, useState } from "react";
import recipesData from "../data.json"; // Make sure data.json exists in src/

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(recipesData);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Recipe Sharing Platform</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="border rounded-lg shadow p-4 hover:shadow-lg transition"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
            <p className="text-gray-700">{recipe.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

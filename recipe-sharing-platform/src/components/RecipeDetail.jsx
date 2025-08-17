import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import data from "../data.json";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const found = data.recipes.find((r) => r.id === Number(id));
    setRecipe(found || null);
  }, [id]);

  if (!recipe) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <p className="text-center mt-10">Recipe not found.</p>
        <div className="text-center mt-6">
          <Link to="/" className="text-blue-600 underline">Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
        <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside space-y-1">
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </section>

        <section className="mb-2">
          <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
          <ol className="list-decimal list-inside space-y-2">
            {recipe.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </section>

        <div className="mt-6">
          <Link to="/" className="inline-block text-blue-600 underline">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

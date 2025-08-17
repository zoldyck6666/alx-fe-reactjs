import { Link } from "react-router-dom";
import data from "../data.json";

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Recipe Sharing Platform</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.recipes.map((r) => (
          <Link
            key={r.id}
            to={`/recipe/${r.id}`}
            className="block bg-white rounded-xl shadow hover:shadow-lg transition p-4"
          >
            <img
              src={r.image}
              alt={r.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h2 className="text-xl font-semibold">{r.name}</h2>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {r.ingredients.slice(0, 3).join(", ")}
              {r.ingredients.length > 3 ? "…" : ""}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

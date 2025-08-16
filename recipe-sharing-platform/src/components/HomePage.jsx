import { Link } from 'react-router-dom';
import data from '../data.json';

function HomePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {data.recipes.map(recipe => (
        <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
          <div className="border p-4 rounded-lg hover:shadow-lg transition">
            <img src={recipe.image} alt={recipe.name} className="w-full h-40 object-cover rounded" />
            <h2 className="mt-2 text-xl font-bold">{recipe.name}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default HomePage;

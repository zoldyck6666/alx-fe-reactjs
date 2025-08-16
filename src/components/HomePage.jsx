// src/components/HomePage.jsx
import React from 'react';
import data from '../data.json'; // if you have mock recipe data

const HomePage = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {data.map((recipe) => (
        <div key={recipe.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
          <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-bold">{recipe.title}</h2>
            <p className="text-gray-600">{recipe.summary}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;

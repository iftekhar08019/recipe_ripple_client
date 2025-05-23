import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

const AllRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("All");

  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/all-recipes/")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setFilteredRecipes(data); // initially show all
      })
      .catch((err) => console.error("Failed to load recipes:", err));
  }, []);

  useEffect(() => {
    if (selectedCuisine === "All") {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter(
        (recipe) => recipe.cuisineType === selectedCuisine
      );
      setFilteredRecipes(filtered);
    }
  }, [selectedCuisine, recipes]);

  const cuisineOptions = [
    "All",
    "Italian",
    "Mexican",
    "Indian",
    "Chinese",
    "Others",
  ];

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="lg:text-4xl text-xl font-bold text-center my-6">
        All Recipes
      </h1>

      {/* Cuisine Dropdown */}
      <div className="mb-8">
        <select
          value={selectedCuisine}
          onChange={(e) => setSelectedCuisine(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          {cuisineOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Recipe Cards */}
      <div className="lg:w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No recipes found for selected cuisine.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllRecipe;

import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

const AllRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"

  useEffect(() => {
    fetch("https://recipe-ripple-server.vercel.app/all-recipes/")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setFilteredRecipes(data); // initially show all
      })
      .catch((err) => console.error("Failed to load recipes:", err));
  }, []);

  useEffect(() => {
    let filtered;
    if (selectedCuisine === "All") {
      filtered = [...recipes];
    } else {
      filtered = recipes.filter(
        (recipe) => recipe.cuisineType === selectedCuisine
      );
    }

    // Sort filtered array by title based on sortOrder
    filtered.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA < titleB) return sortOrder === "asc" ? -1 : 1;
      if (titleA > titleB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredRecipes(filtered);
  }, [selectedCuisine, recipes, sortOrder]);

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

      {/* Controls: Cuisine + Sort */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center">
        {/* Cuisine Dropdown */}
        <select
          value={selectedCuisine}
          onChange={(e) => setSelectedCuisine(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          {cuisineOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>

        {/* Sort Dropdown */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select select-bordered w-full max-w-xs"
          aria-label="Sort recipes by title"
        >
          <option value="asc">Sort by Title: Ascending (A-Z)</option>
          <option value="desc">Sort by Title: Descending (Z-A)</option>
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

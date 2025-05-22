import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { Link } from "react-router";

const TopRecipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/recipes.json")
      .then((res) => res.json())
      .then((data) => {
        // Sort by likes descending and take top 6
        const topRecipes = data.sort((a, b) => b.likes - a.likes).slice(0, 6);
        setRecipes(topRecipes);
      })
      .catch((err) => console.error("Failed to load recipes:", err));
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="lg:text-4xl text-xl font-bold text-center mt-15">
          Top Recipes
        </h1>
        <div className="lg:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
        <div className="card-actions mt-10">
          <Link to="/recipes" className="btn btn-primary">
            View All Recipes
          </Link>
        </div>
      </div>
    </>
  );
};

export default TopRecipe;

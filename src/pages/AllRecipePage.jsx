import React, { useEffect, useState } from "react";

import { Link } from "react-router";
import RecipeCard from "../components/RecipeCard";

const AllRecipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/all-recipes/")
      .then((res) => res.json())
      .then((data) => {
        
        setRecipes(data);
      })
      .catch((err) => console.error("Failed to load recipes:", err));
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="lg:text-4xl text-xl font-bold text-center mt-15">
          All Recipes
        </h1>
        <div className="lg:w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllRecipe;

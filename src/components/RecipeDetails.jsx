import React, { useState, useEffect, useContext } from "react";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const RecipeDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [recipe, setRecipe] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        setMainImage(data.image);
        setLikes(data.likeCount || 0);

        // Determine if the current user is the owner
        if (user?.email && data?.user?.email === user.email) {
          setIsOwner(true);
        }
      })
      .catch((err) => console.error("Failed to fetch recipe details:", err));
  }, [id, user?.email]);

  const handleLike = async () => {
    if (isOwner) return alert("You cannot like your own recipe.");

    try {
      const res = await fetch(`http://localhost:3000/recipes/${id}/like`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to like");

      const data = await res.json();
      setLikes(data.likeCount);
    } catch (error) {
      console.error(error);
      alert("Could not like this recipe. Try again.");
    }
  };

  if (!recipe) return <p className="text-center p-10">Loading recipe...</p>;

  const {
    title,
    ingredients,
    instructions,
    cuisineType,
    preparationTime,
    categories,
  } = recipe;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto px-4 py-8">
        <h1 className="lg:text-4xl text-xl font-bold text-center my-7">
          {title}'s Recipe
        </h1>
        <h2 className="text-xl font-semibold mb-6 text-center text-primary">
          {likes} people interested in this recipe
        </h2>

        <div className="flex flex-col lg:flex-row mx-4 gap-8">
          {/* Image Section */}
          <div className="w-full md:w-1/2 px-4">
            <img
              src={mainImage}
              alt={title}
              className="w-full h-auto rounded-lg shadow-md mb-4 object-cover max-h-[400px]"
            />
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Cuisine Type:</span> {cuisineType}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Preparation Time:</span>{" "}
              {preparationTime} mins
            </p>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">Categories:</h3>
              <ul className="flex flex-wrap gap-3">
                {categories?.length > 0 ? (
                  categories.map((cat) => (
                    <li
                      key={cat}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {cat}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No categories</li>
                )}
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">Ingredients:</h3>
              <p className="whitespace-pre-wrap text-gray-700">{ingredients}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-1">Instructions:</h3>
              <p className="whitespace-pre-wrap text-gray-700">
                {instructions}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                disabled={isOwner}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors ${
                  isOwner
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 text-gray-800 hover:bg-red-600 hover:text-white"
                }`}
              >
                <FaHeart />
                Like
              </button>
              <span>
                {likes} {likes === 1 ? "Like" : "Likes"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;

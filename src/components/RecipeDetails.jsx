import React, { useState, useEffect, useContext } from "react";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router"; // note: 'react-router-dom' is typical for web
import { AuthContext } from "../Provider/AuthProvider";

const RecipeDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [recipe, setRecipe] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3000/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        setMainImage(data.image);
        setLikes(data.likeCount || 0);

        // Check if current user liked this recipe
        if (user?.email && data.likedBy?.includes(user.email)) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      })
      .catch((err) => console.error("Failed to fetch recipe details:", err));
  }, [id, user?.email]);

  const handleLike = async () => {
    if (!user?.email) {
      alert("You must be logged in to like a recipe.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/recipes/${id}/like`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: user.email, like: !liked }),
      });

      if (!res.ok) throw new Error("Failed to update like");

      const data = await res.json();

      setLikes(data.likeCount);
      setLiked(!liked);
    } catch (error) {
      console.error(error);
      alert("Could not update like count, please try again.");
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
      <h1 className="lg:text-4xl text-xl font-bold text-center my-15">
        {title}'s Recipe
      </h1>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row mx-4 gap-8">
          {/* Images Section */}
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
                {categories && categories.length ? (
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
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors ${
                  liked ? "bg-red-600 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                <FaHeart />
                {liked ? "Liked" : "Like"}
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

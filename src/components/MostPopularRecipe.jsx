import React, { useState, useEffect, useContext } from "react";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";

const MostPopularRecipe = () => {
  const { user } = useContext(AuthContext);

  const [recipe, setRecipe] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    // Adjust this URL if needed to your backend endpoint
    fetch(`https://recipe-ripple-server.vercel.app/most-popular-recipe`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        setMainImage(data.image);
        setLikes(data.likeCount || 0);

      })
      .catch((err) =>
        console.error("Failed to fetch most popular recipe:", err)
      );
  }, [user?.email]);



  if (!recipe)
    return <p className="text-center p-10">Loading most popular recipe...</p>;

  const {
    title,
    ingredients,
    instructions,
    cuisineType,
    preparationTime,
    categories,
  } = recipe;

  return (
    <div className=" min-h-screen p-6">
      <div className="container mx-auto px-4 py-8">
        <h1 className="lg:text-4xl text-xl font-bold text-center my-7">
          Most Popular Recipe: {title}
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
              <p className="whitespace-pre-wrap text-gray-700">{instructions}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MostPopularRecipe;

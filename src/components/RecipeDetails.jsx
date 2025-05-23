import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

const RecipeDetails = ({ recipe }) => {
  // Destructure your recipe data:
  const {
    title,
    image,
    ingredients,
    instructions,
    cuisineType,
    preparationTime,
    categories,
    likeCount: initialLikeCount,
  } = recipe;

  // State for main image and like count
  const [mainImage, setMainImage] = useState(image);
  const [likes, setLikes] = useState(initialLikeCount || 0);
  const [liked, setLiked] = useState(false);

  // Example other images (could be from recipe.images array)
  const thumbnails = [
    image,
    "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1496957961599-e35b69ef5d7c?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1528148343865-51218c4a13e6?auto=format&fit=crop&w=300&q=80",
  ];

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
    // TODO: Update like count in DB here
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4 gap-8">
          {/* Images Section */}
          <div className="w-full md:w-1/2 px-4">
            <img
              src={mainImage}
              alt={title}
              id="mainImage"
              className="w-full h-auto rounded-lg shadow-md mb-4 object-cover max-h-[400px]"
            />
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {thumbnails.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  onClick={() => setMainImage(src)}
                />
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Cuisine Type:</span> {cuisineType}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Preparation Time:</span> {preparationTime} mins
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
              <p className="whitespace-pre-wrap text-gray-700">{instructions}</p>
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
              <span>{likes} {likes === 1 ? "Like" : "Likes"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;

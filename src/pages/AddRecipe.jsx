import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const AddRecipePage = () => {
  const { user } = useContext(AuthContext); // get current logged in user
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    ingredients: "",
    instructions: "",
    cuisineType: "",
    preparationTime: "",
    categories: [],
    likeCount: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => {
        const categories = checked
          ? [...prev.categories, value]
          : prev.categories.filter((cat) => cat !== value);
        return { ...prev, categories };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeData = {
      ...formData,
      likeCount: 0,
      user: {
        name: user?.displayName || "Anonymous",
        email: user?.email,
      },
    };

    try {
      const res = await fetch("http://localhost:3000/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeData),
      });

      if (!res.ok) {
        throw new Error(`Failed to add recipe: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("Recipe added:", data);

      Swal.fire({
        title: "Success!",
        text: "Recipe added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      setFormData({
        title: "",
        image: "",
        ingredients: "",
        instructions: "",
        cuisineType: "",
        preparationTime: "",
        categories: [],
        likeCount: 0,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: error.message || "Failed to add recipe",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div
      className="hero min-h-screen bg-fixed"
      style={{
        backgroundImage:
          "url(https://www.capecrystalbrands.com/cdn/shop/articles/hero-1.jpg?v=1711987888)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content w-full max-w-5xl text-neutral-content">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full rounded-md shadow-xl p-8 text-black"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-black">
            Add New Recipe
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered w-full"
              type="text"
              placeholder="Recipe Title"
              required
            />

            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="input input-bordered w-full"
              type="text"
              placeholder="Image URL"
              required
            />

            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              className="textarea textarea-bordered w-full md:col-span-2"
              placeholder="Ingredients (comma separated or paragraph)"
              required
            ></textarea>

            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              className="textarea textarea-bordered w-full md:col-span-2"
              placeholder="Instructions"
              required
            ></textarea>

            <select
              name="cuisineType"
              value={formData.cuisineType}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Cuisine Type</option>
              <option value="Italian">Italian</option>
              <option value="Mexican">Mexican</option>
              <option value="Indian">Indian</option>
              <option value="Chinese">Chinese</option>
              <option value="Others">Others</option>
            </select>

            <input
              name="preparationTime"
              value={formData.preparationTime}
              onChange={handleChange}
              className="input input-bordered w-full"
              type="number"
              placeholder="Preparation Time (minutes)"
              required
            />
          </div>

          <div className="mt-6">
            <label className="block font-semibold mb-2">Categories:</label>
            <div className="flex flex-wrap gap-4">
              {["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"].map(
                (cat) => (
                  <label key={cat} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="categories"
                      value={cat}
                      checked={formData.categories.includes(cat)}
                      onChange={handleChange}
                      className="checkbox checkbox-sm"
                    />
                    {cat}
                  </label>
                )
              )}
            </div>
            <div className="form-control mt-5">
              <label className="label">
                <span className="label-text font-semibold">Like Count</span>
              </label>
              <input
                type="number"
                name="likeCount"
                value={formData.likeCount}
                readOnly
                disabled
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-8 w-full">
            Add Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipePage;

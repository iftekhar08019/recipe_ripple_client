import React, { useState, useEffect, useContext } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const initialRecipeState = {
  title: "",
  image: "",
  ingredients: "",
  instructions: "",
  cuisineType: "",
  preparationTime: "",
  categories: [],
  likeCount: 0,
};

const MyRecipes = () => {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [formData, setFormData] = useState(initialRecipeState);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://recipe-ripple-server.vercel.app/recipes?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setRecipes(data))
        .catch((err) => console.error("Failed to fetch recipes", err));
    }
  }, [user?.email]);

  const openEditModal = (recipe) => {
    setEditingRecipe(recipe);
    setFormData(recipe);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setEditingRecipe(null);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => {
        const categories = checked
          ? [...prev.categories, value]
          : prev.categories.filter((c) => c !== value);
        return { ...prev, categories };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://recipe-ripple-server.vercel.app/recipes/${editingRecipe._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) throw new Error("Update failed");

      setRecipes((prev) =>
        prev.map((r) => (r._id === editingRecipe._id ? formData : r))
      );
      closeEditModal();

      await Swal.fire({
        icon: "success",
        title: "Recipe Updated",
        text: "Your recipe has been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update recipe. Please try again.",
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this recipe? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`https://recipe-ripple-server.vercel.app/recipes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      setRecipes((prev) => prev.filter((r) => r._id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Your recipe has been deleted.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Failed to delete recipe. Please try again.",
      });
    }
  };

  if (!user) return <p className="text-center p-10">Loading user info...</p>;

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">My Recipes</h1>

      {recipes.length === 0 && (
        <p className="text-center text-gray-600">
          You have not added any recipes yet.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="card bg-base-100 shadow-lg rounded-lg"
          >
            <figure className="px-4 pt-4">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="rounded-lg h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{recipe.title}</h2>
              <p>
                <span className="font-semibold">Cuisine: </span>
                {recipe.cuisineType}
              </p>
              <p className="line-clamp-3">
                <span className="font-semibold">Ingredients: </span>
                {recipe.ingredients}
              </p>
              <p className="line-clamp-3">
                <span className="font-semibold">Instructions: </span>
                {recipe.instructions}
              </p>
              <p>
                <span className="font-semibold">Preparation Time: </span>
                {recipe.preparationTime} mins
              </p>
              <p>
                <span className="font-semibold">Categories: </span>
                {recipe.categories.join(", ")}
              </p>
              <p>
                <span className="font-semibold">Likes: </span>{" "}
                {recipe.likeCount}
              </p>

              <div className="card-actions justify-end gap-2 mt-4">
                <button
                  onClick={() => openEditModal(recipe)}
                  className="btn btn-sm btn-outline btn-primary flex items-center gap-2"
                >
                  <FaEdit /> Update
                </button>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="btn btn-sm btn-outline btn-error flex items-center gap-2"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <>
          <input
            type="checkbox"
            id="edit-modal"
            className="modal-toggle"
            checked={isModalOpen}
            readOnly
          />
          <div className="modal">
            <div className="modal-box relative max-w-3xl">
              <label
                htmlFor="edit-modal"
                className="btn btn-sm btn-circle absolute right-4 top-4"
                onClick={closeEditModal}
              >
                ✕
              </label>

              <h3 className="text-lg font-bold mb-4">Update Recipe</h3>

              <form
                onSubmit={handleUpdate}
                className="space-y-4 max-h-[70vh] overflow-y-auto"
              >
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  className="input input-bordered w-full"
                  type="text"
                  placeholder="Title"
                  required
                />
                <input
                  name="image"
                  value={formData.image}
                  onChange={handleFormChange}
                  className="input input-bordered w-full"
                  type="text"
                  placeholder="Image URL"
                  required
                />
                <textarea
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleFormChange}
                  className="textarea textarea-bordered w-full"
                  placeholder="Ingredients"
                  required
                />
                <textarea
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleFormChange}
                  className="textarea textarea-bordered w-full"
                  placeholder="Instructions"
                  required
                />
                <select
                  name="cuisineType"
                  value={formData.cuisineType}
                  onChange={handleFormChange}
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
                  onChange={handleFormChange}
                  className="input input-bordered w-full"
                  type="number"
                  placeholder="Preparation Time (minutes)"
                  required
                />

                <div className="mt-2">
                  <label className="block font-semibold mb-2">
                    Categories:
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"].map(
                      (cat) => (
                        <label key={cat} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="categories"
                            value={cat}
                            checked={formData.categories.includes(cat)}
                            onChange={handleFormChange}
                            className="checkbox checkbox-sm"
                          />
                          {cat}
                        </label>
                      )
                    )}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary mt-4 w-full">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyRecipes;

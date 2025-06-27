import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import AddRecipePage from "../pages/AddRecipe";
import AllRecipe from "../pages/AllRecipePage";
import RecipeDetails from "../components/RecipeDetails";
import PrivateRoute from "../Provider/PrivateRoute";
import MyRecipes from "../pages/MyRecipes";
import ContactUs from "../pages/ContactUs";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Registration,
      },
      {
        path: "/add-recipe",
        element: (
          <PrivateRoute>
            <AddRecipePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-recipes",
        Component: AllRecipe,
      },
      {
        path: "/my-recipes",
        element: (
          <PrivateRoute>
            <MyRecipes />
          </PrivateRoute>
        ),
      },
      {
        path: "/recipes/:id",
        element: (
          <PrivateRoute>
            <RecipeDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/contact",
        element: <ContactUs />,
      }
    ],
  },
]);

export default router;

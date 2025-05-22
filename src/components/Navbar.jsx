import React, { useContext } from "react";
import logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/all-recipes">All Recipes</NavLink>
            </li>
            <li>
              <NavLink to="/add-recipe">Add Recipe</NavLink>
            </li>
            <li>
              <NavLink to="/my-recipes">My Recipes</NavLink>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <img className="w-9" src={logo}></img>
          <h1 className="text-sm">Recipe Ripple</h1>
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/all-recipes">All Recipes</NavLink>
          </li>
          <li>
            <NavLink to="/add-recipe">Add Recipe</NavLink>
          </li>
          <li>
            <NavLink to="/my-recipes">My Recipes</NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-end ">
        {!user ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="btn btn-outline mr-2 w-15 text-sm"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="btn btn-primary w-20 text-sm"
            >
              Register
            </button>
          </>
        ) : (
          <div className="flex gap-2 items-center">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={
                      user.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
              >
                <li>
                <h4>{user.name}</h4>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

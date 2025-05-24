import React, { useContext, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaGoogle, FaPhotoFilm } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Provider/AuthProvider";

const Registration = () => {
  const { createUser, setUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState(""); // State for password error
  const [password, setPassword] = useState(""); // Password state
  const navigate = useNavigate();
  const { googleSignIn } = useContext(AuthContext);

  // Password validation function
  const validatePassword = (password) => {
    const uppercase = /[A-Z]/; // Check for uppercase letter
    const lowercase = /[a-z]/; // Check for lowercase letter
    const length = password.length >= 6; // Check if password length is at least 6

    if (!uppercase.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!lowercase.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!length) {
      return "Password must be at least 6 characters long.";
    }
    return ""; // Return empty string if password is valid
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    // Name validation
    if (name.length < 5) {
      setNameError("Name should be more than 5 characters");
      return;
    } else {
      setNameError("");
    }

    // Password validation
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return; // Prevent registration if password is invalid
    } else {
      setPasswordError(""); // Clear password error if password is valid
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            // Prepare user data to send to your server
            const userProfile = {
              name,
              email,
              photoURL: photo,
              uid: user.uid, // optional, include user uid if you want
            };

            // POST user data to your backend
            fetch("https://recipe-ripple-server.vercel.app/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userProfile),
            })
              .then((res) => res.json())
              .then((data) => {
                //console.log("User saved to backend:", data);
                setUser({ ...user, displayName: name, photoURL: photo });
                navigate(location.state ? location.state : "/");
              })
              .catch((error) => {
                console.error("Error saving user to backend:", error);
                alert("Failed to save user data.");
                setUser(user);
                navigate(location.state ? location.state : "/");
              });
          })
          .catch((error) => {
            alert(error.message);
            setUser(user);
            navigate(location.state ? location.state : "/");
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn() // Call googleSignIn method from AuthContext
      .then((result) => {
        const user = result.user;

        // Prepare user data for backend
        const userProfile = {
          name: user.displayName || "",
          email: user.email || "",
          photoURL: user.photoURL || "",
          uid: user.uid,
        };

        // Send user data to backend
        fetch("https://recipe-ripple-server.vercel.app/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userProfile),
        })
          .then((res) => res.json())
          .then((data) => {
            //console.log("User saved to backend:", data);
            alert(`${user.displayName} registered successfully`);
            navigate(location.state ? location.state : "/");
          })
          .catch((error) => {
            console.error("Error saving user to backend:", error);
            alert("User registered but failed to save user data.");
            navigate(location.state ? location.state : "/");
          });
      })
      .catch((error) => {
        alert(error.message || "Google sign-in failed");
        setError("Something went wrong with Google login.");
      });
  };

  return (
    <div className="w-11/12 mx-auto px-4 shadow-2xl my-10 rounded-2xl ">
      <>
        <Helmet>
          <title>Recipe Ripple | Registration</title>
        </Helmet>
      </>
      <div className="flex flex-col items-center space-y-8">
        <h1 className="lg:text-4xl text-xl font-bold text-center mt-15">
          Register to Recipe Ripple
        </h1>
        <div className="lg:w-1/2 text-center px-8 md:px-32 lg:px-24 my-8">
          <form
            onSubmit={handleRegister}
            className="bg-white rounded-md shadow-2xl p-5"
          >
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Hello There
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-8">
              Welcome to Recipe Ripple
            </p>
            <div className="flex items-center border-2 mb-5 py-2 px-3 rounded-2xl border-blue-500 text-black">
              <FaUserAlt />
              <input
                className="pl-2 w-full outline-none border-none"
                type="text"
                name="name"
                id="username"
                placeholder="Name"
                required
              />
            </div>
            {nameError && <p className="text-xs text-red-500">{nameError}</p>}{" "}
            {/* Display name error */}
            <div className="flex items-center border-2 mb-5 py-2 px-3 rounded-2xl border-blue-500 text-black bg-transparent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                id="email"
                className="pl-2 w-full outline-none border-none"
                type="email"
                name="email"
                placeholder="Email Address"
                required
              />
            </div>
            <div className="flex items-center border-2 mb-5 py-2 px-3 rounded-2xl border-blue-500 text-black">
              <FaPhotoFilm />
              <input
                className="pl-2 w-full outline-none border-none"
                type="text"
                name="photo"
                id="photo"
                placeholder="Photo URL"
              />
            </div>
            <div className="flex items-center border-2 mb-5 py-2 px-3 rounded-2xl border-blue-500 text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 w-full outline-none border-none"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {passwordError && (
              <p className="text-xs text-red-500">{passwordError}</p>
            )}{" "}
            {/* Display password validation error */}
            {error && <p className="text-red-400 text-xs">{error}</p>}{" "}
            {/* Error message */}
            <button
              onClick={handleGoogleSignIn}
              type="submit"
              className="block border-2 border-black w-full mt-5 py-2 rounded-2xl hover:bg-gray-300 hover:-translate-y-1 transition-all duration-500 text-black font-semibold mb-2"
            >
              <FaGoogle className="inline"></FaGoogle> Register with Google
            </button>
            <button
              type="submit"
              className="group w-full relative inline-flex h-[calc(48px+8px)] items-center justify-center rounded-full bg-neutral-950 py-1 pl-6 pr-14 font-medium text-neutral-50"
            >
              <span className="z-10 pr-2">Register</span>
              <div className="absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full bg-neutral-700 transition-[width] group-hover:w-[calc(100%-8px)]">
                <div className="mr-3.5 flex items-center justify-center">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-neutral-50"
                  >
                    <path
                      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </button>
            <div className="flex justify-between mt-4">
              <Link
                to="/login"
                className="text-sm ml-2 text-black hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
              >
                Already have an account yet?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;

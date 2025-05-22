import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/023/257/296/large/eating-fast-food-bw-404-animation-teen-in-fastfood-cafe-empty-state-4k-concept-footage-with-alpha-channel-transparency-monochromatic-error-flash-message-for-web-page-not-found-ui-design-video.jpg"
        alt="404 Not Found"
        className="max-w-full w-80 sm:w-96 mb-8"
      />
      <h1 className="text-4xl text-center sm:text-5xl font-bold text-gray-800 mb-4">
        Oops! Page Not Found
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 mb-6 text-center max-w-xl">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>
      <a
        href="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default ErrorPage;

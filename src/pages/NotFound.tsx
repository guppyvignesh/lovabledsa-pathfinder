import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-100 p-6 animate-fadeIn">
      <div className="text-center max-w-md">
        {/* <img
          src="https://illustrations.popsy.co/white/404-error.svg"
          alt="404 illustration"
          className="w-72 mx-auto mb-6"
        /> */}
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">
          Sorry, the page{" "}
          <code className="bg-white px-2 py-1 rounded text-red-500">
            {location.pathname}
          </code>{" "}
          doesn’t exist.
        </p>
        <a
          href="/"
          className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

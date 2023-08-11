import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout } = useContext(AuthContext);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {!isCollapsed && (
        <nav className="sticky top-0 h-screen w-64 p-8 bg-white flex flex-col justify-between">
          <div className="relative">
            <button
              onClick={handleToggle}
              className="absolute top-0 right-0 text-red-500 text-2xl p-2"
            >
              &times;
            </button>
            <h1 className="mt-2 mb-10 text-left text-2xl font-extrabold text-gray-900">
              Mall<span className="text-indigo-700">Flow</span>
            </h1>
            <Link
              to="/map"
              className="block mb-3 text-gray-700 hover:text-indigo-600 text-lg"
            >
              Map
            </Link>
            <hr className="border-gray-200 my-6" />
            <Link
              to="/profile"
              className="block mb-3 text-gray-700 hover:text-indigo-600 text-lg"
            >
              Profile
            </Link>
            <hr className="border-gray-200 my-6" />
            {currentUser.userType === "business-owner" && (
              <div>
                <Link
                  to="/storeselect"
                  className="block mb-3 text-gray-700 hover:text-indigo-600 text-lg"
                >
                  Stores
                </Link>
                <hr className="border-gray-200 my-6" />
              </div>
            )}
            {currentUser.userType === "customer" && (
              <div>
                <Link
                  to="/wishlist"
                  className="block mb-3 text-gray-700 hover:text-indigo-600 text-lg"
                >
                  Wishlist
                </Link>
                <hr className="border-gray-200 my-6" />
              </div>
            )}
            {currentUser.userType === "customer" && (
              <div>
                <Link
                  to="/cart"
                  className="block mb-3 text-gray-700 hover:text-indigo-600 text-lg"
                >
                  Cart
                </Link>
                <hr className="border-gray-200 my-6" />
              </div>
            )}  
          </div>
          <button
            onClick={handleLogout}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-400"
          >
            Logout
          </button>
        </nav>
      )}

      {isCollapsed && (
        <div className="sticky top-0 h-screen w-16 p-8 bg-white flex flex-col justify-start items-center">
          <button onClick={handleToggle} className="text-black text-2xl p-2">
            &#9776;
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;

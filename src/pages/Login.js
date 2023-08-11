import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Loading from "./Loading";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    const success = await login(email, password);
    if (success) {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser.userType === "customer") {
        setLoading(false);
        navigate("/map");
      } else if (currentUser.userType === "business-owner") {
        setLoading(false);
        navigate("/storeselect");
      }
    } else {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h1 className="mt-6 text-center text-6xl font-extrabold text-gray-900">
                Mall<span className="text-indigo-700">Flow</span>
              </h1>
            </div>
            {error && (
              <p className="text-center text-2xl text-red-500">
                Incorrect email or password.
              </p>
            )}
            <form onSubmit={handleLogin} className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-l"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-l"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-l font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
              <Link
                to="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-400"
              >
                Create an account?
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
  
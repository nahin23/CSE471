import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { BsChevronDown } from "react-icons/bs";
import Loading from "./Loading";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;
    const userType = e.target["user-type"].value;
 
    const success = await signup(name, email, phone, password, userType);
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
                Sign<span className="text-indigo-700">Up</span>
              </h1>
            </div>
            {error && (
              <p className="text-center text-2xl text-red-500">
                Error signing up.
              </p>
            )}
            <form onSubmit={handleSignUp} className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-l"
                    placeholder="Name"
                  />
                </div>
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
                  <label htmlFor="phone-number" className="sr-only">
                    Phone Number
                  </label>
                  <input
                    id="phone-number"
                    name="phone"
                    type="text"
                    autoComplete="phone"
                    required
                    className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-l"
                    placeholder="Phone Number"
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
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-l"
                    placeholder="Password"
                  />
                </div>
                <div>
                  <label htmlFor="user-type" className="sr-only">
                    User Type
                  </label>
                  <div className="relative">
                    <select
                      id="user-type"
                      name="user-type"
                      required
                      className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-l pr-8"
                    >
                      <option value="" disabled selected>
                        Choose User Type
                      </option>
                      <option value="customer">Customer</option>
                      <option value="business-owner">Business Owner</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <BsChevronDown />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-l font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
              <Link
                to="/"
                className="font-medium text-indigo-600 hover:text-indigo-400"
              >
                Already have an account? Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;

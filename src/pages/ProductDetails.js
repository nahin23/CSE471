import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Review from "../components/Review";
import { useNavigate, useLocation } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import Loading from "./Loading";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [loading, setLoading] = useState(false);
 
  const addToWishlist = async () => {
    setLoading(true);
    try {
      currentUser.wishlist.push(location.state.productId);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      const userRef = doc(db, "users", currentUser.id);
      await getDoc(userRef);
      await setDoc(userRef, currentUser);
      setLoading(false);
      alert("Successfully added to wishlist!");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert("Error adding to wishlist!");
    }
  };

  useEffect(() => {
    if (!currentUser || currentUser.userType === "business-owner") {
      navigate("/");
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen bg-gray-100">
          <div className="flex">
            <div className="sticky top-0 w-1/6">
              <Navbar />
            </div>
            <div className="w-1/2 p-8">
              <h1 className="text-4xl font-bold mb-8">{location.state.name}</h1>
              <div className="flex overflow-x-scroll scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-transparent hover:scrollbar-thumb-indigo-400">
                {location.state.images.map((url) => {
                  return (
                    <img
                      src={url}
                      alt="Product"
                      className="w-100 h-100 object-cover rounded-md mr-8"
                    />
                  );
                })}
              </div>
              <div className="my-8">
                <p className="text-gray-700 mb-4">
                  Stock: {location.state.stock}
                </p>
                <p className="text-gray-700 mb-4">
                  Price: {location.state.price}
                </p>
                <p className="text-gray-700 mb-4">
                  {location.state.description}
                </p>
                {location.state.stock === "0" ? (
                  <button
                    onClick={addToWishlist}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-400"
                  >
                    Add to Wishlist
                  </button>
                ) : (
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-400">
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
            <div className="sticky top-0 h-screen w-1/3 p-8">
              <div className="flex flex-col h-full">
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Write a <span className="text-indigo-700">review</span>
                  </h2>
                  <form>
                    <textarea
                      className="w-full h-32 mb-4 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Write your review here..."
                    ></textarea>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md  hover:bg-indigo-400">
                      Submit
                    </button>
                  </form>
                </div>
                <div className="bg-white p-4 mb-8 rounded-md shadow-md mt-8 flex-1 overflow-y-auto max-h-80 scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-transparent hover:scrollbar-thumb-indigo-400">
                  <h2 className="text-2xl font-bold mb-4">
                    Previous <span className="text-indigo-700">Reviews</span>
                  </h2>
                  <Review />
                  <Review />
                  <Review />
                  <Review />
                  <Review />
                  <Review />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;

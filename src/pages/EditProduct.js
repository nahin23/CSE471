import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Review from "../components/Review";
import { useNavigate, useLocation } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Loading from "./Loading";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [stock, setStock] = useState(location.state.stock);
  const [price, setPrice] = useState(location.state.price);
  const [description, setDescription] = useState(location.state.description);
  const [loading, setLoading] = useState(false);

  const updateProduct = async () => {
    setLoading(true);
    try {
      const productRef = doc(db, "products", location.state.productId);
      await updateDoc(productRef, {
        stock,
        price,
        description,
      });
      setLoading(false);
      alert("Product successfully updated!");
    } catch (error) {
      setLoading(false);
      alert("Error updating product!");
    }
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || currentUser.userType === "customer") {
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
                <label htmlFor="stock" className="block text-gray-700 mb-2">
                  Stock
                </label>
                <input
                  id="stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
                />

                <label htmlFor="price" className="block text-gray-700 mb-2">
                  Price
                </label>
                <input
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
                />

                <label
                  htmlFor="description"
                  className="block text-gray-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
                ></textarea>

                <button
                  onClick={updateProduct}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-400"
                >
                  Update
                </button>
              </div>
            </div>
            <div className="sticky top-0 h-screen w-1/3 p-8">
              <div className="flex flex-col h-full">
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

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StoreProductV2 from "../components/StoreProductV2";
import Review from "../components/Review";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "./Loading";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const Store = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState({});

  const [searchQuery, setSearchQuery] = useState("");
 
  const filteredProducts = Object.keys(products).filter((product) => {
    return products[product].name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  const fetchProducts = async () => {
    setLoading(true);
    const q = query(
      collection(db, "products"),
      where("storeId", "==", location.state.id)
    );
    const querySnapshot = await getDocs(q);
    const temp = {};
    querySnapshot.forEach((doc) => {
      temp[doc.id] = doc.data();
    });
    setProducts(temp);
    setLoading(false);
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || currentUser.userType === "business-owner") {
      navigate("/");
    }
    fetchProducts();
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
              <h1 className="text-4xl font-bold mb-4">{location.state.name}</h1>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full mb-8 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-8"
                  placeholder="Search products..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => {
                  return (
                    <StoreProductV2
                      details={{ ...products[product], productId: product }}
                    />
                  );
                })}
              </div>
            </div>
            <div className="sticky top-0 h-screen w-1/3 p-8">
              <div className="flex flex-col h-full">
                <div className="bg-white p-4 rounded-md shadow-md mt-8 mb-8 flex-1max-h-20">
                  <h2 className="text-2xl font-bold mb-4">
                    Store <span className="text-indigo-700">Info</span>
                  </h2>
                  <p>Hours of operation: {location.state.hours}</p>
                  <p>
                    Location:{" "}
                    {`Block ${location.state.location.charAt(
                      0
                    )} Shop ${location.state.location.charAt(1)}`}
                  </p>
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

                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Write a <span className="text-indigo-700">Review</span>
                  </h2>
                  <form>
                    <textarea
                      className="w-full h-32 mb-4 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Write your review here..."
                    ></textarea>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-400">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Store;

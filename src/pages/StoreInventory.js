import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import StoreProduct from "../components/StoreProduct";
import Review from "../components/Review";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Loading from "./Loading";

const Store = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false);

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
    if (!currentUser || currentUser.userType === "customer") {
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
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full mb-8 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search products..."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                  onClick={() => {
                    navigate("/addproduct", {
                      state: {
                        ...location.state,
                      },
                    });
                  }}
                  className="bg-white p-4 rounded-md shadow-md h-full flex flex-col justify-center items-center cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-10 h-10 text-gray-400 mb-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span className="text-gray-500">Add new product</span>
                </div>

                {filteredProducts.map((product) => {
                  return (
                    <StoreProduct
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
                  <p>Location: {location.state.location}</p>
                </div>

                <div className="bg-white p-4 mb-8 rounded-md shadow-md mt-8 flex-1 overflow-y-auto max-h-80 scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-transparent hover:scrollbar-thumb-indigo-400">
                  <h2 className="text-2xl font-bold mb-4">
                    Previous <span className="text-indigo-700">reviews</span>
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

export default Store;

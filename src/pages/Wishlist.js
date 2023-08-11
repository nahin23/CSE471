import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import WishlistProduct from "../components/WishlistProduct";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { collection, where, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const Wishlist = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
 
    const productsRef = collection(db, "products");
    const fetchedProducts = {};

    const productPromises = currentUser.wishlist.map(async (productId) => {
      const productDoc = doc(productsRef, productId);
      const productSnapshot = await getDoc(productDoc);
      if (productSnapshot.exists()) {
        fetchedProducts[productId] = productSnapshot.data();
      }
    });

    await Promise.all(productPromises);

    setProducts(fetchedProducts);
    setLoading(false);
  };

  useEffect(() => {
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
            <div className="w-5/6 p-8">
              <h1 className="text-4xl font-bold mb-8">
                <span className="text-indigo-800">Wishlist</span>
              </h1>
              <div className="grid grid-cols-3 gap-4">
                {Object.keys(products).map((product) => {
                  return <WishlistProduct details={{ ...products[product] }} />;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Wishlist;

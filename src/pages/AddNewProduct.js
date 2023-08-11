import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import Loading from "./Loading";

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const uploadedImageURLs = await Promise.all(
        images.map(async (image, index) => {
          const storageRef = ref(storage, `products/${Date.now()}_${index}`);
          const snapshot = await uploadBytesResumable(storageRef, image);
          return getDownloadURL(snapshot.ref);
        })
      );

      const product = {
        storeId: location.state.id,
        name: e.target["product-name"].value,
        price: e.target["product-price"].value,
        stock: e.target["product-stock"].value,
        description: e.target["product-description"].value,
        images: uploadedImageURLs,
      };

      await addDoc(collection(db, "products"), product);
      setLoading(false);
      navigate("/inventory", {
        state: {
          ...location.state,
        },
      });
    } catch (error) {
      setError(true);
      setLoading(false);
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
              <div className="p-8 bg-white rounded-md shadow-md">
                <h1 className="text-4xl font-bold mb-8">
                  Add <span className="text-indigo-800">Product</span>
                </h1>
                {error && (
                  <p className="text-center text-2xl text-red-500">
                    Error adding product.
                  </p>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label
                      htmlFor="product-name"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="product-name"
                      name="product-name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="product-price"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Price
                    </label>
                    <input
                      type="text"
                      id="product-price"
                      name="product-price"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="product-stock"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Stock
                    </label>
                    <input
                      type="number"
                      id="product-stock"
                      name="product-stock"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="product-description"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Description
                    </label>
                    <textarea
                      id="product-description"
                      name="product-description"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="product-images"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Images
                    </label>
                    <div className="flex gap-4">
                      {images.map((image, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(image)}
                          alt="Product"
                          className="w-40 h-40 object-cover rounded-md"
                        />
                      ))}

                      <div className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed rounded-md">
                        <label
                          htmlFor="product-image-upload"
                          className="text-gray-400"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mx-auto h-8 w-8"
                            viewBox="0 0 20 20 20"
                            fill="currentColor"
                          ></svg>
                          Upload Images
                        </label>
                        <input
                          type="file"
                          id="product-image-upload"
                          name="product-image-upload"
                          className="hidden"
                          onChange={handleImageChange}
                          multiple
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-400"
                  >
                    Add Product
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProduct;
   
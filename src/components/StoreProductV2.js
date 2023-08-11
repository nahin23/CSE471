import React from "react";
import { useNavigate } from "react-router-dom";

function StoreProductV2({ details }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 rounded-md shadow-md hover:shadow-lg hover:scale-105 duration-300 cursor-pointer">
      <img
        src={details.images[0]}
        alt="Product"
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-bold mb-2">{details.name}</h2>
      <p className="text-gray-700 mb-4">{details.description}</p>
      <p className="text-gray-700 mb-4">Stock: {details.stock}</p>
      <p className="text-gray-700 mb-4">Price: {details.price}</p>
      <div className="flex justify-between">
        <button
          onClick={() => {
            navigate("/product", {
              state: {
                ...details,
              },
            });
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-400"
        >
          Details
        </button>
        {details.stock === "0" ? (
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-400">
            Add to Wishlist
          </button>
        ) : (
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-400">
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default StoreProductV2;
    
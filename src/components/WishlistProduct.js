import React from "react";

function WishlistProduct({ details }) {
  return (
    <div className="bg-white p-4 rounded-md shadow-md hover:scale-105 duration-300">
      <img
        src={details.images[0]}
        alt="Product"
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-bold mb-2">{details.name}</h2>
      <p className="text-gray-700 mb-4">{details.description}</p>
      <button className="bg-red-500 text-white px-4 py-2 rounded-md w-full hover:bg-red-300">
        Remove
      </button>
    </div>
  );
}
    
export default WishlistProduct;

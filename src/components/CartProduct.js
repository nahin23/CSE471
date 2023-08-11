import React from "react";

function CartProduct() {
  return (
    <div className="bg-white p-4 rounded-md shadow-md hover:scale-105 duration-300">
      <img
        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80"
        alt="Product"
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-bold mb-2">Product Title</h2>
      <p className="text-gray-700 mb-4">Product description...</p>
      <button className="bg-red-500 text-white px-4 py-2 rounded-md w-full hover:bg-red-300">
        Remove
      </button>
    </div>
  );
}

export default CartProduct;
  
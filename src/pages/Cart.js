import React from "react";
import Navbar from "../components/Navbar";
import CartProduct from "../components/CartProduct";

const Cart = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <div className="sticky top-0 w-1/6">
          <Navbar />
        </div>
        <div className="w-2/3 p-8">
          <h1 className="text-4xl font-bold mb-8">
            <span className="text-indigo-800">Cart</span>
          </h1>
          <div className="grid grid-cols-2 gap-4">
            {/* Replace the following section with a loop to render multiple products */}
            <CartProduct />
            <CartProduct />
            <CartProduct />
            <CartProduct />
            <CartProduct />
            <CartProduct />
            {/* End of product */}
          </div>
        </div>
        <div className="sticky top-0 h-screen w-1/3 p-8">
          <div className="bg-white p-4 rounded-md shadow-md h-full flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Check <span className="text-indigo-700">out</span>
              </h2>
              <p className="text-gray-700 mb-4">Subtotal: $100</p>
              <p className="text-gray-700 mb-4">Tax: $10</p>
              <p className="text-gray-700 mb-4">Delivery fee: $10</p>
              <p className="text-gray-700 mb-4 font-bold">Total: $120</p>
            </div>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md w-full mt-4 hover:bg-indigo-400">
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
  
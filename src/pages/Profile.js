import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Loading from "./Loading";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const Profile = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState(currentUser.password);
  const [phone, setPhone] = useState(currentUser.phone);
  const [loading, setLoading] = useState(false);
 
  const updateProfile = async () => {
    setLoading(true);
    try {
      const userRef = doc(db, "users", currentUser.id);
      await updateDoc(userRef, {
        name,
        email,
        password,
        phone,
      });

      currentUser.name = name;
      currentUser.email = email;
      currentUser.password = password;
      currentUser.phone = phone;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      setLoading(false);
      alert("Profile successfully updated!");
    } catch (error) {
      setLoading(false);
      alert("Error updating profile!");
    }
  };

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
                <span className="text-indigo-800">Profile</span>
              </h1>
              <div className="bg-white p-4 rounded-md shadow-md mb-8">
                <h2 className="text-xl font-bold mb-4">
                  Personal <span className="text-indigo-700">Information</span>
                </h2>
                <label
                  htmlFor="price"
                  className="block font-bold text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
                />
                <label
                  htmlFor="price"
                  className="block font-bold text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
                />
                <label
                  htmlFor="price"
                  className="block font-bold text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
                />
                <label
                  htmlFor="phone"
                  className="block font-bold text-gray-700 mb-2"
                >
                  Phone number
                </label>
                <input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
                />
                <button
                  onClick={updateProfile}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-400"
                >
                  Update
                </button>
              </div>
              {currentUser.userType === "customer" && (
                <div className="bg-white p-4 mb-10 rounded-md shadow-md flex-1 overflow-y-auto max-h-80 scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-transparent hover:scrollbar-thumb-indigo-400">
                  <h2 className="text-xl font-bold mb-4">
                    Order <span className="text-indigo-700">History</span>
                  </h2>
                  <div className="mb-4">
                    <p className="font-bold mb-2">Order #12345</p>
                    <p className="mb-2">Date: 01/01/2023</p>
                    <p className="mb-2">Total: $100</p>
                    <p className="mb-2">Status: Delivered</p>
                  </div>
                  <div className="mb-4">
                    <p className="font-bold mb-2">Order #12345</p>
                    <p className="mb-2">Date: 01/01/2023</p>
                    <p className="mb-2">Total: $100</p>
                    <p className="mb-2">Status: Delivered</p>
                  </div>
                  <div className="mb-4">
                    <p className="font-bold mb-2">Order #12345</p>
                    <p className="mb-2">Date: 01/01/2023</p>
                    <p className="mb-2">Total: $100</p>
                    <p className="mb-2">Status: Delivered</p>
                  </div>
                  <div className="mb-4">
                    <p className="font-bold mb-2">Order #12345</p>
                    <p className="mb-2">Date: 01/01/2023</p>
                    <p className="mb-2">Total: $100</p>
                    <p className="mb-2">Status: Delivered</p>
                  </div>
                  <div className="mb-4">
                    <p className="font-bold mb-2">Order #12345</p>
                    <p className="mb-2">Date: 01/01/2023</p>
                    <p className="mb-2">Total: $100</p>
                    <p className="mb-2">Status: Delivered</p>
                  </div>
                  <div className="mb-4">
                    <p className="font-bold mb-2">Order #12345</p>
                    <p className="mb-2">Date: 01/01/2023</p>
                    <p className="mb-2">Total: $100</p>
                    <p className="mb-2">Status: Delivered</p>
                  </div>
                </div>
              )}
              {currentUser.userType === "customer" && (
                <div className="bg-white p-4 rounded-md shadow-md mb-8">
                  <h2 className="text-xl font-bold mb-4">
                    Redeem <span className="text-indigo-700">Points</span>
                  </h2>
                  <p className="text-gray-700 mb-2">Available Points: 100</p>
                  <form>
                    <div className="mb-4">
                      <label htmlFor="points" className="font-bold mb-2 block">
                        Enter the number of points you want to redeem:
                      </label>
                      <input
                        type="number"
                        name="points"
                        id="points"
                        className="w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      />
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-400">
                      Redeem
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loading from "./Loading";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { AuthContext } from "../context/AuthProvider";
import elevatorImg from "../images/elevator.png";

const Map = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [stores, setStores] = useState([]);
  const [emptyLocations, setEmptyLocations] = useState([]);

  const { mapConfig } = useContext(AuthContext);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
 
  const elevators = {
    1: {
      location: [2, 3],
    },
    2: {
      location: [3, 3],
    },
  };

  const fetchStores = async () => {
    setLoading(true);
    const q = collection(db, "stores");
    const querySnapshot = await getDocs(q);
    const temp = {};
    querySnapshot.forEach((doc) => {
      temp[doc.data().location] = { ...doc.data(), id: doc.id };
    });
    setStores(temp);
    setLoading(false);
  };

  const handleStoreClick = (store) => {
    if (currentUser && currentUser.userType === "customer") {
      navigate("/store", {
        state: {
          ...stores[store],
        },
      });
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  useEffect(() => {
    const temp = Object.keys(mapConfig).filter(
      (key) => !stores.hasOwnProperty(key)
    );
    setEmptyLocations(temp);
  }, [stores]);

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
            <div className="w-2/3 p-8">
              <h1 className="text-4xl font-bold mb-8">
                <span className="text-indigo-800">Map</span>
              </h1>
              <div className="flex items-center mb-8 space-x-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search stores..."
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-1/4 px-3 py-3 border border-gray-300 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">All categories</option>
                  <option value="grocery">Grocery</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                </select>
              </div>
              <div className="grid grid-cols-6 gap-4 p-5 border-2 border-gray rounded">
                {Object.keys(stores).map((store) => {
                  let isHighlighted =
                    stores[store].name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) &&
                    (selectedCategory === "" ||
                      stores[store].category === selectedCategory);

                  if (selectedCategory === "" && searchQuery === "") {
                    isHighlighted = false;
                  }
                  return (
                    <div
                      key={store.name}
                      onClick={() => handleStoreClick(store)}
                      className={`bg-white p-4 rounded-md shadow-md ${
                        isHighlighted ? "border-4 border-indigo-400" : ""
                      } ${
                        currentUser && currentUser.userType === "customer"
                          ? "cursor-pointer"
                          : ""
                      }`}
                      style={{
                        gridColumn: mapConfig[stores[store].location][0] + 1,
                        gridRow: mapConfig[stores[store].location][1] + 1,
                      }}
                    >
                      <h2 className="text-xl text-center font-bold mb-2">
                        {stores[store].name}
                      </h2>
                      <p className="text-gray-700 text-center mb-4">
                        {stores[store].category.charAt(0).toUpperCase() +
                          stores[store].category.slice(1)}
                      </p>
                      <p className="text-gray-700 text-center mb-4">
                        {stores[store].hours}
                      </p>
                    </div>
                  );
                })}

                {emptyLocations.map((loc) => {
                  return (
                    <div
                      key={loc}
                      className="flex items-center justify-center bg-white p-4 rounded-md shadow-md"
                      style={{
                        gridColumn: mapConfig[loc][0] + 1,
                        gridRow: mapConfig[loc][1] + 1,
                      }}
                    >
                      <h2 className="text-xl text-center font-bold mb-2">
                        Empty Spot
                      </h2>
                    </div>
                  );
                })}
                {Object.keys(elevators).map((elevator) => {
                  return (
                    <div
                      key={elevator}
                      className="flex items-center justify-center bg-white p-4 rounded-md shadow-md"
                      style={{
                        gridColumn: elevators[elevator].location[0] + 1,
                        gridRow: elevators[elevator].location[1] + 1,
                      }}
                    >
                      <img
                        src={elevatorImg}
                        alt="Elevator"
                        className="w-auto h-12"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Map;

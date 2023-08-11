import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loading from "./Loading";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const StoreSelect = () => {
  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState({});
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
 
  const fetchStores = async () => {
    setLoading(true);
    const q = query(
      collection(db, "stores"),
      where("owner", "==", currentUser.id)
    );
    const querySnapshot = await getDocs(q);
    const temp = {};
    querySnapshot.forEach((doc) => {
      temp[doc.id] = doc.data();
    });
    setStores(temp);
    setLoading(false);
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || currentUser.userType === "customer") {
      navigate("/");
    }
    fetchStores();
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
                <span className="text-indigo-800">Stores</span>
              </h1>
              <div className="flex flex-wrap">
                <div className="w-1/4 p-4">
                  <div
                    onClick={() => {
                      navigate("/addstore");
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
                    <span className="text-gray-500">Add new store</span>
                  </div>
                </div>

                {Object.keys(stores).map((store) => {
                  return (
                    <div className="w-1/4 p-4">
                      <div className="bg-white p-4 rounded-md shadow-md h-full">
                        <h2 className="text-xl font-bold mb-2">
                          {stores[store].name}
                        </h2>
                        <p className="text-gray-700 mb-4">
                          Category: {stores[store].category}
                        </p>
                        <p className="text-gray-700 mb-4">
                          Location:{" "}
                          {`Block ${stores[store].location.charAt(
                            0
                          )} Shop ${stores[store].location.charAt(1)}`}
                        </p>
                        <button
                          onClick={() =>
                            navigate("/inventory", {
                              state: {
                                id: store,
                                name: stores[store].name,
                                location: `Block ${stores[
                                  store
                                ].location.charAt(0)} Shop ${stores[
                                  store
                                ].location.charAt(1)}`,
                                hours: stores[store].hours,
                              },
                            })
                          }
                          className="bg-indigo-600 text-white px-4 py-2 rounded-md w-full hover:bg-indigo-400"
                        >
                          Select store
                        </button>
                      </div>
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

export default StoreSelect;

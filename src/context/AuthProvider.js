import React, { createContext, useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const mapConfig = {
    A1: [0, 0],
    A2: [0, 1],
    A3: [0, 2],
    B1: [2, 0],
    B2: [2, 1],
    C1: [3, 0],
    C2: [3, 1],
    D1: [5, 0],
    D2: [5, 1],
    D3: [5, 2],
  };
  
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      let user = null;

      querySnapshot.forEach((doc) => {
        if (doc.data().password === password) {
          user = { id: doc.id, ...doc.data() };
        }
      });

      if (user) {
        setCurrentUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const signup = async (name, email, phone, password, userType) => {
    try {
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return false;
      }

      const newUser = {
        name,
        email,
        phone,
        password,
        userType,
        wishlist: [],
        cart: [],
      };

      const docRef = await addDoc(collection(db, "users"), newUser);
      setCurrentUser({ id: docRef.id, ...newUser });
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ id: docRef.id, ...newUser })
      );
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const value = {
    mapConfig,
    currentUser,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };

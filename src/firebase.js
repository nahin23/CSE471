import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBM8Ml1LvKEhxKsOWllykly-Tlid646vXg",
  authDomain: "mallflow.firebaseapp.com",
  projectId: "mallflow",
  storageBucket: "mallflow.appspot.com",
  messagingSenderId: "703228141834",
  appId: "1:703228141834:web:a87f395b77adefb0739af3",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

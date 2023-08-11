import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Store from "./pages/Store";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import StoreSelect from "./pages/StoreSelect";
import AddNewStore from "./pages/AddNewStore";
import StoreInventory from "./pages/StoreInventory";
import AddNewProduct from "./pages/AddNewProduct";
import EditProduct from "./pages/EditProduct";
import Map from "./pages/Map";
import { Routes, Route } from "react-router-dom";
 
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/store" element={<Store />} />
        <Route path="/product" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/storeselect" element={<StoreSelect />} />
        <Route path="/addstore" element={<AddNewStore />} />
        <Route path="/inventory" element={<StoreInventory />} />
        <Route path="/addproduct" element={<AddNewProduct />} />
        <Route path="/editproduct" element={<EditProduct />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </div>
  );
}

export default App;

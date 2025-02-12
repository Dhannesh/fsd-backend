import { Routes, BrowserRouter, Route, Navigate } from "react-router";
import HomePage from "./pages/homePage";
import ProductPage from "./pages/productPage";
import ProductsPage from "./pages/productsPage";
import Navbar from "./components/Navbar";
import AddProduct from "./pages/addProduct";
import Signup from "./pages/signup";
import { useState } from "react";
import Signin from "./pages/signIn";

const App = () => {
  const [user, setUser] = useState({ isLoggedIn: false, name: "Guest" });
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              user.isLoggedIn ? <HomePage /> : <Navigate to="/user/login" />
            }
          />
          <Route
            path="/products"
            element={
              user.isLoggedIn ? <ProductsPage /> : <Navigate to="/user/login" />
            }
          />
          <Route
            path="/product/:id"
            element={
              user.isLoggedIn ? <ProductPage /> : <Navigate to="/user/login" />
            }
          />
          <Route
            path="/products/add"
            element={
              user.isLoggedIn ? <AddProduct /> : <Navigate to="/user/login" />
            }
          />
          <Route path="/user/register" element={<Signup />} />
          <Route path="/user/login" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;

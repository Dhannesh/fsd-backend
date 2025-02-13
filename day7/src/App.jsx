import { Routes, BrowserRouter, Route, Navigate } from "react-router";
import HomePage from "./pages/homePage";
import ProductPage from "./pages/productPage";
import ProductsPage from "./pages/productsPage";
import Navbar from "./components/Navbar";
import AddProduct from "./pages/addProduct";
import Signup from "./pages/signup";
import { useEffect, useState } from "react";
import Signin from "./pages/signIn";
import { ToastContainer } from "react-fox-toast";

const App = () => {
  const [user, setUser] = useState({ isLoggedIn: false, name: "Guest" });
  const isUserLoggedIn = async () => {
    try {
      const resp = await fetch(
        import.meta.env.VITE_SOME_KEY + "/api/v1/user/isloggedin",
        {
          credentials: "include",
        }
      );
      const respObj = await resp.json();
      if (resp.status === 200) {
        setUser({
          isLoggedIn: true,
          name: respObj.data.fname,
          email: respObj.data.email,
        });
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Navbar {...user} />
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
          <Route
            path="/user/login"
            element={
              user.isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <Navigate to="/user/login" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;

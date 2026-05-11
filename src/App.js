import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useContext } from "react";

import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import ProductDetail from "./pages/ProductDetail";
import Admin from "./pages/Admin";
import AddProduct from "./pages/AddProduct";

import ProtectedRoute from "./routes/ProtectedRoute";

import { AuthContext } from "./context/AuthContext";

function AppContent() {
  const location = useLocation();

  const { user } = useContext(AuthContext);

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    user?.role === "admin";

  return (
    <>
      {/* NAVBAR */}
      {!hideNavbar && <Navbar />}

      {/* ROUTES */}
      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* PROTECTED */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route path="/add" element={
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

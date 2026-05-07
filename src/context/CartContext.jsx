import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  // =========================
  // LOAD LOCAL STORAGE
  // =========================
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  // =========================
  // SAVE LOCAL STORAGE
  // =========================
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = (product, quantity = 1) => {
    const existedProduct = cart.find((item) => item.id === product.id);

    // PRODUCT EXISTS
    if (existedProduct) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item,
      );

      setCart(updatedCart);
    }

    // NEW PRODUCT
    else {
      setCart([
        ...cart,
        {
          ...product,
          quantity,
        },
      ]);
    }
  };

  // =========================
  // REMOVE PRODUCT
  // =========================
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // =========================
  // CLEAR CART
  // =========================
  const clearCart = () => {
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;

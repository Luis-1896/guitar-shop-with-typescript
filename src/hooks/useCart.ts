import { useEffect, useMemo, useState } from "react";
import { db } from "../data/db";
import type { Guitar, CartItem } from "./../types/index";

export const useCart = (): CartItem[] => {
  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  //State
  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item: Guitar) {
    const itemExists = cart.findIndex(
      (guitar: CartItem) => guitar.id === item.id
    );
    if (itemExists >= 0) {
      if (cart[itemExists].quantity >= MAX_ITEMS) return;
      //existe en el carrito
      //existe
      const updateCart = [...cart];
      updateCart[itemExists].quantity++;
      setCart(updateCart);
    } else {
      const newItem: CartItem = { ...item, quantity: 1 };
      // item.quantity = 1;
      setCart([...cart, newItem]);
    }

    // saveLocalStorage();
  }

  function removeFromCart(id: Guitar["id"]) {
    setCart((prevCart: CartItem[]) =>
      prevCart.filter((guitar) => guitar.id !== id)
    );
  }

  function increaseQuantity(id: Guitar["id"]) {
    const updatedCart = cart.map((item: CartItem) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function decreaseQuantity(id: Guitar["id"]) {
    const updatedCart = cart.map((item: CartItem) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
  }

  // function saveLocalStorage() {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // }

  // State derivado
  // const isEmpty = () => cart.length === 0;
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (total: number, item: CartItem) => total + item.quantity * item.price,
        0
      ),
    [cart]
  );
  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  };
};

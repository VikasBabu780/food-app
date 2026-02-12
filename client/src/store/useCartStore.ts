import type { CartState } from "@/types/cartTypes";
import type { Menu, Restaurant } from "@/types/restaurantTypes";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      restaurant: null,

      setRestaurant: (restaurant: Restaurant) =>
        set({ restaurant }),

      addToCart: (item: Menu, restaurant: Restaurant) => { // ← Add restaurant parameter
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem._id === item._id
          );

          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem._id === item._id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
              restaurant, // ← Set restaurant here
            };
          } else {
            return {
              cart: [...state.cart, { ...item, quantity: 1 }],
              restaurant, // ← Set restaurant here
            };
          }
        });
      },

      clearCart: () => {
        set({ cart: [], restaurant: null });
      },

      removeFromTheCart: (id: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== id),
        }));
      },

      incrementQuantity: (id: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }));
      },

      decrementQuantity: (id: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        }));
      },
    }),
    {
      name: "cart-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
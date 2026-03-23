import type { CheckoutSessionRequest, OrderState } from "@/types/orderTypes";
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_END_POINT = "https://food-app-n8m4.vercel.app/api/v1/order";
axios.defaults.withCredentials = true;

export const useOrderSore = create<OrderState>()(
  persist(
    (set) => ({
      loading: false,
      orders: [],

      createCheckoutSession: async (
        checkoutSession: CheckoutSessionRequest
      ) => {
        try {
          set({ loading: true });

          const response = await axios.post(
            `${API_END_POINT}/checkout/create-checkout-session`,
            checkoutSession,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          // redirect to stripe
          window.location.href = response.data.session.url;
        } catch (error) {
          console.log(error);
        } finally {
          set({ loading: false }); //  moved to finally
        }
      },

      getOrderDetails: async () => {
        try {
          set({ loading: true });

          const response = await axios.get(
            `${API_END_POINT}/?t=${Date.now()}`, //  FIX (no cache)
            {
              headers: {
                "Cache-Control": "no-cache",
              },
            }
          );

          set({
            loading: false,
            orders: response.data.orders || [], //safe fallback
          });
        } catch (error) {
          console.log(error);
          set({ loading: false });
        }
      },
    }),
    {
      name: "order-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
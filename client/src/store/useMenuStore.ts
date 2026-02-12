import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useRestaurantStore } from "./useRestaurantStore";

const API_END_POINT = "http://localhost:8000/api/v1/menu";
axios.defaults.withCredentials = true;

// Define Menu type
type Menu = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  // Add other menu properties as needed
};

type MenuState = {
  loading: boolean;
  menu: Menu | null;
  createMenu: (formData: FormData) => Promise<void>;
  editMenu: (menuId: string, formData: FormData) => Promise<void>;
  // deleteMenu: (menuId: string) => Promise<void>;
};

const handleError = (error: unknown, set: (state: Partial<MenuState>) => void) => {
  set({ loading: false });
  if (axios.isAxiosError(error)) {
    toast.error(error.response?.data?.message || "Something went wrong");
  } else {
    toast.error("Unexpected error occurred");
  }
};

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      loading: false,
      menu: null,
      createMenu: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, menu: response.data.menu });
          }
          // update in restaurant
          useRestaurantStore.getState().addMenuToRestaurant(response.data.menu)
        } catch (error) {
          handleError(error, set);
        }
      },

      editMenu: async (menuId: string, formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.put(
            `${API_END_POINT}/${menuId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, menu: response.data.menu });
          }
          // update restaurant menu
          useRestaurantStore.getState().updateMenuToRestaurant(response.data.menu)
        } catch (error) {
          handleError(error, set);
        }
      },
    }),
    {
      name: "menu-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
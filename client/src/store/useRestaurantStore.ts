import type { Orders } from "@/types/orderTypes";
import type { Menu, RestaurantState } from "@/types/restaurantTypes";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

const API_END_POINT = "http://localhost:8000/api/v1/restaurant";
axios.defaults.withCredentials = true;

// Helper function for error handling
const handleError = (
  error: unknown,
  set: (state: Partial<RestaurantState>) => void,
) => {
  set({ loading: false });
  if (axios.isAxiosError(error)) {
    toast.error(error.response?.data?.message || "Something went wrong");
  } else {
    toast.error("Unexpected error occurred");
  }
};

export const useRestaurantStore = create<RestaurantState>()((set, get) => ({
  loading: false,
  restaurant: null,
  searchedRestaurant: null,
  appliedFilter: [],
  singleRestaurant: null,
  restaurantOrder: [],

  createRestaurant: async (formData: FormData) => {
    try {
      set({ loading: true });
      const response = await axios.post(`${API_END_POINT}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        set({ loading: false, restaurant: response.data.restaurant });
      }
    } catch (error) {
      handleError(error, set);
    }
  },

  getRestaurant: async () => {
    try {
      set({ loading: true });

      const response = await axios.get(`${API_END_POINT}`);

      if (response.data.success) {
        set({ loading: false, restaurant: response.data.restaurant });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        set({ loading: false, restaurant: null });
        return;
      }

      handleError(error, set);
    }
  },

  updateRestaurant: async (formData: FormData) => {
    try {
      set({ loading: true });
      const response = await axios.put(`${API_END_POINT}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        set({ loading: false, restaurant: response.data.restaurant });
      }
    } catch (error) {
      handleError(error, set);
    }
  },

  searchRestaurant: async (
    searchText: string,
    searchQuery: string,
    selectedCuisines: string[],
  ) => {
    try {
      set({ loading: true });

      const params = new URLSearchParams();
      params.set("searchQuery", searchQuery);
      params.set("selectedCuisines", selectedCuisines.join(","));

      // await new Promise((resolve) => setTimeout(resolve,2000));

      const response = await axios.get(
        `${API_END_POINT}/search/${searchText}?${params.toString()}`,
      );

      if (response.data.success) {
        set({
          loading: false,
          searchedRestaurant: response.data,
        });
      }
    } catch (error) {
      handleError(error, set);
    }
  },

  addMenuToRestaurant: async (menu: Menu) => {
    try {
      set({ loading: true });
      set((state) => {
        if (!state.restaurant) return state;

        return {
          restaurant: {
            ...state.restaurant,
            menus: [...state.restaurant.menus, menu],
          },
          loading: false,
        };
      });
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  },

  updateMenuToRestaurant: async (updatedMenu: Menu) => {
    try {
      set({ loading: true });

      set((state) => {
        if (!state.restaurant) return state;

        return {
          restaurant: {
            ...state.restaurant,
            menus: state.restaurant.menus.map((menu) =>
              menu._id === updatedMenu._id ? updatedMenu : menu,
            ),
          },
        };
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  setAppliedFilter: (value: string) => {
    set((state) => {
      const filters = state.appliedFilter;

      if (filters.includes(value)) {
        return {
          appliedFilter: filters.filter((item) => item !== value),
        };
      }

      return {
        appliedFilter: [...filters, value],
      };
    });
  },

  resetAppliedFilter: () => {
    set({ appliedFilter: [] });
  },

  getSingleRestaurant: async (restaurantId: string) => {
    try {
      const response = await axios.get(`${API_END_POINT}/${restaurantId}`);
      set({ singleRestaurant: response.data.restaurant });
    } catch (error) {
      handleError(error, set);
    }
  },

  getRestaurantOrders: async () => {
    try {
      const response = await axios.get(`${API_END_POINT}/order`);
      if (response.data.success) {
        set({ restaurantOrder: response.data.orders });
      }
    } catch (error) {
      console.log(error);
    }
  },

  updateRestaurantOrder: async (orderId: string, status: string) => {
    try {
      const response = await axios.put(
        `${API_END_POINT}/order/${orderId}/status`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.data.success) {
        const updatedOrder = get().restaurantOrder.map((order: Orders) => {
          return order._id === orderId
            ? { ...order, status: response.data.status }
            : order;
        });
        set({ restaurantOrder: updatedOrder });
        toast.success(response.data.message);
      }
    } catch (error) {
      handleError(error,set);
    }
  },
}));

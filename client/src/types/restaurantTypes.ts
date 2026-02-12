import type { Orders } from "./orderTypes";

export type Menu = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type Restaurant = {
  _id: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryTime: number;
  cuisines: string[];
  imageUrl: string;
  menus: Menu[];
};

export type SearchedRestaurant = {
  success: boolean;
  data: Restaurant[];
  message?: string;
};

export type RestaurantState = {
  loading: boolean;
  restaurant: Restaurant | null;
  searchedRestaurant: SearchedRestaurant | null;
  appliedFilter: string[];
  singleRestaurant:Restaurant |null;
  restaurantOrder:Orders[],
  createRestaurant: (formData: FormData) => Promise<void>;
  getRestaurant: () => Promise<void>;
  updateRestaurant: (formData: FormData) => Promise<void>;
  searchRestaurant: (
    searchText: string,
    searchQuery: string,
    selectedCuisines: string[],
  ) => Promise<void>;
  addMenuToRestaurant: (menu: Menu) => Promise<void>;
  updateMenuToRestaurant: (updatedMenu: Menu) => Promise<void>;
  setAppliedFilter : (value:string) => void;
  resetAppliedFilter : () => void;
  getSingleRestaurant : (restaurantId:string) => Promise<void>;
  getRestaurantOrders : () => Promise<void>;
  updateRestaurantOrder : (orderId:string , status:string) =>  Promise<void>;
};
import type { Menu, Restaurant } from "./restaurantTypes";

 export interface CartItem extends Menu {
    quantity:number;
}

 export type CartState = {
    restaurant: Restaurant | null;
    setRestaurant: (restaurant: Restaurant) => void;
    cart:CartItem[];
    addToCart: (item: Menu, restaurant: Restaurant) => void; // ← Add restaurant param
    clearCart : () => void;
    removeFromTheCart : (id:string) => void;
    incrementQuantity: (id:string) => void;
    decrementQuantity: (id:string) => void;
}
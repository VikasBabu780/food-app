import type { Menu } from "@/types/restaurantTypes";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useCartStore } from "@/store/useCartStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { useNavigate } from "react-router-dom";

const AvailableMenu = ({ menus }: { menus: Menu[] }) => {
  const { addToCart } = useCartStore();
  const { singleRestaurant } = useRestaurantStore();
  const navigate = useNavigate();

  return (
    <div className="px-2 md:px-4">
      <h1 className="text-xl md:text-2xl font-bold mb-6 
                     text-gray-900 dark:text-white">
        Available Menus
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {menus.map((menu: Menu) => (
          <Card
            key={menu._id}
            className="max-w-sm mx-auto overflow-hidden rounded-xl 
                       shadow-md hover:shadow-xl transition
                       bg-white dark:bg-gray-800
                       border border-gray-200 dark:border-gray-700"
          >
            <div className="overflow-hidden">
              <img
                src={menu.image || "/placeholder-food.png"}
                alt={menu.name}
                className="w-full h-44 object-cover hover:scale-105 transition duration-300"
              />
            </div>

            <CardContent className="p-4 space-y-2">
              <h2 className="text-lg font-semibold 
                             text-gray-900 dark:text-white">
                {menu.name}
              </h2>

              <p className="text-sm text-gray-600 dark:text-gray-300">
                {menu.description}
              </p>

              <div className="text-lg font-bold mt-2 
                              text-gray-900 dark:text-white">
                ₹<span className="text-orange-500">{menu.price}</span>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button
                onClick={() => {
                  if (!singleRestaurant) return;

                  addToCart(menu, singleRestaurant);
                  navigate("/cart");
                }}
                className="w-full bg-orange-500 hover:bg-orange-600 
                           dark:bg-orange-600 dark:hover:bg-orange-700 
                           transition"
              >
                Add to cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AvailableMenu;

import { Badge } from "./ui/badge";
import { Timer } from "lucide-react";
import AvailableMenu from "./AvailableMenu";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const RestaurantDetail = () => {
  const params = useParams();
  const { singleRestaurant, getSingleRestaurant } = useRestaurantStore();

  useEffect(() => {
    getSingleRestaurant(params.id!);
  }, [params.id, getSingleRestaurant]);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 my-10">
      {/* Hero Section */}
      <div className="relative w-full h-44 sm:h-60 md:h-64 lg:h-72 overflow-hidden rounded-2xl shadow-md">
        <img
          src={singleRestaurant?.imageUrl || "Loading..."}
          alt="Restaurant"
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        {/* Mobile Title Overlay */}
        <div className="absolute bottom-4 left-4 md:hidden">
          <h1 className="text-white text-xl font-semibold">
            {singleRestaurant?.restaurantName || "Loading..."}
          </h1>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="mt-6 flex flex-col gap-4 max-w-3xl">
        {/* Desktop Title */}
        <h1 className="hidden md:block text-3xl font-semibold text-gray-900 dark:text-white">
          {singleRestaurant?.restaurantName || "Loading..."}
        </h1>

        {/* Cuisines */}
        <div className="flex flex-wrap gap-2">
          {singleRestaurant?.cuisines.map((cuisine, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="text-xs px-3 py-1 
                         hover:bg-orange-100 dark:hover:bg-orange-900/40 
                         transition
                         dark:bg-gray-700 dark:text-gray-200"
            >
              {cuisine}
            </Badge>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-gray-700 w-full" />

        {/* Delivery Info */}
        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <Timer className="w-5 h-5 text-orange-500" />
          <span className="font-medium">
            Delivery Time :
            <span className="ml-1 text-orange-500 font-semibold">
              {singleRestaurant?.deliveryTime || "NA"} Minutes
            </span>
          </span>
        </div>
      </div>

      {/* Menu Section */}
      <div className="mt-12">
        <AvailableMenu menus={singleRestaurant?.menus || []} />
      </div>
    </div>
  );
};

export default RestaurantDetail;

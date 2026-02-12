import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  restaurantFormSchema,
  type RestaurantFormSchema,
} from "@/schema/restaurantSchema";
import { useRestaurantStore } from "@/store/useRestaurantStore";

import { Loader2 } from "lucide-react";
import React, { useEffect, useState, type FormEvent } from "react";

const Restaurant = () => {
  const [input, setInput] = useState<RestaurantFormSchema>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof RestaurantFormSchema, string[]>>
  >({});

  const {
    loading,
    restaurant,
    createRestaurant,
    updateRestaurant,
    getRestaurant,
  } = useRestaurantStore();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({
      ...input,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = restaurantFormSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    // Restaurant API implementation
    try {
      const formData = new FormData();
      formData.append("restaurantName", input.restaurantName);
      formData.append("city", input.city);
      formData.append("country", input.country);
      formData.append("deliveryTime", input.deliveryTime.toString());
      formData.append("cuisines", JSON.stringify(input.cuisines));

      if (input.imageFile) {
        formData.append("imageFile", input.imageFile); // Backend uses 'imageFile' or change to match multer config
      }

      if (restaurant) {
        // Update
        await updateRestaurant(formData);
      } else {
        // Create
        await createRestaurant(formData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch restaurant on mount
  useEffect(() => {
    getRestaurant();
  }, [getRestaurant]);

  // Update form when restaurant data changes
  useEffect(() => {
    if (restaurant) {
      setInput({
        restaurantName: restaurant.restaurantName || "",
        city: restaurant.city || "",
        country: restaurant.country || "",
        deliveryTime: restaurant.deliveryTime || 0,
        cuisines: restaurant.cuisines || [],
        imageFile: undefined,
      });
    } else {
      // Reset form if no restaurant exists
      setInput({
        restaurantName: "",
        city: "",
        country: "",
        deliveryTime: 0,
        cuisines: [],
        imageFile: undefined,
      });
    }
  }, [restaurant]);

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <div className="bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-6 md:p-10">
        <h1 className="font-extrabold text-3xl mb-8 text-gray-800 dark:text-white">
          {restaurant ? "Update Restaurant" : "Add Restaurant"}
        </h1>

        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Restaurant Name */}
            <div className="space-y-1">
              <Label className="text-sm font-medium">Restaurant Name</Label>
              <Input
                type="text"
                value={input.restaurantName}
                onChange={changeEventHandler}
                name="restaurantName"
                placeholder="Enter your restaurant name"
                className="focus-visible:ring-orange-500 focus-visible:ring-2"
              />
              {errors.restaurantName?.[0] && (
                <span className="text-xs text-red-600 font-medium">
                  {errors.restaurantName[0]}
                </span>
              )}
            </div>

            {/* City */}
            <div className="space-y-1">
              <Label className="text-sm font-medium">City</Label>
              <Input
                type="text"
                value={input.city}
                onChange={changeEventHandler}
                name="city"
                placeholder="Enter your city"
                className="focus-visible:ring-orange-500 focus-visible:ring-2"
              />
              {errors.city?.[0] && (
                <span className="text-xs text-red-600 font-medium">
                  {errors.city[0]}
                </span>
              )}
            </div>

            {/* Country */}
            <div className="space-y-1">
              <Label className="text-sm font-medium">Country</Label>
              <Input
                type="text"
                name="country"
                value={input.country}
                onChange={changeEventHandler}
                placeholder="Enter your country"
                className="focus-visible:ring-orange-500 focus-visible:ring-2"
              />
              {errors.country?.[0] && (
                <span className="text-xs text-red-600 font-medium">
                  {errors.country[0]}
                </span>
              )}
            </div>

            {/* Delivery Time */}
            <div className="space-y-1">
              <Label className="text-sm font-medium">
                Delivery Time (mins)
              </Label>
              <Input
                type="number"
                name="deliveryTime"
                value={input.deliveryTime}
                onChange={changeEventHandler}
                placeholder="Expected delivery time"
                className="focus-visible:ring-orange-500 focus-visible:ring-2"
              />
              {errors.deliveryTime?.[0] && (
                <span className="text-xs text-red-600 font-medium">
                  {errors.deliveryTime[0]}
                </span>
              )}
            </div>

            {/* Cuisines */}
            <div className="space-y-1">
              <Label className="text-sm font-medium">Cuisines</Label>
              <Input
                type="text"
                name="cuisines"
                value={input.cuisines.join(",")}
                onChange={(e) =>
                  setInput({
                    ...input,
                    cuisines: e.target.value
                      .split(",")
                      .map((c) => c.trim())
                      .filter((c) => c),
                  })
                }
                placeholder="Italian, Chinese, Indian"
                className="focus-visible:ring-orange-500 focus-visible:ring-2"
              />
              <p className="text-xs text-gray-500">
                Separate cuisines with commas
              </p>
              {errors.cuisines?.[0] && (
                <span className="text-xs text-red-600 font-medium">
                  {errors.cuisines[0]}
                </span>
              )}
            </div>

            {/* Image Upload */}
            <div className="space-y-1">
              <Label className="text-sm font-medium">
                Upload Restaurant Banner
              </Label>
              <Input
                type="file"
                name="imageFile"
                accept="image/*"
                className="cursor-pointer file:bg-orange-500 file:text-white 
                           file:border-0 file:px-4 file:py-1 file:rounded-md 
                           hover:file:bg-orange-600"
                onChange={(e) =>
                  setInput({
                    ...input,
                    imageFile: e.target.files?.[0],
                  })
                }
              />
              {errors.imageFile?.[0] && (
                <span className="text-xs text-red-600 font-medium">
                  {errors.imageFile[0]}
                </span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="my-8 flex justify-center md:justify-start">
            {loading ? (
              <Button disabled className="bg-orange-500 hover:bg-orange-600">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Please Wait
              </Button>
            ) : (
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg shadow-md">
                {restaurant ? "Update Your Restaurant" : "Add Your Restaurant"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Restaurant;

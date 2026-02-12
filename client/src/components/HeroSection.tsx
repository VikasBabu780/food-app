import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import HeroImage from "@/assets/heroFoodImage.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 md:py-16">
      <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
        <div className="w-full md:w-[45%] space-y-6 text-center md:text-left">
          <span
            className="inline-block px-4 py-1 text-sm font-medium rounded-full 
            bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
          >
            🍔 Fast & Fresh Delivery
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 dark:text-gray-100">
            Order Food
            <span className="block text-orange-500 dark:text-orange-400">
              Any Time & Any Where
            </span>
          </h1>

          <p className="text-gray-500 dark:text-gray-300 text-base md:text-lg leading-relaxed">
            Delicious meals delivered to your doorstep. Fresh, fast, and always
            near you.
          </p>

          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-3 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
              <Input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search restaurant by name, city & country"
                className="pl-11 h-11 bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300"
              />
            </div>

            <Button
              onClick={() => navigate(`/search/${searchText}`)}
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 px-6 h-11"
            >
              Search
            </Button>
          </div>

          <p className="text-sm text-gray-400 dark:text-gray-400">
            ⭐ Trusted by 10,000+ food lovers
          </p>
        </div>

        <div className="w-full md:w-[55%] flex justify-center">
          <img
            src={HeroImage}
            alt="Food Cover"
            className="w-full max-w-md md:max-w-full max-h-105
            object-cover rounded-2xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

import { Link, useNavigate, useParams } from "react-router-dom";
import FilterPage from "./FilterPage";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Globe, MapPin, SearchX, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Skeleton } from "./ui/skeleton";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import type { Restaurant } from "@/types/restaurantTypes";

const SearchPage = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState<string>();
  const {
    searchRestaurant,
    searchedRestaurant,
    appliedFilter,
    loading,
    setAppliedFilter,
  } = useRestaurantStore();

  const searchText = params.searchText ?? "";
  const searchedQuery = params.searchQuery ?? "";

  useEffect(() => {
    searchRestaurant(searchText, searchedQuery, appliedFilter);
  }, [searchText, searchedQuery, appliedFilter, searchRestaurant]);

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <FilterPage />

        {/* Main Content */}
        <div className="flex-1">
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-6">
            <Input
              type="text"
              value={searchQuery}
              placeholder="Search by restaurant & cuisines"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 
                 bg-white text-gray-900 placeholder-gray-400 
                 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
            />
            <Button
              onClick={() => {
                searchRestaurant(searchText, searchedQuery, appliedFilter);
              }}
              className="h-11 bg-orange-500 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700 w-full sm:w-auto"
            >
              Search
            </Button>
          </div>

          {/* Search Result Info */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 my-4">
            <h1 className="font-medium text-lg text-gray-900 dark:text-gray-100">
              ({searchedRestaurant?.data.length}) Search Result Found
            </h1>

            <div className="flex flex-wrap gap-2">
              {appliedFilter.map((selectedFilter, idx) => (
                <div key={idx} className="relative inline-flex items-center">
                  <Badge
                    variant="outline"
                    className="text-[#D19254] pr-6 rounded-md whitespace-nowrap dark:border-gray-700"
                  >
                    {selectedFilter}
                  </Badge>
                  <X
                    onClick={() => setAppliedFilter(selectedFilter)}
                    size={16}
                    className="absolute right-1 text-[#D19254] cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Restaurant Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {loading ? (
              <SearchCardSkeleton />
            ) : !loading && searchedRestaurant?.data.length === 0 ? (
              <NoResultFound searchText={params.searchText!} />
            ) : (
              searchedRestaurant?.data.map((restaurant: Restaurant) => (
                <Card
                  key={restaurant._id}
                  className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow"
                >
                  <div className="relative">
                    <AspectRatio ratio={16 / 6}>
                      <img
                        src={restaurant.imageUrl}
                        alt="SearchImage1"
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>

                    <div className="absolute top-2 left-2 bg-white/80 dark:bg-gray-700/80 rounded-lg py-1 px-3">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Featured
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {restaurant.restaurantName}
                    </h1>

                    <div className="mt-2 flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <MapPin size={16} />
                      <p className="text-sm">
                        City:{" "}
                        <span className="font-medium">{restaurant.city}</span>
                      </p>
                    </div>

                    <div className="mt-2 flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <Globe size={16} />
                      <p className="text-sm">
                        Country:{" "}
                        <span className="font-medium">
                          {restaurant.country}
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {restaurant.cuisines.map((cuisine, idx) => (
                        <Badge
                          key={idx}
                          className="px-3 py-1 rounded-full shadow-sm font-medium dark:bg-gray-700 dark:text-gray-100"
                        >
                          {cuisine}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                    <Link to={`/restaurant/${restaurant._id}`}>
                      <Button className="bg-orange-500 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700 rounded-full px-5">
                        View Menus
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const SearchCardSkeleton = () => {
  return (
    <Card className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
      {/* Image */}
      <div className="relative">
        <AspectRatio ratio={16 / 6}>
          <Skeleton className="w-full h-full dark:bg-gray-700/50" />
        </AspectRatio>

        {/* Featured Badge */}
        <Skeleton className="absolute top-2 left-2 h-6 w-20 rounded-md dark:bg-gray-700/50" />
      </div>

      {/* Content */}
      <CardContent className="p-4 space-y-3">
        {/* Title */}
        <Skeleton className="h-6 w-3/4 dark:bg-gray-700/50" />

        {/* City */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full dark:bg-gray-700/50" />
          <Skeleton className="h-4 w-32 dark:bg-gray-700/50" />
        </div>

        {/* Country */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full dark:bg-gray-700/50" />
          <Skeleton className="h-4 w-28 dark:bg-gray-700/50" />
        </div>

        {/* Cuisine Badges */}
        <div className="flex gap-2 mt-3">
          {[1, 2, 3].map((_, idx) => (
            <Skeleton
              key={idx}
              className="h-6 w-16 rounded-full dark:bg-gray-700/50"
            />
          ))}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
        <Skeleton className="h-9 w-28 rounded-full dark:bg-gray-700/50" />
      </CardFooter>
    </Card>
  );
};

const NoResultFound = ({ searchText }: { searchText: string }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {/* Icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
        <SearchX className="h-10 w-10 text-orange-500" />
      </div>

      {/* Text */}
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        No results found
      </h2>
      <p className="mt-2 max-w-md text-gray-600 dark:text-gray-400">
        We couldn’t find any restaurants matching to{" "}
        <span className="text-orange-600 text-2xl">{searchText}</span>. Try
        adjusting your filters or search keywords.
      </p>

      {/* Action */}
      <Button
        onClick={() => navigate("/")}
        variant="outline"
        className="mt-6 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-500 dark:hover:text-white"
      >
        Go Back to home
      </Button>
    </div>
  );
};

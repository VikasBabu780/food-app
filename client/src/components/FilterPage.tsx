import { useRestaurantStore } from "@/store/useRestaurantStore";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export type FilterOptionState = {
  id: string;
  label: string;
};

const filterOptions: FilterOptionState[] = [
  { id: "burger", label: "Burger" },
  { id: "thali", label: "Thali" },
  { id: "biryani", label: "Biryani" },
  { id: "momos", label: "Momos" },
  { id: "pizza", label: "Pizza" },
];

const FilterPage = () => {
  const { setAppliedFilter, appliedFilter, resetAppliedFilter } =
    useRestaurantStore();
  const appliedFilterHandler = (value: string) => {
    setAppliedFilter(value);
  };

  return (
    <div className="w-full md:w-72 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
          Filter by Cuisines
        </h1>
        <Button
          onClick={resetAppliedFilter}
          variant="link"
          className="text-sm text-orange-500 dark:text-orange-400 px-0"
        >
          Reset
        </Button>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        {filterOptions.map((option) => (
          <div
            key={option.id}
            className="flex items-center gap-3 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <Checkbox
              id={option.id}
              checked={appliedFilter.includes(option.id)}
              onCheckedChange={() => appliedFilterHandler(option.id)}
            />

            <Label
              htmlFor={option.id}
              className="text-sm font-medium leading-none cursor-pointer text-gray-800 dark:text-gray-100"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPage;

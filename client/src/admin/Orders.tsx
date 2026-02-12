import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { useEffect } from "react";

const Orders = () => {
  const { restaurantOrder, getRestaurantOrders, updateRestaurantOrder } =
    useRestaurantStore();

  const handleStatusChange = async (id: string, status: string) => {
    await updateRestaurantOrder(id, status);
  };

  useEffect(() => {
    getRestaurantOrders();
  }, [getRestaurantOrders]);
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-10">
        Orders Overview
      </h1>

      <div className="space-y-8">
        {restaurantOrder.map((order) => (
          <div
            className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 
                        rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-1 space-y-3">
                <h2
                  className="text-xl font-semibold text-gray-800 dark:text-gray-100 
                             group-hover:text-orange-500 transition-colors"
                >
                  {order?.deliveryDetails?.name}
                </h2>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Address:
                  </span>{" "}
                  {order?.deliveryDetails?.address}
                </p>

                <div
                  className="inline-flex items-center gap-2 bg-orange-50 dark:bg-orange-500/10 
                              text-orange-600 dark:text-orange-400 px-4 py-2 rounded-lg w-fit"
                >
                  <span className="text-sm font-medium">Total Amount</span>
                  <span className="text-lg font-bold">
                    ₹{order.totalAmount}
                  </span>
                </div>
              </div>

              {/* Right Content */}
              <div className="w-full md:w-64">
                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Order Status
                </Label>

                <Select
                  onValueChange={(newstatus) =>
                    handleStatusChange(order._id, newstatus)
                  }
                  defaultValue={order.status}
                >
                  <SelectTrigger
                    className="h-11 rounded-lg border-gray-300 dark:border-gray-600 
                                          focus:ring-2 focus:ring-orange-500"
                  >
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {[
                        "Pending",
                        "Confirmed",
                        "Preparing",
                        "OutForDelivery",
                        "Delivered",
                      ].map((status, index) => (
                        <SelectItem
                          key={index}
                          value={status.toLowerCase()}
                          className="cursor-pointer focus:bg-orange-50 
                                   focus:text-orange-600 dark:focus:bg-orange-500/10"
                        >
                          {status}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

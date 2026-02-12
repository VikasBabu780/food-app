import { IndianRupee, CheckCircle2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useOrderSore } from "@/store/useOrderStore";
import { useEffect } from "react";
import type { Orders } from "@/types/orderTypes";

const Success = () => {
  const { orders, getOrderDetails } = useOrderSore();

  useEffect(() => {
    getOrderDetails();
  }, [getOrderDetails]);

  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
        <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-300">
          Order Not Found !!
        </h1>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8 max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-gray-200">
            Order{" "}
            <span className="text-green-600">{"confirmed".toUpperCase()}</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Your order has been placed successfully
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Order Summary
          </h2>

          {orders.map((order: Orders) => (
            <div key={order._id} className="mb-6">
              {/* Cart Items */}
              {order.cartItems.map((item) => (
                <div key={item.menuId}>
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover border border-gray-200 dark:border-gray-700"
                      />

                      <div>
                        <h3 className="text-gray-800 dark:text-gray-200 font-medium">
                          {item.name}
                        </h3>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center text-orange-600 dark:text-orange-400 font-semibold">
                      <IndianRupee className="h-4 w-4 mr-1" />
                      <span className="text-lg">{item.price}</span>
                    </div>
                  </div>

                  <Separator className="my-5 border-gray-200 dark:border-gray-700" />
                </div>
              ))}

              {/* Order Total */}
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Total Amount
                </span>

                <div className="flex items-center text-gray-900 dark:text-gray-100 font-bold">
                  <IndianRupee className="h-4 w-4 mr-1" />
                  <span className="text-xl">{order.totalAmount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link to="/cart">
          <Button
            className="w-full py-3 text-base font-semibold rounded-xl 
                       bg-orange-500 hover:bg-orange-600 
                       shadow-md hover:shadow-lg transition-all
                       dark:bg-orange-600 dark:hover:bg-orange-700 dark:text-white"
          >
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Success;

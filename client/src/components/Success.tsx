import { IndianRupee, CheckCircle2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useOrderSore } from "@/store/useOrderStore";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import type { Orders } from "@/types/orderTypes";

const Success = () => {
  const { orders, getOrderDetails, loading } = useOrderSore();
  const { isAuthenticated, isCheckingAuth } = useUserStore();
  const location = useLocation();

  // check Stripe success param
  const params = new URLSearchParams(location.search);
  const success = params.get("success");

  useEffect(() => {
    if (isAuthenticated) {
      getOrderDetails();
    }
  }, [getOrderDetails, isAuthenticated]);

  // wait for auth check
  if (isCheckingAuth) return <p>Loading...</p>;

  //  protect route
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // prevent manual access
  if (!success) {
    return <Navigate to="/" replace />;
  }

  //  loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading order...</p>
      </div>
    );
  }

  //  no orders
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
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-gray-200">
            Order <span className="text-green-600">CONFIRMED</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Your order has been placed successfully
          </p>
        </div>

        {/* Orders */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Order Summary
          </h2>

          {orders.map((order: Orders) => (
            <div key={order._id} className="mb-6">
              {order.cartItems.map((item) => (
                <div key={item.menuId}>
                  <div className="flex justify-between items-center gap-4">
                    
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />

                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center font-semibold text-orange-500">
                      <IndianRupee className="h-4 w-4 mr-1" />
                      {item.price}
                    </div>
                  </div>

                  <Separator className="my-5" />
                </div>
              ))}

              {/* Total */}
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{order.totalAmount}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link to="/">
          <Button className="w-full bg-orange-500 hover:bg-orange-600">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
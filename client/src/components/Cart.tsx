import { Minus, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useState } from "react";
import CheckoutConfirmPage from "./CheckoutConfirmPage";
import { useCartStore } from "@/store/useCartStore";
import type { CartItem } from "@/types/cartTypes";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
  const {
    cart,
    decrementQuantity,
    incrementQuantity,
    removeFromTheCart,
    clearCart,
  } = useCartStore();

  const totalAmount = cart.reduce((acc, ele) => {
    return acc + ele.price * ele.quantity;
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 my-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Your Cart
        </h1>
        <Button
          onClick={() => clearCart()}
          variant="link"
          className="text-orange-500 dark:text-orange-400"
        >
          Clear All
        </Button>
      </div>

      {/* Cart Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-800">
            <TableRow>
              <TableHead className="text-gray-700 dark:text-gray-300">Item</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">Title</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">Price</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">Qty</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">Total</TableHead>
              <TableHead className="text-right text-gray-700 dark:text-gray-300">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {cart.map((item: CartItem) => (
              <TableRow
                key={item._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <TableCell>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={item.image} alt={item.name} />
                    <AvatarFallback className="dark:text-gray-100">CN</AvatarFallback>
                  </Avatar>
                </TableCell>

                <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                  {item.name}
                </TableCell>

                <TableCell className="text-gray-600 dark:text-gray-300">{item.price}</TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 rounded-full border border-gray-300 dark:border-gray-600 px-2 py-1 w-fit">
                    <Button
                      onClick={() => decrementQuantity(item._id)}
                      size="icon"
                      variant="ghost"
                      className="dark:text-gray-100"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>

                    <span className="px-2 font-semibold text-gray-900 dark:text-gray-100">
                      {item.quantity}
                    </span>

                    <Button
                      onClick={() => incrementQuantity(item._id)}
                      size="icon"
                      variant="ghost"
                      className="dark:text-orange-400"
                    >
                      <Plus className="h-4 w-4 text-orange-500 dark:text-orange-400" />
                    </Button>
                  </div>
                </TableCell>

                <TableCell className="font-semibold text-gray-900 dark:text-gray-100">
                  ₹{item.price * item.quantity}
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    onClick={() => removeFromTheCart(item._id)}
                    size="sm"
                    variant="outline"
                    className="border-orange-500 text-orange-500 hover:bg-orange-50 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-600 dark:hover:text-white"
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow className="bg-gray-50 dark:bg-gray-800 text-2xl">
              <TableCell colSpan={5} className="font-bold text-gray-900 dark:text-gray-100">
                Total
              </TableCell>
              <TableCell className="font-bold text-right text-gray-900 dark:text-gray-100">
                ₹{totalAmount}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Checkout */}
      <div className="flex justify-end mt-6">
        <Button
          disabled={!cart.length}
          onClick={() => setOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 px-6"
        >
          Proceed to Checkout
        </Button>
      </div>

      {/* Modal */}
      <CheckoutConfirmPage open={open} setOpen={setOpen} />
    </div>
  );
};

export default Cart;

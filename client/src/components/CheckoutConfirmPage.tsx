import {
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/useUserStore";
import type { CheckoutSessionRequest } from "@/types/orderTypes";
import { useCartStore } from "@/store/useCartStore";
import { useOrderSore } from "@/store/useOrderStore";
import { Loader2 } from "lucide-react";

const CheckoutConfirmPage = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useUserStore();

  const [input, setInput] = useState({
    name: user?.fullname || "",
    email: user?.email || "",
    contact: user?.contact?.toString() || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
  });

  const { cart } = useCartStore();
  const { restaurant } = useCartStore();
  const { createCheckoutSession, loading } = useOrderSore();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const checkOutHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const checkoutData: CheckoutSessionRequest = {
        cartItems: cart.map((item) => ({
          menuId: item._id,
          name: item.name,
          image: item.image,
          price: Number(item.price),
          quantity: Number(item.quantity),
        })),
        deliveryDetails: input,
        restaurantId: restaurant?._id as string,
      };

      await createCheckoutSession(checkoutData);
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl rounded-2xl p-6 md:p-8 shadow-2xl border bg-white dark:bg-gray-800 dark:border-gray-700">
        <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Review Your Order
        </DialogTitle>

        <DialogDescription className="text-sm text-gray-500 dark:text-gray-300 leading-relaxed mt-1">
          Double-check your delivery details and ensure everything is in order.
          When you’re ready, click confirm to finalize your order.
        </DialogDescription>

        <form
          onSubmit={checkOutHandler}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6"
        >
          <div className="space-y-1">
            <Label htmlFor="fullname" className="text-xs text-gray-500 dark:text-gray-300">
              Full Name
            </Label>
            <Input
              id="fullname"
              type="text"
              name="fullname"
              placeholder="Your Full Name"
              value={input.name}
              onChange={changeEventHandler}
              required
              className="h-11 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="email" className="text-xs text-gray-500 dark:text-gray-300">
              Email
            </Label>
            <Input
              disabled
              id="email"
              type="email"
              name="email"
              placeholder="xyz@gmail.com"
              value={input.email}
              onChange={changeEventHandler}
              required
              className="h-11 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="contact" className="text-xs text-gray-500 dark:text-gray-300">
              Contact
            </Label>
            <Input
              id="contact"
              type="tel"
              name="contact"
              placeholder="+91 82996 xxxxx"
              value={input.contact}
              onChange={changeEventHandler}
              required
              className="h-11 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="address" className="text-xs text-gray-500 dark:text-gray-300">
              Address
            </Label>
            <Input
              id="address"
              type="text"
              name="address"
              placeholder="Street, House No."
              value={input.address}
              onChange={changeEventHandler}
              required
              className="h-11 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="city" className="text-xs text-gray-500 dark:text-gray-300">
              City
            </Label>
            <Input
              id="city"
              type="text"
              name="city"
              placeholder="Your City"
              value={input.city}
              onChange={changeEventHandler}
              required
              className="h-11 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="country" className="text-xs text-gray-500 dark:text-gray-300">
              Country
            </Label>
            <Input
              id="country"
              type="text"
              name="country"
              placeholder="India"
              value={input.country}
              onChange={changeEventHandler}
              required
              className="h-11 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
            />
          </div>

          <DialogFooter className="col-span-1 md:col-span-2 pt-6">
            {loading ? (
              <Button
                disabled
                className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-semibold shadow-md transition"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-semibold shadow-md transition"
              >
                Continue to Payment
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutConfirmPage;

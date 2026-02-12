import { Link } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  HandPlatter,
  Loader2,
  Menu,
  Moon,
  PackageCheck,
  ShoppingCart,
  SquareMenu,
  Sun,
  User,
  UtensilsCrossed,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";
import { useThemeStore } from "@/store/useThemeStore";

const Navbar = () => {
  const { user, loading, logout } = useUserStore();
  const { cart } = useCartStore();
  const {setTheme} = useThemeStore()

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/">
          <h1 className="font-extrabold tracking-tight text-3xl sm:text-4xl">
            <span className="text-orange-500">Food</span>
            <span className="text-gray-800 dark:text-gray-100">Swift</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {/* Links */}
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-orange-500 transition">
              Home
            </Link>
            <Link to="/profile" className="hover:text-orange-500 transition">
              Profile
            </Link>
            <Link
              to="/order/status"
              className="hover:text-orange-500 transition"
            >
              Order
            </Link>

            {user?.admin && (
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger className="cursor-pointer">
                    Dashboard
                  </MenubarTrigger>
                  <MenubarContent>
                    <Link to="/admin/restaurant">
                      <MenubarItem>Restaurant</MenubarItem>
                    </Link>
                    <Link to="/admin/menu">
                      <MenubarItem>Menu</MenubarItem>
                    </Link>
                    <Link to="/admin/orders">
                      <MenubarItem>Orders</MenubarItem>
                    </Link>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-5 w-5 transition-all dark:scale-0 dark:-rotate-90" />
                  <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <ShoppingCart />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs rounded-full bg-red-500 text-white">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Avatar */}
            <Avatar className="h-9 w-9">
              <AvatarImage src={user?.profilePicture}/>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            {/* Logout */}
            {loading ? (
              <Button disabled className="bg-orange-500">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                onClick={logout}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Logout
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden">
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const { user, logout, loading } = useUserStore();
  const {setTheme} = useThemeStore()
 
  const linkStyle =
    "flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer font-medium transition " +
    "hover:bg-gray-200 dark:hover:bg-gray-800 " +
    "hover:text-gray-900 dark:hover:text-gray-100";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="rounded-full bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          <Menu size={18} />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col w-[85%] sm:w-90">
        {/* Header */}
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle className="text-lg font-extrabold">
            <span className="text-orange-500">Food</span>
            <span className="text-gray-800 dark:text-gray-100">Swift</span>
          </SheetTitle>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="mt-4">
                <Sun className="h-5 w-5 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>

        <Separator className="my-3" />

        {/* Navigation */}
        <SheetDescription className="flex-1 space-y-1">
          <Link to="/profile" className={linkStyle}>
            <User />
            <span>Profile</span>
          </Link>

          <Link to="/order/status" className={linkStyle}>
            <HandPlatter />
            <span>Orders</span>
          </Link>

          <Link to="/cart" className={linkStyle}>
            <ShoppingCart />
            <span>Cart (0)</span>
          </Link>

          {user?.admin && (
            <>
              <Link to="/admin/menu" className={linkStyle}>
                <SquareMenu />
                <span>Menu</span>
              </Link>

              <Link to="/admin/restaurant" className={linkStyle}>
                <UtensilsCrossed />
                <span>Restaurant</span>
              </Link>

              <Link to="/admin/orders" className={linkStyle}>
                <PackageCheck />
                <span>Restaurant Orders</span>
              </Link>
            </>
          )}
        </SheetDescription>

        {/* Footer */}
        <SheetFooter className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user?.profilePicture}/>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-bold">{user?.fullname}</h1>
          </div>

          <SheetClose asChild>
            {loading ? (
              <Button disabled className="bg-orange-500">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                onClick={logout}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Logout
              </Button>
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

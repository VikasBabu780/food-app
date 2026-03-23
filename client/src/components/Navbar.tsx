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
  ShoppingCart,
  Sun,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
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
  const { user, loading, logout, isAuthenticated, isCheckingAuth } =
    useUserStore();

  const { cart } = useCartStore();
  const { setTheme } = useThemeStore();

  if (isCheckingAuth) return null; //  prevent flicker

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

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {/* Links */}
          <div className="flex items-center gap-6">
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/orders">Orders</Link>

            {user?.admin && (
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Dashboard</MenubarTrigger>
                  <MenubarContent>
                    <Link to="/admin/restaurant">
                      <MenubarItem>Restaurant</MenubarItem>
                    </Link>
                    <Link to="/admin/menu">
                      <MenubarItem>Menu</MenubarItem>
                    </Link>
                    <Link to="/admin/orders">
                      <MenubarItem>Restaurant Orders</MenubarItem>
                    </Link>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Theme */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-5 w-5 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 scale-0 dark:scale-100" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <ShoppingCart />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 text-xs bg-red-500 text-white flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>

            {/*  FIXED AUTH LOGIC */}
            {!isAuthenticated || !user?.isVerified ? (
              <>
                <Link to="/login">
                  <Button className="bg-orange-500">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gray-500">Register</Button>
                </Link>
              </>
            ) : (
              <>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.profilePicture} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                {loading ? (
                  <Button disabled className="bg-orange-500">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button onClick={logout} className="bg-orange-500">
                    Logout
                  </Button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const { user, logout, loading, isAuthenticated } = useUserStore();

  const { setTheme } = useThemeStore();

  const linkStyle =
    "flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <Menu size={18} />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>
            <span className="text-orange-500">Food</span>Swift
          </SheetTitle>
        </SheetHeader>

        <Separator className="my-3" />

        <SheetDescription className="flex-1 space-y-2">
          <Link to="/profile" className={linkStyle}>
            <User /> Profile
          </Link>

          <Link to="/orders" className={linkStyle}>
            <HandPlatter /> Orders
          </Link>

          <Link to="/cart" className={linkStyle}>
            <ShoppingCart /> Cart
          </Link>
        </SheetDescription>

        <SheetFooter>
          {/* FIXED MOBILE AUTH */}
          {!isAuthenticated || !user?.isVerified ? (
            <>
              <Link to="/login">
                <Button className="w-full bg-orange-500">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full bg-gray-500">Register</Button>
              </Link>
            </>
          ) : (
            <>
              {loading ? (
                <Button disabled className="bg-orange-500">
                  <Loader2 className="animate-spin" />
                </Button>
              ) : (
                <Button onClick={logout} className="bg-orange-500">
                  Logout
                </Button>
              )}
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

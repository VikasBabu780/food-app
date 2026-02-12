import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import React, { useState, type FormEvent } from "react";
import EditMenu from "./EditMenu";
import { menuSchema, type MenuFormSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";

const AddMenu = () => {
  const [input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });

  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuFormSchema>();
  const [error, setError] = useState<
    Partial<Record<keyof MenuFormSchema, string[]>>
  >({});
  const { loading, createMenu } = useMenuStore();
  const { restaurant } = useRestaurantStore();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({
      ...input,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setError(fieldErrors as Partial<Record<keyof MenuFormSchema, string[]>>);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price.toString());
      if (input.image) formData.append("image", input.image);
      await createMenu(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            Available Menus
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage and customize your restaurant menus
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600 shadow-md">
              <Plus className="mr-2 h-4 w-4" />
              Add Menu
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-lg rounded-2xl bg-white dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Add New Menu
              </DialogTitle>
              <DialogDescription className="text-gray-500 dark:text-gray-300">
                Add a delicious menu item that customers will love.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={submitHandler} className="space-y-5 mt-4">
              <div className="space-y-1">
                <Label className="text-gray-700 dark:text-gray-200">Menu Name</Label>
                <Input
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  placeholder="e.g. Chicken Biryani"
                  className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
                {error.name && (
                  <span className="text-xs font-medium text-red-600">
                    {error.name[0]}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <Label className="text-gray-700 dark:text-gray-200">Description</Label>
                <Input
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Short and tasty description"
                  className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
                {error.description && (
                  <span className="text-xs font-medium text-red-600">
                    {error.description[0]}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <Label className="text-gray-700 dark:text-gray-200">Price (₹)</Label>
                <Input
                  type="number"
                  name="price"
                  value={input.price}
                  onChange={changeEventHandler}
                  className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
                {error.price && (
                  <span className="text-xs font-medium text-red-600">
                    {error.price[0]}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <Label className="text-gray-700 dark:text-gray-200">Menu Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  className="cursor-pointer file:bg-orange-500 file:text-white file:border-0 file:px-4 file:py-1 file:rounded-md hover:file:bg-orange-600"
                  onChange={(e) =>
                    setInput({
                      ...input,
                      image: e.target.files?.[0] || undefined,
                    })
                  }
                />
                {error.image && (
                  <span className="text-xs font-medium text-red-600">
                    {error.image[0]}
                  </span>
                )}
              </div>

              <DialogFooter className="pt-6">
                <Button
                  disabled={loading}
                  className="bg-orange-500 hover:bg-orange-600 w-full"
                >
                  {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Save Menu
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {restaurant?.menus.map((menu, idx) => (
          <div
            key={idx}
            className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <img
                src={menu?.image as string}
                alt={menu.name}
                className="h-44 sm:h-24 sm:w-24 w-full object-cover rounded-xl"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold group-hover:text-orange-600 text-gray-900 dark:text-gray-100">
                  {menu?.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                  {menu.description}
                </p>
                <p className="mt-3 font-semibold text-gray-900 dark:text-gray-100">
                  ₹ <span className="text-orange-600">{menu.price}</span>
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                size="sm"
                onClick={() => {
                  setSelectedMenu(menu);
                  setEditOpen(true);
                }}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      <EditMenu
        selectedMenu={selectedMenu}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />
    </div>
  );
};

export default AddMenu;

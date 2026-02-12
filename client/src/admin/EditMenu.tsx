import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { menuSchema, type MenuFormSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { Loader2 } from "lucide-react";
import {
  useEffect,
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";

type Menu = MenuFormSchema & Partial<{ _id: string }>;


const EditMenu = ({
  selectedMenu,
  editOpen,
  setEditOpen,
}: {
  selectedMenu?: Menu; 
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });

  const [error, setError] =
    useState<Partial<Record<keyof MenuFormSchema, string[]>>>({});
  const {loading, editMenu} = useMenuStore();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setError(fieldErrors as Partial<Record<keyof MenuFormSchema, string[]>>);
      return;
    }

    if (!selectedMenu?._id) {
      console.error("Menu ID is missing");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price.toString());

      if (input.image instanceof File) formData.append("image", input.image);

      await editMenu(selectedMenu._id, formData);
    } catch (error) {
      console.log(error);
    }
  };

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({
      ...input,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  useEffect(() => {
  if (!editOpen || !selectedMenu) return;

  // Defer state update to avoid synchronous setState warning
  const id = setTimeout(() => {
    setInput({
      name: selectedMenu.name,
      description: selectedMenu.description,
      price: selectedMenu.price,
      image: undefined,
    });
  });

  return () => clearTimeout(id); // cleanup in case effect re-runs
}, [editOpen, selectedMenu]);



  if (!selectedMenu) return null;

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent className="w-[95%] sm:max-w-lg rounded-2xl p-6 bg-white dark:bg-gray-800">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Edit Menu
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 dark:text-gray-300">
            Update your menu to keep your offerings fresh and exciting
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submitHandler} className="space-y-5 mt-6">
          <div className="space-y-2">
            <Label className="text-gray-700 dark:text-gray-200">Menu Name</Label>
            <Input
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
            {error.name && (
              <span className="text-xs font-medium text-red-600">
                {error.name[0]}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700 dark:text-gray-200">Description</Label>
            <Input
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
            {error.description && (
              <span className="text-xs font-medium text-red-600">
                {error.description[0]}
              </span>
            )}
          </div>

          <div className="space-y-2">
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

          <div className="space-y-2">
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
            {loading ? (
              <Button disabled className="w-full bg-orange-500">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                Save Menu
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMenu;

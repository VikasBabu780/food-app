import {
  Loader2,
  LocateIcon,
  Mail,
  MapPin,
  MapPinnedIcon,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRef, useState, type FormEvent } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/useUserStore";

const Profile = () => {
  const { user, updateProfile } = useUserStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileData, setProfileData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
    profilePicture: user?.profilePicture || "",
  });
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [selectedProfilePicture, setSelectedProfilePicture] =
    useState<string>(profileData?.profilePicture || "");

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedProfilePicture(result);
        setProfileData((prevData) => ({
          ...prevData,
          profilePicture: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const updateProfileHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await updateProfile(profileData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={updateProfileHandler}
      className="max-w-7xl mx-auto my-6 px-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <Avatar className="relative md:w-28 md:h-28 w-24 h-24">
            <AvatarImage src={selectedProfilePicture} />
            <AvatarFallback>CN</AvatarFallback>

            <input
              ref={imageRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={fileChangeHandler}
            />

            <div
              onClick={() => imageRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition rounded-full cursor-pointer"
            >
              <Plus className="text-white w-8 h-8" />
            </div>
          </Avatar>

          <Input
            type="text"
            name="fullname"
            value={profileData.fullname}
            onChange={changeHandler}
            placeholder="Full Name"
            className="font-bold text-xl md:text-[24px] sm:text-2xl border-none focus-visible:ring-0 text-center sm:text-left text-gray-900 dark:text-gray-100 bg-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-10">
        <div className="flex items-center gap-4 rounded-sm p-3 bg-gray-100 dark:bg-gray-700">
          <Mail className="text-gray-500 dark:text-gray-300" />
          <div className="w-full">
            <Label className="text-gray-700 dark:text-gray-100">Email</Label>
            <input
              disabled
              name="email"
              value={profileData.email}
              onChange={changeHandler}
              className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-sm p-3 bg-gray-100 dark:bg-gray-700">
          <LocateIcon className="text-gray-500 dark:text-gray-300" />
          <div className="w-full">
            <Label className="text-gray-700 dark:text-gray-100">Address</Label>
            <input
              name="address"
              value={profileData.address}
              onChange={changeHandler}
              className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-sm p-3 bg-gray-100 dark:bg-gray-700">
          <MapPin className="text-gray-500 dark:text-gray-300" />
          <div className="w-full">
            <Label className="text-gray-700 dark:text-gray-100">City</Label>
            <input
              name="city"
              value={profileData.city}
              onChange={changeHandler}
              className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-sm p-3 bg-gray-100 dark:bg-gray-700">
          <MapPinnedIcon className="text-gray-500 dark:text-gray-300" />
          <div className="w-full">
            <Label className="text-gray-700 dark:text-gray-100">Country</Label>
            <input
              name="country"
              value={profileData.country}
              onChange={changeHandler}
              className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300"
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        {isLoading ? (
          <Button disabled className="bg-orange-500 w-full sm:w-auto">
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            Please Wait
          </Button>
        ) : (
          <Button className="bg-orange-500 hover:bg-orange-700 w-full sm:w-auto">
            Update
          </Button>
        )}
      </div>
    </form>
  );
};

export default Profile;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { UserSignUpSchema, type SignupInputState } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, LockKeyhole, Mail, Phone, User } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [input, setInput] = useState<SignupInputState>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });

  const [errors, setErrors] = useState<Partial<SignupInputState>>({});
  const { signup, loading } = useUserStore();
  const navigate = useNavigate();

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const signupSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const result = UserSignUpSchema.safeParse(input);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors as Partial<SignupInputState>);
      return;
    }

    try {
      await signup(input);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-8 bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={signupSubmitHandler}
        className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 md:p-8"
      >
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="font-extrabold tracking-tight text-3xl sm:text-4xl">
            <span className="text-orange-500">Food</span>
            <span className="text-gray-800 dark:text-gray-100">Swift</span>
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            Create an account to get started
          </p>
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={input.fullname}
              onChange={changeEventHandler}
              className="h-11 pl-10 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus-visible:ring-orange-500"
            />
            <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
          </div>
          <p className="mt-1 min-h-5 text-sm text-red-500">{errors?.fullname}</p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <div className="relative">
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={input.email}
              onChange={changeEventHandler}
              className="h-11 pl-10 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus-visible:ring-orange-500"
            />
            <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
          </div>
          <p className="mt-1 min-h-5 text-sm text-red-500">{errors?.email}</p>
        </div>

        {/* Contact */}
        <div className="mb-4">
          <div className="relative">
            <Input
              type="tel"
              name="contact"
              placeholder="Contact Number"
              value={input.contact}
              onChange={changeEventHandler}
              className="h-11 pl-10 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus-visible:ring-orange-500"
            />
            <Phone className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
          </div>
          <p className="mt-1 min-h-5 text-sm text-red-500">{errors?.contact}</p>
        </div>

        {/* Password */}
        <div className="mb-6">
          <div className="relative">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={input.password}
              onChange={changeEventHandler}
              className="h-11 pl-10 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus-visible:ring-orange-500"
            />
            <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
          </div>
          <p className="mt-1 min-h-5 text-sm text-red-500">{errors?.password}</p>
        </div>

        {/* Submit Button */}
        <div className="mb-8">
          {loading ? (
            <Button disabled className="h-11 w-full bg-orange-500">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="h-11 w-full bg-orange-500 transition-all hover:bg-orange-600"
            >
              Signup
            </Button>
          )}
        </div>

        <Separator className="my-4" />

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

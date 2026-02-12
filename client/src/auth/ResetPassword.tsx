import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LockKeyholeIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const loading = false;

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-8 bg-gray-50 dark:bg-gray-900">
      <form className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 md:p-8">
        {/* Header */}
        <div className="mb-5 text-center">
          <h1 className="font-extrabold tracking-tight text-3xl sm:text-4xl">
            <span className="text-orange-500">Food</span>
            <span className="text-gray-800 dark:text-gray-100">Swift</span>
          </h1>
          <p className="mt-2 text-[30px] font-extrabold text-gray-800 dark:text-gray-100">
            Reset your password
          </p>
        </div>

        {/* Description */}
        <p className="mb-5 text-center text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          Enter your new password to change your previous password.
        </p>

        {/* Password Input */}
        <div className="mb-6">
          <div className="relative">
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              className="h-11 pl-10 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus-visible:ring-orange-500 focus-visible:border-orange-500"
            />
            <LockKeyholeIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
          </div>
        </div>

        {/* Submit Button */}
        {loading ? (
          <Button disabled className="h-11 w-full bg-orange-500">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button className="h-11 w-full bg-orange-500 transition-all hover:bg-orange-600">
            Reset Now
          </Button>
        )}

        {/* Footer */}
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Back to{" "}
          <Link to="/login" className="text-orange-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;

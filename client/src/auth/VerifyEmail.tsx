import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";
import { Loader2 } from "lucide-react";
import React, { useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  const { loading, verifyEmail } = useUserStore();
  const navigate = useNavigate();

  const handleChange = async (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 5) {
        inputRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();

      const newOtp = [...otp];

      if (newOtp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRef.current[index - 1]?.focus();
      }
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otp.some((digit) => digit === "")) return;

    const verificationCode = otp.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4 
                    bg-white dark:bg-gray-900 transition-colors">
      <div className="p-6 sm:p-8 rounded-lg w-full max-w-md flex flex-col gap-8 
                      border border-gray-200 dark:border-gray-700
                      shadow-sm bg-white dark:bg-gray-800 transition-colors">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl text-gray-900 dark:text-white">
            Verify Your Email
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Enter the 6-digit code sent to your email address
          </p>
        </div>

        <form onSubmit={submitHandler}>
          <div className="flex justify-center gap-2 sm:gap-3 md:gap-4">
            {otp.map((letter, idx) => (
              <Input
                key={idx}
                type="text"
                ref={(el) => {
                  inputRef.current[idx] = el;
                }}
                maxLength={1}
                value={letter}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12
                           text-base sm:text-lg md:text-2xl
                           text-center font-medium rounded-lg
                           bg-white dark:bg-gray-900
                           text-gray-900 dark:text-white
                           border border-gray-300 dark:border-gray-600
                           focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>

          {loading ? (
            <Button
              disabled
              className="bg-orange-500 hover:bg-orange-600 
                         dark:bg-orange-600 dark:hover:bg-orange-700
                         mt-6 w-full rounded-lg py-2.5"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              className="bg-orange-500 hover:bg-orange-600 
                         dark:bg-orange-600 dark:hover:bg-orange-700
                         mt-6 w-full rounded-lg py-2.5"
            >
              Verify
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import type { SignupInputState } from "@/schema/userSchema";
import { toast } from "sonner";

const API_END_POINT = "http://localhost:8000/api/v1/user";
axios.defaults.withCredentials = true;

// Define User type
type User = {
  _id: string;
  fullname: string;
  email: string;
  contact: number;
  address: string;
  city: string;
  country: string;
  profilePicture?: string;
  admin: boolean;
  isVerified: boolean;
};

// Add UpdateProfile type
type UpdateProfileInput = {
  fullname?: string;
  email?: string;
  address?: string;
  city?: string;
  country?: string;
  profilePicture?: string;
};

// Define the store state type
type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  signup: (input: SignupInputState) => Promise<void>;
  login: (input: { email: string; password: string }) => Promise<void>;
  verifyEmail: (verificationCode: string) => Promise<void>;
  checkAuthentication: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (input: UpdateProfileInput) => Promise<void>;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,

      // Signup API Implementation
      signup: async (input: SignupInputState) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/signup`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.data.success) {
            toast.success(response.data.message);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error) {
          set({ loading: false });
          if (axios.isAxiosError(error)) {
            toast.error(
              error.response?.data?.message || "Something went wrong",
            );
          } else {
            toast.error("Unexpected error occurred");
          }
        }
      },

      // Login API Implementation
      login: async (input: { email: string; password: string }) => {
        try {
          set({ loading: true });

          const response = await axios.post(`${API_END_POINT}/login`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.data.success) {
            const user = response.data.user;

            toast.success(response.data.message);

            set({
              loading: false,
              user,
              isAuthenticated: true,
            });

            return user;
          }
        } catch (error) {
          set({ loading: false });

          if (axios.isAxiosError(error)) {
            toast.error(
              error.response?.data?.message || "Something went wrong",
            );
          } else {
            toast.error("Unexpected error occurred");
          }

          return null;
        }
      },

      // Verify Email
      verifyEmail: async (verificationCode: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/verify-email`,
            { verificationCode },
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          if (response.data.success) {
            toast.success(response.data.message);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error) {
          set({ loading: false });
          if (axios.isAxiosError(error)) {
            toast.error(
              error.response?.data?.message || "Something went wrong",
            );
          } else {
            toast.error("Unexpected error occurred");
          }
        }
      },

      // Check Authentication
      checkAuthentication: async () => {
        try {
          set({ isCheckingAuth: true });
          const response = await axios.get(`${API_END_POINT}/check-auth`);

          if (response.data.success) {
            set({
              user: response.data.user,
              isAuthenticated: true,
              isCheckingAuth: false,
            });
          }
        } catch (error) {
          set({
            isAuthenticated: false,
            isCheckingAuth: false,
            user: null,
          });

          if (axios.isAxiosError(error)) {
            if (axios.isAxiosError(error)) {
              if (error.response?.status !== 401) {
                toast.error(
                  error.response?.data?.message || "Something went wrong",
                );
              }
            } else {
              toast.error("Unexpected error occurred");
            }
          } else {
            toast.error("Unexpected error occurred");
          }
        }
      },

      // Logout
      logout: async () => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/logout`);

          if (response.data.success) {
            toast.success(response.data.message);
            set({
              loading: false,
              user: null,
              isAuthenticated: false,
            });
          }
        } catch (error) {
          set({ loading: false });
          if (axios.isAxiosError(error)) {
            toast.error(
              error.response?.data?.message || "Something went wrong",
            );
          } else {
            toast.error("Unexpected error occurred");
          }
        }
      },

      // Forgot Password
      forgotPassword: async (email: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/forgot-password`,
            { email },
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error) {
          set({ loading: false });
          if (axios.isAxiosError(error)) {
            toast.error(
              error.response?.data?.message || "Something went wrong",
            );
          } else {
            toast.error("Unexpected error occurred");
          }
        }
      },

      // Reset Password
      resetPassword: async (token: string, newPassword: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/reset-password/${token}`,
            { newPassword },
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error) {
          set({ loading: false });
          if (axios.isAxiosError(error)) {
            toast.error(
              error.response?.data?.message || "Something went wrong",
            );
          } else {
            toast.error("Unexpected error occurred");
          }
        }
      },

      // Update Profile
      updateProfile: async (input: UpdateProfileInput) => {
        try {
          const response = await axios.put(
            `${API_END_POINT}/profile/update`,
            input,
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          if (response.data.success) {
            toast.success(response.data.message);
            set({
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            toast.error(
              error.response?.data?.message || "Something went wrong",
            );
          } else {
            toast.error("Unexpected error occurred");
          }
        }
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,
    isUpdatingprofile: false,

    isCheckingAuth: true,
    
    checkAuth: async () => {
        try {
            const res = axiosInstance('/auth/check');

            set({ authUser: res.data });
        } catch (error) {
            console.error("Error in CheckAuth: ", error);
            set({authUser: null})
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signUp: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            console.log("Success");
            
            toast.success("Account created successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            set({ isSigningUp: false});
        }
    }
}));

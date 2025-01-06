import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

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

    signUp: async () => {
        
    }
}));

import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      setAuth: (user, token) => set({ user, token }),
      clearAuth: () => set({ user: null, token: null }),

      login: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(
            "http://localhost:5000/api/auth/login",
            {
              username,
              password,
            }
          );
          set({ user: response.data.user, isLoading: false });
        } catch (error) {
          console.error("Login error:", error.response?.data || error.message);
          set({
            error: error.response?.data?.message || "Login failed",
            isLoading: false,
          });
        }
      },
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage", // key trong localStorage
      partialize: (state) => ({ user: state.user }), // chỉ lưu user
    }
  )
);

//   register: async (username, password) => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/signup",
//         {
//           username,
//           password,
//         }
//       );
//       set({ user: response.data.user, isLoading: false });
//     } catch (error) {
//       console.error("Signup error:", error.response?.data || error.message);
//       set({
//         error: error.response?.data?.message || "Signup failed",
//         isLoading: false,
//       });
//     }
//   },
//   fetchCurrentUser: async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("http://localhost:5000/api/auth/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       set({ user: response.data });
//     } catch (error) {
//       console.error("Error fetching current user:", error);
//       set({ user: null });
//     }
//   },
//   fetchHistory: async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("http://localhost:5000/api/history", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       set({ history: response.data });
//     } catch (error) {
//       console.error("Error fetching history:", error);
//     }
//   },
//   resetPassword: async (email) => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/reset-password",
//         {
//           email,
//         }
//       );
//       console.log("Reset password response:", response.data);
//       set({ isLoading: false });
//     } catch (error) {
//       console.error(
//         "Reset password error:",
//         error.response?.data || error.message
//       );
//       set({
//         error: error.response?.data?.message || "Reset password failed",
//         isLoading: false,
//       });
//     }
//   }
//     }),

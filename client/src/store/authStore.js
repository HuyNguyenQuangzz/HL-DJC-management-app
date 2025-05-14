// stores/authStore.js
import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        loading: false,
      });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, isAuthenticated: false });
  },

//   initialize: async () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       set({ loading: true });
//       try {
//         // Verify token with backend
//         const response = await fetch("http://localhost:5000/api/auth/verify", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.ok) {
//           const userData = await response.json();
//           set({
//             user: userData,
//             token,
//             isAuthenticated: true,
//             loading: false,
//           });
//         } else {
//           localStorage.removeItem("token");
//           set({ loading: false });
//         }
//       } catch (error) {
//         localStorage.removeItem("token");
//         set({ loading: false });
//       }
//     }
//   },
}));

export default useAuthStore;

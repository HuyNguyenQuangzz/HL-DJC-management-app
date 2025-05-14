// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import axios from "axios";

// const API_URL =
//   import.meta.env.MODE === "development"
//     ? "http://localhost:5000/api/auth"
//     : "/api/auth";

// axios.defaults.withCredentials = true;

// export const useAuthStore = create(
//   persist(
//     (set) => ({
//       user: null,
//       isAuthenticated: false,
//       isLoading: false,
//       error: null,
//       message: null,
//       token: null,
//       isCheckingAuth: false,
//       // setAuth: (user, token) => set({ user, token, error: null }),
//       // clearAuth: () =>
//       //   set({ user: null, token: null, error: null, isLoading: false }),
//       signup: async (username, password) => {
//         set({ isLoading: true, error: null });
//         try {
//           const response = await axios.post(
//             "http://localhost:5000/api/auth/signup",
//             {
//               username,
//               password,
//             }
//           );
//           set({
//             user: response.data.user,
//             isLoading: false,
//           });
//         } catch (error) {
//           console.error("Signup error:", error.response?.data || error.message);
//           set({
//             error: error.response?.data?.message || "Signup failed",
//             isLoading: false,
//           });
//           throw error;
//         }
//       },
//       login: async (username, password, token) => {
//         set({ isLoading: true, error: null });
//         try {
//           const response = await axios.post(`${API_URL}/login`, {
//             username,
//             password,
//           });
//           // const { user, token } = response.data;
//           set({
//             isAuthenticated: true,
//             token: response.data.token,
//             user: response.data.user,
//             isLoading: false,
//             error: null,
//           });
//         } catch (error) {
//           const errorMessage =
//             error.response?.data?.message || "Đăng nhập thất bại";
//           set({ error: errorMessage, isLoading: false });
//           throw error;
//         }
//       },
//       logout: async () => {
//         set({ isLoading: true, error: null });
//         try {
//           // Optional: Call backend logout endpoint if needed
//           // await axios.post("http://localhost:5000/api/auth/logout", {}, {
//           //   headers: { Authorization: `Bearer ${get().token}` },
//           // });
//           await axios.post(`${API_URL}/logout`);
//           set({
//             user: null,
//             isAuthenticated: null,
//             error: null,
//             isLoading: false,
//           });
//         } catch (error) {
//           set({ error: "Logout failed", isLoading: false });
//           throw error;
//         }
//       },
//     }),
//     {
//       // name: "auth-storage",
//       token: (state) => state.token,
//       // partialize: (state) => ({ user: state.user }),
//     }
//   )
// );

// //   register: async (username, password) => {
// //     set({ isLoading: true, error: null });
// //     try {
// //       const response = await axios.post(
// //         "http://localhost:5000/api/auth/signup",
// //         {
// //           username,
// //           password,
// //         }
// //       );
// //       set({ user: response.data.user, isLoading: false });
// //     } catch (error) {
// //       console.error("Signup error:", error.response?.data || error.message);
// //       set({
// //         error: error.response?.data?.message || "Signup failed",
// //         isLoading: false,
// //       });
// //     }
// //   },
// //   fetchCurrentUser: async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await axios.get("http://localhost:5000/api/auth/me", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       set({ user: response.data });
// //     } catch (error) {
// //       console.error("Error fetching current user:", error);
// //       set({ user: null });
// //     }
// //   },
// //   fetchHistory: async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await axios.get("http://localhost:5000/api/history", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       set({ history: response.data });
// //     } catch (error) {
// //       console.error("Error fetching history:", error);
// //     }
// //   },
// //   resetPassword: async (email) => {
// //     set({ isLoading: true, error: null });
// //     try {
// //       const response = await axios.post(
// //         "http://localhost:5000/api/auth/reset-password",
// //         {
// //           email,
// //         }
// //       );
// //       console.log("Reset password response:", response.data);
// //       set({ isLoading: false });
// //     } catch (error) {
// //       console.error(
// //         "Reset password error:",
// //         error.response?.data || error.message
// //       );
// //       set({
// //         error: error.response?.data?.message || "Reset password failed",
// //         isLoading: false,
// //       });
// //     }
// //   }
// //     }),

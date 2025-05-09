import { create } from "zustand";
import axios from "axios";

const useRequestStore = create((set) => ({
  requests: [],
  user: null,
  fetchCurrentUser: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ user: response.data });
    } catch (error) {
      console.error("Error fetching current user:", error);
      set({ user: null });
    }
  },
  fetchRequests: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ requests: response.data });
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  },
  addRequest: async (request) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/requests",
        request,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set((state) => ({ requests: [...state.requests, response.data] }));
    } catch (error) {
      console.error("Error adding request:", error);
    }
  },
  updateRequest: async (id, updates) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:5000/api/requests/${id}`,
        updates,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set((state) => ({
        requests: state.requests.map((req) =>
          req._id === id ? response.data : req
        ),
      }));
    } catch (error) {
      throw new Error(error.response?.data?.message || "Update failed");
    }
  },
  deleteRequest: async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/requests/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        requests: state.requests.filter((req) => req._id !== id),
      }));
    } catch (error) {
      throw new Error(error.response?.data?.message || "Delete failed");
    }
  },
}));

export default useRequestStore;

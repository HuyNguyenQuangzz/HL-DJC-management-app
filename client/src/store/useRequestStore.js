import { create } from "zustand";
import axios from "axios";

const useRequestStore = create((set) => ({
  data: [],
  itemTypes: [],
  history: [],
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
  fetchData: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/phe-duyet", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ data: response.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  addData: async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/phe-duyet",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set((state) => ({ data: [...state.data, response.data] }));
    } catch (error) {
      console.error("Error adding data:", error);
      throw error;
    }
  },
  updateData: async (id, updates) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:5000/api/phe-duyet/${id}`,
        updates,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set((state) => ({
        data: state.data.map((item) =>
          item._id === id ? response.data : item
        ),
      }));
    } catch (error) {
      throw new Error(error.response?.data?.message || "Update failed");
    }
  },
  deleteData: async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/phe-duyet/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        data: state.data.filter((item) => item._id !== id),
      }));
    } catch (error) {
      throw new Error(error.response?.data?.message || "Delete failed");
    }
  },
  fetchItemTypes: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/item-types", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ itemTypes: response.data });
    } catch (error) {
      console.error("Error fetching item types:", error);
    }
  },
  addItemType: async (itemType) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/item-types",
        itemType,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set((state) => ({ itemTypes: [...state.itemTypes, response.data] }));
    } catch (error) {
      console.error("Error adding item type:", error);
      throw error;
    }
  },
  updateItemType: async (id, updates) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:5000/api/item-types/${id}`,
        updates,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set((state) => ({
        itemTypes: state.itemTypes.map((item) =>
          item._id === id ? response.data : item
        ),
      }));
    } catch (error) {
      throw new Error(error.response?.data?.message || "Update failed");
    }
  },
  deleteItemType: async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/item-types/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        itemTypes: state.itemTypes.filter((item) => item._id !== id),
      }));
    } catch (error) {
      throw new Error(error.response?.data?.message || "Delete failed");
    }
  },
  fetchHistory: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ history: response.data });
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  },
}));

export default useRequestStore;

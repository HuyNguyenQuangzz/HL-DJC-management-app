import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../stores/authStore";

function Home() {
  const { user } = useAuthStore();
  const [form, setForm] = useState({
    itemType: "",
    company: "",
    amount: "",
    note: "",
  });
  const [itemTypes, setItemTypes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/item-types", {
        headers: { Authorization: `Bearer ${useAuthStore.getState().token}` },
      })
      .then((res) => setItemTypes(res.data))
      .catch(() => setError("Failed to fetch item types"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/api/data",
        { ...form, user: user._id },
        {
          headers: { Authorization: `Bearer ${useAuthStore.getState().token}` },
        }
      );
      alert("Request created");
      setForm({ itemType: "", company: "", amount: "", note: "" });
    } catch (err) {
      setError("Failed to create request");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Create Request</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block mb-1">Item Type</label>
          <select
            value={form.itemType}
            onChange={(e) => setForm({ ...form, itemType: e.target.value })}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Item Type</option>
            {itemTypes.map((type) => (
              <option
                key={type._id}
                value={type._id}
                className="hover:bg-blue-300"
              >
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Company</label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Amount</label>
          <input
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Note</label>
          <textarea
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}

export default Home;

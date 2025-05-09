import { Button, Input, notification } from "antd";
import { useState } from "react";
import RequestList from "../components/RequestList";
import useRequestStore from "../store/useRequestStore";

function Dashboard({ onLogout }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const addRequest = useRequestStore((state) => state.addRequest);

  const handleSubmitRequest = async () => {
    if (!title.trim()) {
      notification.error({ message: "Title is required" });
      return;
    }
    await addRequest({ title, description });
    setTitle("");
    setDescription("");
    notification.success({ message: "Request submitted successfully" });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-end mb-4">
        <Button onClick={onLogout} type="link" className="text-white">
          Logout
        </Button>
      </div>
      <div className="mb-6 p-6 bg-white rounded-lg shadow">
        <Input
          placeholder="Request Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4"
        />
        <Input.TextArea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4"
        />
        <Button type="primary" onClick={handleSubmitRequest} className="w-full">
          Submit Request
        </Button>
      </div>
      <RequestList />
    </div>
  );
}

export default Dashboard;

import { useEffect } from "react";
import { List, Button, notification } from "antd";
import useRequestStore from "../store/useRequestStore";

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
    case "approved":
      return "bg-green-100 border-green-500";
    case "completed":
      return "bg-yellow-100 border-yellow-500";
    case "rejected":
      return "bg-red-100 border-red-500";
    default:
      return "bg-gray-100 border-gray-500";
  }
};

function DataList() {
  const { data, user, fetchData, fetchCurrentUser, updateData, deleteData } =
    useRequestStore();
  const isAdmin = user?.level === "admin";

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchCurrentUser();
      fetchData();
    }
  }, [fetchCurrentUser, fetchData]);

  const handleApprove = async (id) => {
    try {
      await updateData(id, { status: "approved" });
      notification.success({ message: "Data approved" });
    } catch (err) {
      notification.error({ message: err.message || "Failed to approve data" });
    }
  };

  const handleComplete = async (id) => {
    try {
      await updateData(id, { status: "completed" });
      notification.success({ message: "Data marked as completed" });
    } catch (err) {
      notification.error({ message: err.message || "Failed to complete data" });
    }
  };

  const handleReject = async (id) => {
    try {
      await updateData(id, { status: "rejected" });
      notification.success({ message: "Data rejected" });
    } catch (err) {
      notification.error({ message: err.message || "Failed to reject data" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteData(id);
      notification.success({ message: "Data deleted" });
    } catch (err) {
      notification.error({ message: err.message || "Failed to delete data" });
    }
  };

  return (
    <List
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          className={`p-4 mb-4 border rounded-lg ${getStatusColor(
            item.status
          )}`}
        >
          <div className="flex justify-between w-full">
            <div>
              <h3 className="text-lg font-semibold">{item.company}</h3>
              <p>
                <strong>Item Type:</strong> {item.itemType?.name || "Unknown"}
              </p>
              <p>
                <strong>Amount:</strong> {item.amount}
              </p>
              <p>
                <strong>Note:</strong> {item.note || "N/A"}
              </p>
              <p className="text-sm text-gray-500">
                Status: {item.status.toUpperCase()}
              </p>
            </div>
            <div className="flex space-x-2">
              {isAdmin && item.status === "pending" && (
                <>
                  <Button
                    onClick={() => handleApprove(item._id)}
                    type="primary"
                  >
                    Approve
                  </Button>
                  <Button onClick={() => handleReject(item._id)} danger>
                    Reject
                  </Button>
                </>
              )}
              {isAdmin && item.status === "approved" && (
                <Button onClick={() => handleComplete(item._id)} type="primary">
                  Mark Complete
                </Button>
              )}
              <Button onClick={() => handleDelete(item._id)} danger>
                Delete
              </Button>
            </div>
          </div>
        </List.Item>
      )}
    />
  );
}

export default DataList;

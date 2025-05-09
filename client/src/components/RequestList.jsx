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

function RequestList() {
  const {
    requests,
    user,
    fetchRequests,
    fetchCurrentUser,
    updateRequest,
    deleteRequest,
  } = useRequestStore();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchCurrentUser(); // Lấy thông tin người dùng
      fetchRequests(); // Lấy danh sách request
    }
  }, [fetchCurrentUser, fetchRequests]);

  const handleApprove = async (id) => {
    try {
      await updateRequest(id, { status: "approved" });
      notification.success({ message: "Request approved" });
    } catch (err) {
      notification.error({
        message: err.message || "Failed to approve request",
      });
    }
  };

  const handleComplete = async (id) => {
    try {
      await updateRequest(id, { status: "completed" });
      notification.success({ message: "Request marked as completed" });
    } catch (err) {
      notification.error({
        message: err.message || "Failed to complete request",
      });
    }
  };

  const handleReject = async (id) => {
    try {
      await updateRequest(id, { status: "rejected" });
      notification.success({ message: "Request rejected" });
    } catch (err) {
      notification.error({
        message: err.message || "Failed to reject request",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRequest(id);
      notification.success({ message: "Request deleted" });
    } catch (err) {
      notification.error({
        message: err.message || "Failed to delete request",
      });
    }
  };

  return (
    <List
      dataSource={requests}
      renderItem={(item) => (
        <List.Item
          className={`p-4 mb-4 border rounded-lg ${getStatusColor(
            item.status
          )}`}
        >
          <div className="flex justify-between w-full">
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p>{item.description}</p>
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

export default RequestList;

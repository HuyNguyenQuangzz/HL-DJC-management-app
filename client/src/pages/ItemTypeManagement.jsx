import { useEffect, useState } from "react";
import { List, Button, Input, notification, Modal } from "antd";
import useRequestStore from "../store/useRequestStore";

function ItemTypeManagement() {
  const {
    itemTypes,
    user,
    fetchItemTypes,
    fetchCurrentUser,
    addItemType,
    updateItemType,
    deleteItemType,
  } = useRequestStore();
  const [newItemType, setNewItemType] = useState("");
  const [editItemType, setEditItemType] = useState(null);
  const [editName, setEditName] = useState("");
  const isAdmin = user?.level === "admin";

  useEffect(() => {
    fetchCurrentUser();
    fetchItemTypes();
  }, [fetchCurrentUser, fetchItemTypes]);

  const handleAddItemType = async () => {
    if (!newItemType.trim()) {
      notification.error({ message: "Item Type name is required" });
      return;
    }
    try {
      await addItemType({ name: newItemType });
      setNewItemType("");
      notification.success({ message: "Item Type added successfully" });
    } catch (err) {
      notification.error({ message: "Failed to add Item Type" });
    }
  };

  const handleEditItemType = (item) => {
    setEditItemType(item);
    setEditName(item.name);
  };

  const handleUpdateItemType = async () => {
    if (!editName.trim()) {
      notification.error({ message: "Item Type name is required" });
      return;
    }
    try {
      await updateItemType(editItemType._id, { name: editName });
      setEditItemType(null);
      setEditName("");
      notification.success({ message: "Item Type updated successfully" });
    } catch (err) {
      notification.error({
        message: err.message || "Failed to update Item Type",
      });
    }
  };

  const handleDeleteItemType = async (id) => {
    try {
      await deleteItemType(id);
      notification.success({ message: "Item Type deleted successfully" });
    } catch (err) {
      notification.error({
        message: err.message || "Failed to delete Item Type",
      });
    }
  };

  if (!isAdmin) {
    return <div className="text-center p-6">Admin access required</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Manage Item Types</h2>
      <div className="mb-6 p-6 bg-white rounded-lg shadow">
        <Input
          placeholder="New Item Type Name"
          value={newItemType}
          onChange={(e) => setNewItemType(e.target.value)}
          className="mb-4"
        />
        <Button type="primary" onClick={handleAddItemType} className="w-full">
          Add Item Type
        </Button>
      </div>
      <List
        dataSource={itemTypes}
        renderItem={(item) => (
          <List.Item
            className="p-4 mb-4 border rounded-lg bg-white"
            actions={[
              <Button type="link" onClick={() => handleEditItemType(item)}>
                Edit
              </Button>,
              <Button
                type="link"
                danger
                onClick={() => handleDeleteItemType(item._id)}
              >
                Delete
              </Button>,
            ]}
          >
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">
                Created: {new Date(item.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Updated: {new Date(item.updatedAt).toLocaleString()}
              </p>
            </div>
          </List.Item>
        )}
      />
      <Modal
        title="Edit Item Type"
        open={!!editItemType}
        onOk={handleUpdateItemType}
        onCancel={() => setEditItemType(null)}
      >
        <Input
          placeholder="Item Type Name"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
      </Modal>
    </div>
  );
}

export default ItemTypeManagement;

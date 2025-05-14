import { useContext, useEffect, useState } from "react";
import { List, Button, Input, notification, Modal } from "antd";
import { AuthContext } from "../context/AuthContext";

function ItemTypeManagement() {
  const [newItemType, setNewItemType] = useState("");
  const [editItemType, setEditItemType] = useState(null);
  const [editName, setEditName] = useState("");
  const { user } = useContext(AuthContext);
  const handleAddItemType = async () => {};
  const handleEditItemType = (item) => {};
  const handleDeleteItemType = async (id) => {};
  const handleUpdateItemType = async () => {};
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

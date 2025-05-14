import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Typography,
  Spin,
  Alert,
  Card,
  Popconfirm,
  message,
  Space,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { TextArea } = Input;

const ItemTypes = () => {
  const { user, isAuthenticated, userLevel } = useContext(AuthContext);
  const [itemTypes, setItemTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItemType, setEditingItemType] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Replace with your actual API base URL (e.g., from .env)
  const API_URL = "http://localhost:5000";

  // Fetch item types
  const fetchItemTypes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/item-types`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch item types");
      const data = await response.json();
      setItemTypes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create or update item type
  const handleSave = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const url = editingItemType
        ? `${API_URL}/api/item-types/${editingItemType.id}`
        : `${API_URL}/api/item-types`;
      const method = editingItemType ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to save item type");
      await response.json();
      message.success(
        editingItemType
          ? "Item type updated successfully"
          : "Item type created successfully"
      );
      form.resetFields();
      setIsModalOpen(false);
      setEditingItemType(null);
      fetchItemTypes(); // Refresh the list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete item type
  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/item-types/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete item type");
      message.success("Item type deleted successfully");
      fetchItemTypes(); // Refresh the list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Open modal for creating or editing
  const showModal = (itemType = null) => {
    setEditingItemType(itemType);
    if (itemType) {
      form.setFieldsValue(itemType);
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  // Close modal
  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingItemType(null);
    form.resetFields();
  };

  useEffect(() => {
    if (isAuthenticated && user && userLevel === "admin") {
      fetchItemTypes();
    }
  }, [isAuthenticated, user, userLevel]);

  if (!isAuthenticated || !user) {
    return (
      <Alert
        message="Unauthorized"
        description="Please log in to manage item types."
        type="warning"
        showIcon
        style={{ margin: "16px" }}
      />
    );
  }

  if (userLevel !== "admin") {
    return (
      <Alert
        message="Forbidden"
        description="Only admins can manage item types."
        type="error"
        showIcon
        style={{ margin: "16px" }}
      />
    );
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => text || "-",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (text ? new Date(text).toLocaleDateString() : "-"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => showModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this item type?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <Title level={2} style={{ marginBottom: "24px" }}>
        Manage Item Types
      </Title>
      <Card>
        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: "16px" }}
          />
        )}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
          style={{ marginBottom: "16px" }}
        >
          Create Item Type
        </Button>
        {loading ? (
          <Spin
            size="large"
            style={{ display: "block", margin: "50px auto" }}
          />
        ) : (
          <Table
            columns={columns}
            dataSource={itemTypes}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        )}
      </Card>

      <Modal
        title={editingItemType ? "Edit Item Type" : "Create Item Type"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          disabled={loading}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input placeholder="Enter item type name" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea
              rows={4}
              placeholder="Enter item type description (optional)"
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                {editingItemType ? "Update" : "Create"}
              </Button>
              <Button onClick={handleCancel} disabled={loading}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ItemTypes;

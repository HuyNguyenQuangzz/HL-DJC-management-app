import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  Form,
  Input,
  Select,
  Button,
  Typography,
  Spin,
  Alert,
  Card,
} from "antd";
import { FileAddOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const CreateRequest = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Replace with your actual API base URL (e.g., from .env)
  // const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const onFinish = async (values) => {
    if (!isAuthenticated || !user) {
      setError("Please log in to submit a request.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:5000/api/phe-duyet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
        body: JSON.stringify({
          title: values.title,
          description: values.description || "",
          priority: values.priority,
          userId: user.id, // Include user ID for backend association
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit request");
      }

      setSuccess("Request submitted successfully!");
      form.resetFields();
      setTimeout(() => {
        navigate("/home");
      }, 1500); // Redirect to /home after 1.5s
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <Alert
        message="Unauthorized"
        description="Please log in to create a request."
        type="warning"
        showIcon
        style={{ margin: "16px" }}
      />
    );
  }

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <Title level={2} style={{ marginBottom: "24px" }}>
        Create New Request
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
        {success && (
          <Alert
            message="Success"
            description={success}
            type="success"
            showIcon
            style={{ marginBottom: "16px" }}
          />
        )}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          disabled={loading}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input placeholder="Enter request title" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea
              rows={4}
              placeholder="Enter request description (optional)"
            />
          </Form.Item>
          <Form.Item
            label="Priority"
            name="priority"
            rules={[{ required: true, message: "Please select a priority" }]}
          >
            <Select placeholder="Select priority">
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<FileAddOutlined />}
              loading={loading}
            >
              Submit Request
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateRequest;

import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  notification,
  Descriptions,
  Spin,
  Alert,
} from "antd";
import {
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Title, Text } = Typography;

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Replace with your actual API base URL (e.g., from .env)
  const API_URL = "http://localhost:5000";

  const handleChangePassword = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/change-password`,
        { newPassword: values.newPassword },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      notification.success({
        message: "Success",
        description: response.data.message || "Password changed successfully",
      });
      form.resetFields();
      setShowPasswordForm(false); // Hide form after success
    } catch (err) {
      notification.error({
        message: "Error",
        description: err.response?.data?.message || "Failed to change password",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div style={{ padding: "24px", maxWidth: "600px", margin: "0 auto" }}>
        <Spin tip="Loading user information..." />
      </div>
    );
  }

  return (
    <div style={{ padding: "24px", maxWidth: "600px", margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
        Profile
      </Title>
      <Card>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Username">
            {user.username}
          </Descriptions.Item>
          <Descriptions.Item label="Level">
            {user.level.charAt(0).toUpperCase() + user.level.slice(1)}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {new Date(user.createdAt).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {new Date(user.updatedAt).toLocaleDateString()}
          </Descriptions.Item>
        </Descriptions>
        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <Button
            type="primary"
            icon={showPasswordForm ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            onClick={() => setShowPasswordForm(!showPasswordForm)}
          >
            {showPasswordForm
              ? "Hide Change Password Form"
              : "Show Change Password Form"}
          </Button>
        </div>
        {showPasswordForm && (
          <div style={{ marginTop: "24px" }}>
            <Title level={4} style={{ marginBottom: "16px" }}>
              Change Password
            </Title>
            <Form
              form={form}
              onFinish={handleChangePassword}
              layout="vertical"
              disabled={loading}
            >
              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters!",
                  },
                ]}
              >
                <Input.Password placeholder="Enter new password" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm new password" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<LockOutlined />}
                  loading={loading}
                  block
                >
                  Change Password
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Profile;

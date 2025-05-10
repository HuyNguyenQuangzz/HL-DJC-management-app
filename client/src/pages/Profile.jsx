import { useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import axios from "axios";
import useRequestStore from "../store/useRequestStore";

function Profile() {
  const { user, fetchCurrentUser } = useRequestStore();
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const handleChangePassword = async (values) => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/change-password",
        { newPassword: values.newPassword },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      notification.success({ message: "Password changed successfully" });
      form.resetFields();
    } catch (err) {
      notification.error({
        message: err.response?.data?.message || "Failed to change password",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow ">
      <h2 className="text-xl font-semibold mb-4 text-center">Profile</h2>
      {user ? (
        <div className="mb-6">
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Level:</strong>{" "}
            {user.level.charAt(0).toUpperCase() + user.level.slice(1)}
          </p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
      <h3 className="text-lg font-semibold mb-2">Change Password</h3>
      <Form form={form} onFinish={handleChangePassword}>
        <Form.Item
          name="newPassword"
          rules={[
            { required: true, message: "Please input your new password!" },
          ]}
        >
          <Input.Password placeholder="New Password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Please confirm your new password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm New Password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          Change Password
        </Button>
      </Form>
    </div>
  );
}

export default Profile;

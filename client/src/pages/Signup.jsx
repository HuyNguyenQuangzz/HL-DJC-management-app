import { Form, Input, Button, notification } from "antd";
import axios from "axios";

function Signup() {
  const handleSignup = async (values) => {
    try {
      await axios.post("http://localhost:5000/api/auth/signup", values);
      notification.success({
        message: "Signed up successfully. Please login.",
      });
    } catch (err) {
      notification.error({
        message: err.response?.data?.message || "Signup failed",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Signup</h2>
      <Form onFinish={handleSignup}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="role"
          rules={[{ required: true, message: "Please select your role!" }]}
        >
          <select className="w-full p-2 border rounded">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          Signup
        </Button>
      </Form>
    </div>
  );
}

export default Signup;

import { Form, Input, Button, notification } from "antd";
import axios from "axios";

function Login({ onLogin }) {
  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        values
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      onLogin(token);
      notification.success({ message: "Logged in successfully" });
    } catch (err) {
      notification.error({
        message: err.response?.data?.message || "Login failed",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <Form onFinish={handleLogin}>
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
        <Button type="primary" htmlType="submit" className="w-full">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;

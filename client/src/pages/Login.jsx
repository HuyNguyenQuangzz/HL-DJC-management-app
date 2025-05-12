import { Form, Input, Button, notification, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, user } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow mt-16">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {user && (
        <p className="text-green-600 mb-2">
          Xin chào, {user.username || user.level}
        </p>
      )}
      <Form onFinish={handleSubmit}>
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
        <Button
          type="primary"
          htmlType="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          {/* Login */}
        </Button>
        {/* chưa có account, signup */}
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500">
            Sign up
          </a>
        </p>
        {/* login with google account */}
        <Divider>Or</Divider>
        <Button
          type="primary"
          className="w-full"
          onClick={() => {
            window.open("http://localhost:5000/api/auth/google", "_self");
          }}
        >
          Login with Google
        </Button>
      </Form>
    </div>
  );
}

export default Login;

import { Form, Input, Button, notification } from "antd";
// import { useAuthStore } from "../store/useAuthStore";
import useAuthStore from "../store/authStore";

import { useNavigate } from "react-router-dom";

function Signup() {
  // const handleSignup = async (values) => {
  //   try {
  //     // await axios.post("http://localhost:5000/api/auth/signup", values);
  //     axios.post("http://localhost:5000/api/auth/signup", values, {
  //       withCredentials: true,
  //     });

  //     notification.success({
  //       message: "Signed up successfully. Please login.",
  //     });
  //   } catch (err) {
  //     notification.error({
  //       message: err.response?.data?.message || "Signup failed",
  //     });
  //   }
  // };

  const { signup, isLoading, error, user } = useAuthStore();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSignup = async (values) => {
    try {
      await signup(values.username, values.password, values.role);
      notification.success({
        message: "Signed up successfully. Please login.",
      });
      navigate("/login");
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
        {/* already have an account */}
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Login
          </a>
        </p>
      </Form>
    </div>
  );
}

export default Signup;

import React, { useContext, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [error, setError] = useState('');

  const onFinish = async(values) => {
    // const success = login(values.username, values.password);
    // if (!success) setError('Invalid username or password');
    try {
      const success = await loginUser(values.username, values.password);
      if (!success) setError('Invalid username or password');
    } catch (error) {
      setError(error.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-96">
        <h2 className="text-2xl mb-4 text-center">Login</h2>
        <Form onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Login
            </Button>
          </Form.Item>
          {error && <div className="text-red-500 text-center">{error}</div>}
        </Form>
      </div>
    </div>
  );
};

export default Login;
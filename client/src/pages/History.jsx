import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { List, Card, Typography, Spin, Alert, Empty, Space } from "antd";
import axios from "axios";

const { Title, Text } = Typography;

const History = () => {
  const { user, isAuthenticated, userLevel } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Replace with your actual API base URL (e.g., from .env)
  const API_URL = "http://localhost:5000";

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token") || user?.token;
      if (!token) throw new Error("No authentication token found");

      const response = await axios.get(`${API_URL}/api/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchHistory();
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated || !user) {
    return (
      <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
        <Alert
          message="Unauthorized"
          description="Please log in to view your history."
          type="warning"
          showIcon
        />
      </div>
    );
  }

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <Title level={2} style={{ marginBottom: "24px" }}>
        History
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
        {loading ? (
          <Spin
            size="large"
            style={{ display: "block", margin: "50px auto" }}
          />
        ) : history.length === 0 ? (
          <Empty description="No history available" />
        ) : (
          <List
            dataSource={history}
            renderItem={(item) => (
              <List.Item
                style={{
                  padding: "16px",
                  marginBottom: "16px",
                  border: "1px solid #f0f0f0",
                  borderRadius: "8px",
                  background: "#fff",
                }}
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Text strong style={{ fontSize: "16px" }}>
                    {item.action}
                  </Text>
                  <Text>{item.content}</Text>
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    User: {item.user?.username || "Unknown"}
                  </Text>
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    Time: {new Date(item.timeCreate).toLocaleString()}
                  </Text>
                </Space>
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );
};

export default History;

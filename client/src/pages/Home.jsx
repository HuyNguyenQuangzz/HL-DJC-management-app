import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Card, Col, Row, Statistic, Typography, Spin, Alert } from "antd";
import {
  FileTextOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const Home = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    doing: 0,
    done: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const fetchStats = async () => {
      setLoading(true);
      try {
        // Mock data (replace with actual API call)
        const mockStats = {
          total: 25,
          approved: 10,
          rejected: 5,
          doing: 7,
          done: 3,
        };
        setStats(mockStats);

        // Example API call (uncomment and adjust for your backend)
        /*
        const response = await fetch(`/api/user/${user.id}/requests/stats`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch stats");
        const data = await response.json();
        setStats(data);
        */
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [isAuthenticated, user]);

  if (!isAuthenticated || !user) {
    return (
      <Alert
        message="Unauthorized"
        description="Please log in to view your request statistics."
        type="warning"
        showIcon
        style={{ margin: "16px" }}
      />
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        style={{ margin: "16px" }}
      />
    );
  }

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <Title level={2} style={{ marginBottom: "24px" }}>
        Welcome, {user.username}!
      </Title>
      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
      ) : (
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card>
              <Statistic
                title="Total Requests"
                value={stats.total}
                prefix={<FileTextOutlined />}
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card>
              <Statistic
                title="Approved"
                value={stats.approved}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: "#52c41a" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card>
              <Statistic
                title="Rejected"
                value={stats.rejected}
                prefix={<CloseCircleOutlined />}
                valueStyle={{ color: "#ff4d4f" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card>
              <Statistic
                title="In Progress"
                value={stats.doing}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: "#fa8c16" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card>
              <Statistic
                title="Completed"
                value={stats.done}
                prefix={<TrophyOutlined />}
                valueStyle={{ color: "#722ed1" }}
              />
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Home;

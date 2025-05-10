import { useEffect } from "react";
import { Statistic, Row, Col, List, notification } from "antd";
import useRequestStore from "../store/useRequestStore";

function Dashboard() {
  const { data, fetchData } = useRequestStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const pending = data.filter((item) => item.status === "pending").length;
  const doing = data.filter((item) => item.status === "approved").length;
  const completed = data.filter((item) => item.status === "completed").length;
  const recent = data.slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto pt-20 p-6">
      <Row gutter={16}>
        <Col span={8}>
          <div className="p-4 bg-white rounded-lg shadow">
            <Statistic title="Pending Requests" value={pending} />
          </div>
        </Col>
        <Col span={8}>
          <div className="p-4 bg-white rounded-lg shadow">
            <Statistic title="Doing Requests" value={doing} />
          </div>
        </Col>
        <Col span={8}>
          <div className="p-4 bg-white rounded-lg shadow">
            <Statistic title="Completed Requests" value={completed} />
          </div>
        </Col>
      </Row>
      <div className="mt-6 p-6 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Requests</h3>
        <List
          dataSource={recent}
          renderItem={(item) => (
            <List.Item>
              <div>
                <h4 className="text-md font-semibold">{item.company}</h4>
                <p>
                  <strong>Status:</strong> {item.status.toUpperCase()}
                </p>
                <p>
                  <strong>Amount:</strong> {item.amount}
                </p>
                <p>
                  <strong>Item Type:</strong> {item.itemType?.name || "Unknown"}
                </p>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default Dashboard;

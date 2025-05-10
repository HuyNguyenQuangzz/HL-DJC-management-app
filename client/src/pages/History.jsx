import { useEffect } from "react";
import { List } from "antd";
import useRequestStore from "../store/useRequestStore";

function History() {
  const { history, user, fetchHistory, fetchCurrentUser } = useRequestStore();
  const isAdmin = user?.level === "admin";

  useEffect(() => {
    fetchCurrentUser();
    if (isAdmin) {
      fetchHistory();
    }
  }, [fetchCurrentUser, fetchHistory, isAdmin]);

  if (!isAdmin) {
    return <div className="text-center p-6 pt-20">Admin access required</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pt-20">
      <h2 className="text-xl font-semibold mb-4">History</h2>
      <List
        dataSource={history}
        renderItem={(item) => (
          <List.Item className="p-4 mb-4 border rounded-lg bg-white">
            <div className="flex flex-col p-2 justify-center">
              <h3 className="text-lg font-semibold">{item.action}</h3>
              <p>{item.content}</p>
              <p className="text-sm text-gray-500">
                User: {item.user?.username || "Unknown"}
              </p>
              <p className="text-sm text-gray-500">
                Time: {new Date(item.timeCreate).toLocaleString()}
              </p>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}

export default History;

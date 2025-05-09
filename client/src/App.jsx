import { Layout, Tabs, Menu } from "antd";
import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import "./index.css";

const { Header, Content } = Layout;
const { TabPane } = Tabs;

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [activePage, setActivePage] = useState("dashboard");

  const handleLogin = (token) => {
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  if (!token)
    return (
      <>
        <Layout className="min-h-screen">
          <Header className="bg-blue-600 text-white flex items-center justify-between">
            <h1 className="text-2xl">Request Management</h1>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["login"]}
            >
              <Menu.Item key="login" onClick={() => setActivePage("login")}>
                Login
              </Menu.Item>
              <Menu.Item key="signup" onClick={() => setActivePage("signup")}>
                Signup
              </Menu.Item>
            </Menu>
          </Header>
          <Content className="p-6 bg-gray-100">
            {activePage === "login" && <Login onLogin={handleLogin} />}
            {activePage === "signup" && <Signup />}
          </Content>
        </Layout>
      </>
    );

  // if (!token) {
  //   return (<>
  //     <Layout className="min-h-screen">
  //       <Header className="bg-blue-600 text-white flex items-center">
  //         <h1 className="text-2xl">Request Management</h1>
  //       </Header
  //       <Content className="p-6 bg-gray-100">
  //         <Tabs defaultActiveKey="login" centered>
  //           <TabPane tab="Login" key="login">
  //             <Login onLogin={handleLogin} />
  //           </TabPane>
  //           <TabPane tab="Signup" key="signup">
  //             <Signup />
  //           </TabPane>
  //         </Tabs>
  //       </Content>
  //     </Layout>
  //   </>)
  // }

  return (
    <Layout className="min-h-screen">
      <Header className="bg-blue-600 text-white flex items-center justify-between">
        <h1 className="text-2xl">Request Management</h1>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[activePage]}
          onClick={(e) => setActivePage(e.key)}
          className="bg-blue-600"
        >
          <Menu.Item key="dashboard">Dashboard</Menu.Item>
          <Menu.Item key="profile">Profile</Menu.Item>
          <Menu.Item key="logout" onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="p-6 bg-gray-100">
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "profile" && <Profile />}
      </Content>
    </Layout>
  );
}

export default App;

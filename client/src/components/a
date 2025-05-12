import { useState } from "react";
import { Menu, Button, Drawer, Dropdown } from "antd";
import { MenuOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import useRequestStore from "../store/useRequestStore";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { user, fetchCurrentUser } = useRequestStore();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = user?.level === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("level");
    navigate("/login");
    window.location.reload();
  };

  const menuItems = [
    {
      key: "dashboard",
      label: isAdmin ? "Dashboard" : "Home",
      path: isAdmin ? "/dashboard" : "/home",
    },
    ...(isAdmin
      ? [
          { key: "item-types", label: "Item Types", path: "/item-types" },
          { key: "history", label: "History", path: "/history" },
        ]
      : []),
  ];

  const userMenu = (
    <Menu
      onClick={({ key }) => {
        if (key === "logout") handleLogout();
        else navigate(key);
      }}
    >
      <Menu.Item key="/profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  const currentPath =
    location.pathname.split("/")[1] || (isAdmin ? "dashboard" : "home");

  return (
    <nav className="fixed top-0 w-full z-50 bg-white text-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold">Request Management</h1>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Menu
              mode="horizontal"
              selectedKeys={[currentPath]}
              className="bg-blue-600 text-white"
              style={{ lineHeight: "64px" }}
            >
              {menuItems.map((item) => (
                <Menu.Item
                  key={item.key}
                  onClick={() => navigate(item.path)}
                  className="hover:text-blue-200 transition-colors"
                >
                  {item.label}
                </Menu.Item>
              ))}
            </Menu>
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <Button
                className="text-white hover:text-blue-200 transition-colors"
                type="link"
              >
                <UserOutlined /> {user?.username || "User"}
              </Button>
            </Dropdown>
          </div>
          <div className="md:hidden flex items-center">
            <Button
              type="link"
              icon={<MenuOutlined />}
              onClick={showDrawer}
              className="text-white hover:text-blue-200 transition-colors"
            />
          </div>
        </div>
      </div>
      <Drawer
        title="Menu"
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="vertical"
          selectedKeys={[currentPath]}
          className="bg-blue-600 text-white"
        >
          {menuItems.map((item) => (
            <Menu.Item
              key={item.key}
              onClick={() => {
                navigate(item.path);
                onClose();
              }}
              className="hover:text-blue-200 transition-colors"
            >
              {item.label}
            </Menu.Item>
          ))}
          <Menu.SubMenu key="user" title="User" icon={<UserOutlined />}>
            <Menu.Item
              key="/profile"
              onClick={() => {
                navigate("/profile");
                onClose();
              }}
            >
              Profile
            </Menu.Item>
            <Menu.Item
              key="logout"
              onClick={() => {
                handleLogout();
                onClose();
              }}
            >
              Logout
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Drawer>
    </nav>
  );
};

export default Navbar;

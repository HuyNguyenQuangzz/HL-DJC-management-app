import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, Dropdown, Drawer, Button, Avatar, Space } from "antd";
import {
  MenuOutlined,
  DownOutlined,
  CloseOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation

function Navbar() {
  const { isAuthenticated, userLevel, user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsDrawerOpen(false);
  };

  // Dropdown menu for user profile and logout
  const dropdownMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  // Menu items for desktop based on user role
  const desktopMenuItems =
    userLevel === "admin" ? (
      <Menu
        mode="horizontal"
        style={{ background: "transparent", border: "none", color: "white" }}
      >
        <Menu.Item key="dashboard">
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="item-types">
          <Link to="/item-types">Item Types</Link>
        </Menu.Item>
        <Menu.Item key="history">
          <Link to="/history">History</Link>
        </Menu.Item>
      </Menu>
    ) : (
      <Menu
        mode="horizontal"
        style={{ background: "transparent", border: "none", color: "white" }}
      >
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="create-request">
          <Link to="/create-request">Create Request</Link>
        </Menu.Item>
      </Menu>
    );

  // Menu items for mobile drawer based on user role
  const mobileMenuItems =
    userLevel === "admin" ? (
      <>
        <Menu.Item key="dashboard">
          <Link to="/dashboard" onClick={() => setIsDrawerOpen(false)}>
            Dashboard
          </Link>
        </Menu.Item>
        <Menu.Item key="history">
          <Link to="/history" onClick={() => setIsDrawerOpen(false)}>
            History
          </Link>
        </Menu.Item>
      </>
    ) : (
      <>
        <Menu.Item key="home">
          <Link to="/" onClick={() => setIsDrawerOpen(false)}>
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="create-request">
          <Link to="/create-request" onClick={() => setIsDrawerOpen(false)}>
            Create Request
          </Link>
        </Menu.Item>
      </>
    );

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        background: "white",
        color: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "12px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{ fontSize: "18px", fontWeight: "bold", color: "black" }}
        >
          Request App
        </Link>

        {user ? (
          <>
            {/* Desktop Menu */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
              className="hidden md:flex"
            >
              {desktopMenuItems}
              <Dropdown
                overlay={dropdownMenu}
                onOpenChange={(open) => setIsDropdownOpen(open)}
                open={isDropdownOpen}
              >
                <Button type="text" style={{ color: "black", padding: 0 }}>
                  <Space>
                    <Avatar icon={<UserOutlined />} />
                    {user.username}
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </div>

            {/* Mobile Menu Button */}
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setIsDrawerOpen(true)}
              style={{ color: "white", display: "none" }}
              className="md:hidden"
            />
          </>
        ) : (
          <Space>
            <Link to="/login">
              <Button type="text" style={{ color: "white" }}>
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button type="text" style={{ color: "white" }}>
                Signup
              </Button>
            </Link>
          </Space>
        )}
      </div>

      {/* Mobile Drawer */}
      <Drawer
        style={{ background: "blue", color: "black" }}
        title="Menu"
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        closeIcon={<CloseOutlined />}
        width={250}
      >
        <Menu mode="vertical">
          {mobileMenuItems}
          <Menu.Item key="profile">
            <Link to="/profile" onClick={() => setIsDrawerOpen(false)}>
              Profile
            </Link>
          </Menu.Item>
          <Menu.Item key="logout" onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Drawer>
    </nav>
  );
}

export default Navbar;

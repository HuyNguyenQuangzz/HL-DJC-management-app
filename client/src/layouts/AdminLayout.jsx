import React from "react";
import { Layout, Menu, Table } from "antd";
import { dataSource, itemTypeSource, historySource } from "../data/mockData";

const { Header, Content, Sider } = Layout;

const AdminLayout = () => (
  <Layout className="min-h-screen">
    <Sider>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1">Data</Menu.Item>
        <Menu.Item key="2">Item Types</Menu.Item>
        <Menu.Item key="3">History</Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header className="bg-white p-0">
        <h1 className="text-2xl p-4">Admin Dashboard</h1>
      </Header>
      <Content className="p-4">
        <h2 className="text-xl mb-2">Data</h2>
        <Table
          dataSource={dataSource}
          columns={[
            { title: "ID", dataIndex: "id" },
            { title: "Item Type", dataIndex: "itemType" },
            { title: "Company", dataIndex: "company" },
            { title: "Amount", dataIndex: "amount" },
            { title: "Note", dataIndex: "note" },
            { title: "User", dataIndex: "user" },
            { title: "Status", dataIndex: "status" },
          ]}
        />
        <h2 className="text-xl mb-2 mt-4">Item Types</h2>
        <Table
          dataSource={itemTypeSource}
          columns={[
            { title: "ID", dataIndex: "id" },
            { title: "Name", dataIndex: "name" },
            { title: "User", dataIndex: "user" },
          ]}
        />
        <h2 className="text-xl mb-2 mt-4">History</h2>
        <Table
          dataSource={historySource}
          columns={[
            { title: "ID", dataIndex: "id" },
            { title: "Action", dataIndex: "action" },
            { title: "Content", dataIndex: "content" },
            { title: "User", dataIndex: "user" },
          ]}
        />
      </Content>
    </Layout>
  </Layout>
);

export default AdminLayout;

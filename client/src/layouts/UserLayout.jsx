import React from 'react';
import { Table } from 'antd';
import { dataSource } from '../data/mockData';

const UserLayout = () => (
  <div className="p-4">
    <h1 className="text-2xl mb-4">User Dashboard</h1>
    <Table
      dataSource={dataSource}
      columns={[
        { title: 'ID', dataIndex: 'id' },
        { title: 'Item Type', dataIndex: 'itemType' },
        { title: 'Company', dataIndex: 'company' },
        { title: 'Amount', dataIndex: 'amount' },
      ]}
    />
  </div>
);

export default UserLayout;
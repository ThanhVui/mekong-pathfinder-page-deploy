import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Space, 
  Typography, 
  Tabs
} from 'antd';
import { 
  DownloadOutlined, 
  MessageOutlined
} from '@ant-design/icons';
import DownloadStats from '../../components/DownloadStats';
import FeedbackStats from '../../components/FeedbackStats';

const { Title } = Typography;

const AdminDashboard: React.FC = () => {
  const tabItems = [
    {
      key: 'downloads',
      label: (
        <span>
          <DownloadOutlined />
          Thống kê Downloads
        </span>
      ),
      children: <DownloadStats />
    },
    {
      key: 'feedbacks',
      label: (
        <span>
          <MessageOutlined />
          Thống kê Góp ý
        </span>
      ),
      children: <FeedbackStats />
    }
  ];

  return (
    <div style={{ background: 'rgb(52, 52, 139)', minHeight: '100vh' }}>
      <div style={{ padding: '24px' }}>
        <Title level={1} style={{ textAlign: 'center', marginBottom: '30px', color: '#fff' }}>
          📊 Admin Dashboard
        </Title>
        
        <Tabs
          defaultActiveKey="downloads"
          items={tabItems}
          size="large"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '24px',
            backdropFilter: 'blur(10px)'
          }}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;

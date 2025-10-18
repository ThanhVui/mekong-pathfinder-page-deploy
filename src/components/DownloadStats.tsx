import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Space, Typography, message, Modal } from 'antd';
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { getDownloadStats, getRecentDownloads, exportDownloadData } from '../utils/downloadTracker';

const { Title, Text } = Typography;

interface DownloadRecord {
  id: number;
  name: string;
  email: string;
  downloadTime: string;
}

const DownloadStats: React.FC = () => {
  const [stats, setStats] = useState({ totalDownloads: 0, lastUpdated: '' });
  const [recentDownloads, setRecentDownloads] = useState<DownloadRecord[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const downloadStats = getDownloadStats();
    const recent = getRecentDownloads(20);
    
    setStats(downloadStats);
    setRecentDownloads(recent);
  };

  const handleExportData = () => {
    try {
      const data = exportDownloadData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `download-stats-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      message.success('Dữ liệu đã được xuất thành công!');
    } catch (error) {
      message.error('Có lỗi khi xuất dữ liệu!');
    }
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: 60,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Thời gian tải',
      dataIndex: 'downloadTime',
      key: 'downloadTime',
      render: (time: string) => new Date(time).toLocaleString('vi-VN'),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Card title="Thống kê Downloads" style={{ marginBottom: '20px' }}>
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Title level={3} style={{ margin: 0, color: '#52c41a' }}>
                {stats.totalDownloads} lượt tải
              </Title>
              <Text type="secondary">
                Cập nhật lần cuối: {stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleString('vi-VN') : 'Chưa có dữ liệu'}
              </Text>
            </div>
            <Space>
              <Button 
                icon={<EyeOutlined />} 
                onClick={() => setModalVisible(true)}
              >
                Xem chi tiết
              </Button>
              <Button 
                type="primary" 
                icon={<DownloadOutlined />} 
                onClick={handleExportData}
              >
                Xuất dữ liệu
              </Button>
            </Space>
          </div>
        </Space>
      </Card>

      <Modal
        title="Chi tiết Downloads"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
      >
        <Table
          dataSource={recentDownloads}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ y: 400 }}
        />
      </Modal>
    </div>
  );
};

export default DownloadStats;

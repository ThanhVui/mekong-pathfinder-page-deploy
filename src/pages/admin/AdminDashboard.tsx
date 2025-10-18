import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Space, 
  Typography, 
  message, 
  Modal, 
  Row, 
  Col, 
  Statistic,
  Tag,
  Divider,
  Alert
} from 'antd';
import { 
  DownloadOutlined, 
  EyeOutlined, 
  ReloadOutlined,
  DeleteOutlined,
  ExportOutlined,
  UserOutlined,
  MailOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { getDownloadStats, getRecentDownloads, exportDownloadData } from '../../utils/downloadTracker';

const { Title, Text } = Typography;

interface DownloadRecord {
  id: number;
  name: string;
  email: string;
  downloadTime: string;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({ totalDownloads: 0, lastUpdated: '' });
  const [recentDownloads, setRecentDownloads] = useState<DownloadRecord[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    setLoading(true);
    try {
      const downloadStats = getDownloadStats();
      const recent = getRecentDownloads(50); // Lấy 50 records gần nhất
      
      setStats(downloadStats);
      setRecentDownloads(recent);
      
      console.log('Download Stats:', downloadStats);
      console.log('Recent Downloads:', recent);
    } catch (error) {
      console.error('Error loading stats:', error);
      message.error('Có lỗi khi tải dữ liệu!');
    } finally {
      setLoading(false);
    }
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

  const handleClearData = () => {
    Modal.confirm({
      title: 'Xác nhận xóa dữ liệu',
      content: 'Bạn có chắc chắn muốn xóa tất cả dữ liệu download? Hành động này không thể hoàn tác.',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        try {
          localStorage.removeItem('mekong_pathfinder_downloads');
          loadStats();
          message.success('Đã xóa tất cả dữ liệu!');
        } catch (error) {
          message.error('Có lỗi khi xóa dữ liệu!');
        }
      },
    });
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
      render: (text: string) => (
        <Space>
          <UserOutlined style={{ color: '#1890ff' }} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text: string) => (
        <Space>
          <MailOutlined style={{ color: '#52c41a' }} />
          <Text code>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Thời gian tải',
      dataIndex: 'downloadTime',
      key: 'downloadTime',
      render: (time: string) => (
        <Space>
          <ClockCircleOutlined style={{ color: '#faad14' }} />
          <Text>{new Date(time).toLocaleString('vi-VN')}</Text>
        </Space>
      ),
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: number) => <Tag color="blue">{id}</Tag>,
    },
  ];

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
          📊 Admin Dashboard - Thống kê Downloads
        </Title>

        {/* Thống kê tổng quan */}
        <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Tổng lượt tải"
                value={stats.totalDownloads}
                valueStyle={{ color: '#52c41a' }}
                prefix={<DownloadOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Downloads hôm nay"
                value={recentDownloads.filter(d => {
                  const today = new Date().toDateString();
                  const downloadDate = new Date(d.downloadTime).toDateString();
                  return today === downloadDate;
                }).length}
                valueStyle={{ color: '#1890ff' }}
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Cập nhật cuối"
                value={stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleDateString('vi-VN') : 'Chưa có'}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Actions */}
        <Card style={{ marginBottom: '20px' }}>
          <Space wrap>
            <Button 
              type="primary" 
              icon={<ReloadOutlined />} 
              onClick={loadStats}
              loading={loading}
            >
              Làm mới dữ liệu
            </Button>
            <Button 
              icon={<EyeOutlined />} 
              onClick={() => setModalVisible(true)}
            >
              Xem chi tiết ({recentDownloads.length} records)
            </Button>
            <Button 
              type="default" 
              icon={<ExportOutlined />} 
              onClick={handleExportData}
            >
              Xuất dữ liệu JSON
            </Button>
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              onClick={handleClearData}
            >
              Xóa tất cả dữ liệu
            </Button>
          </Space>
        </Card>

        {/* Thông tin localStorage */}
        <Card title="Thông tin LocalStorage" style={{ marginBottom: '20px' }}>
          <Alert
            message="Dữ liệu được lưu trong Browser LocalStorage"
            description={
              <div>
                <Text>Key: <Text code>mekong_pathfinder_downloads</Text></Text><br/>
                <Text>Để xem trực tiếp: F12 → Application → Local Storage → Tìm key trên</Text><br/>
                <Text>Hoặc chạy trong Console: <Text code>localStorage.getItem('mekong_pathfinder_downloads')</Text></Text>
              </div>
            }
            type="info"
            showIcon
          />
        </Card>

        {/* Bảng chi tiết */}
        <Modal
          title={`Chi tiết Downloads (${recentDownloads.length} records)`}
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
          width={1000}
        >
          <Table
            dataSource={recentDownloads}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10, showSizeChanger: true }}
            scroll={{ y: 500 }}
            size="small"
          />
        </Modal>
      </div>
    </div>
  );
};

export default AdminDashboard;

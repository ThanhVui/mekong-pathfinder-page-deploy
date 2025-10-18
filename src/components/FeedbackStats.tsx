import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Button, 
  Table, 
  Space, 
  Typography, 
  Statistic, 
  Row, 
  Col, 
  Tag, 
  Avatar,
  Rate,
  Progress,
  Alert,
  Modal,
  message
} from 'antd';
import { 
  MessageOutlined, 
  StarOutlined, 
  DownloadOutlined, 
  DeleteOutlined,
  ReloadOutlined,
  BugOutlined,
  BulbOutlined,
  LikeOutlined,
  CommentOutlined
} from '@ant-design/icons';
import { 
  getFeedbackStats, 
  getRecentFeedbacks, 
  exportFeedbackData, 
  clearFeedbackData,
  updateFeedbackLikes,
  FeedbackData 
} from '../utils/feedbackTracker';

const { Title, Text } = Typography;

const FeedbackStats: React.FC = () => {
  const [stats, setStats] = useState(getFeedbackStats());
  const [loading, setLoading] = useState(false);

  const refreshStats = () => {
    setLoading(true);
    setTimeout(() => {
      setStats(getFeedbackStats());
      setLoading(false);
    }, 500);
  };

  const handleExport = () => {
    try {
      const data = exportFeedbackData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `feedback-stats-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      message.success('Đã xuất dữ liệu thành công!');
    } catch (error) {
      message.error('Lỗi khi xuất dữ liệu!');
    }
  };

  const handleClearData = () => {
    Modal.confirm({
      title: 'Xác nhận xóa dữ liệu',
      content: 'Bạn có chắc chắn muốn xóa tất cả dữ liệu góp ý? Hành động này không thể hoàn tác!',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: () => {
        clearFeedbackData();
        refreshStats();
        message.success('Đã xóa tất cả dữ liệu!');
      }
    });
  };

  const handleLike = (feedbackId: string) => {
    updateFeedbackLikes(feedbackId, 1);
    refreshStats();
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'bug': return <BugOutlined style={{ color: '#ff4d4f' }} />;
      case 'feature': return <BulbOutlined style={{ color: '#52c41a' }} />;
      case 'improvement': return <LikeOutlined style={{ color: '#1890ff' }} />;
      default: return <CommentOutlined style={{ color: '#722ed1' }} />;
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'bug': return 'Báo lỗi';
      case 'feature': return 'Tính năng';
      case 'improvement': return 'Cải thiện';
      default: return 'Khác';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'bug': return 'red';
      case 'feature': return 'green';
      case 'improvement': return 'blue';
      default: return 'purple';
    }
  };

  const columns = [
    {
      title: 'Người gửi',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: FeedbackData) => (
        <Space>
          <Avatar 
            src={record.avatar} 
            icon={<MessageOutlined />}
            size="small"
          />
          <div>
            <div style={{ fontWeight: 'bold', color: '#fff' }}>{text}</div>
            <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
              {record.email}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Loại',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => (
        <Tag color={getCategoryColor(category)} icon={getCategoryIcon(category)}>
          {getCategoryText(category)}
        </Tag>
      ),
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => (
        <Rate disabled value={rating} style={{ fontSize: '14px' }} />
      ),
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (title: string) => (
        <Text style={{ color: '#fff' }}>{title}</Text>
      ),
    },
    {
      title: 'Likes',
      dataIndex: 'likes',
      key: 'likes',
      render: (likes: number, record: FeedbackData) => (
        <Button 
          type="text" 
          icon={<LikeOutlined />} 
          onClick={() => handleLike(record.id)}
          style={{ color: '#1890ff' }}
        >
          {likes}
        </Button>
      ),
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp: string) => (
        <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          {new Date(timestamp).toLocaleDateString('vi-VN')}
        </Text>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', background: 'rgb(52, 52, 139)', minHeight: '100vh' }}>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        {/* Header */}
        <Card style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)'
        }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={2} style={{ margin: 0, color: '#fff' }}>
                <MessageOutlined style={{ color: '#1890ff', marginRight: 12 }} />
                Thống kê Góp ý
              </Title>
              <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Quản lý và theo dõi tất cả góp ý từ người dùng
              </Text>
            </Col>
            <Col>
              <Space>
                <Button 
                  icon={<ReloadOutlined />} 
                  onClick={refreshStats}
                  loading={loading}
                >
                  Làm mới
                </Button>
                <Button 
                  type="primary" 
                  icon={<DownloadOutlined />} 
                  onClick={handleExport}
                >
                  Xuất dữ liệu
                </Button>
                <Button 
                  danger 
                  icon={<DeleteOutlined />} 
                  onClick={handleClearData}
                >
                  Xóa tất cả
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Statistics */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)'
            }}>
              <Statistic
                title={<span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Tổng góp ý</span>}
                value={stats.totalFeedbacks}
                prefix={<MessageOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)'
            }}>
              <Statistic
                title={<span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Đánh giá TB</span>}
                value={stats.averageRating.toFixed(1)}
                prefix={<StarOutlined />}
                valueStyle={{ color: '#faad14' }}
                suffix="/ 5"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)'
            }}>
              <Statistic
                title={<span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Góp ý tích cực</span>}
                value={Math.round((stats.recentFeedbacks.filter(f => f.rating >= 4).length / Math.max(stats.totalFeedbacks, 1)) * 100)}
                valueStyle={{ color: '#52c41a' }}
                suffix="%"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)'
            }}>
              <Statistic
                title={<span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Tổng likes</span>}
                value={stats.recentFeedbacks.reduce((sum, f) => sum + f.likes, 0)}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Category Statistics */}
        <Card 
          title="Thống kê theo loại"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            backdropFilter: 'blur(10px)'
          }}
          headStyle={{
            background: 'transparent',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#fff'
          }}
        >
          <Row gutter={[12, 12]}>
            {Object.entries(stats.categoryStats).map(([category, count]) => (
              <Col xs={24} sm={12} md={6} key={category}>
                <Card 
                  size="small"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Space direction="vertical" align="center" style={{ width: '100%', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px' }}>{getCategoryIcon(category)}</div>
                    <Title level={4} style={{ margin: 0, color: '#fff' }}>{count}</Title>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{getCategoryText(category)}</Text>
                    <Progress 
                      percent={Math.round((count / Math.max(stats.totalFeedbacks, 1)) * 100)} 
                      size="small"
                      strokeColor={getCategoryColor(category) === 'red' ? '#ff4d4f' : 
                                  getCategoryColor(category) === 'green' ? '#52c41a' :
                                  getCategoryColor(category) === 'blue' ? '#1890ff' : '#722ed1'}
                    />
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>

        {/* Recent Feedbacks Table */}
        <Card 
          title="Góp ý gần đây"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            backdropFilter: 'blur(10px)'
          }}
          headStyle={{
            background: 'transparent',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#fff'
          }}
        >
          {stats.recentFeedbacks.length === 0 ? (
            <Alert
              message="Chưa có góp ý nào"
              description="Chưa có góp ý nào được gửi từ người dùng."
              type="info"
              showIcon
            />
          ) : (
            <Table
              columns={columns}
              dataSource={stats.recentFeedbacks}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => 
                  `${range[0]}-${range[1]} của ${total} góp ý`,
              }}
              style={{
                background: 'transparent'
              }}
            />
          )}
        </Card>
      </Space>
    </div>
  );
};

export default FeedbackStats;

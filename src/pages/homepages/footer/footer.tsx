import React, { useState } from 'react';
import { 
  Layout, 
  Row, 
  Col, 
  Typography, 
  Space, 
  Button, 
  Input, 
  Divider,
  Card,
  List,
  Avatar,
  Tooltip,
  message
} from 'antd';
import {
  GlobalOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  LinkedinOutlined,
  GithubOutlined,
  SendOutlined,
  HeartOutlined,
  ArrowUpOutlined,
  DownloadOutlined,
  MessageOutlined,
  BookOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  SafetyOutlined,
  TeamOutlined,
  RocketOutlined,
  TikTokOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const HomePageFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNewsletterSubmit = async () => {
    if (!email) {
      message.warning('Vui lòng nhập email!');
      return;
    }
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      message.success('Đăng ký nhận tin thành công!');
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Trang chủ', path: '/', icon: <HomeOutlined /> },
    { label: 'Tải ứng dụng', path: '/apk-download', icon: <DownloadOutlined /> },
    { label: 'Hướng dẫn', path: '/guide', icon: <BookOutlined /> },
    { label: 'Góp ý', path: '/feedback', icon: <MessageOutlined /> }
  ];

  const features = [
    { label: 'Bản đồ thông minh', icon: <EnvironmentOutlined /> },
    { label: 'Dự báo thời tiết', icon: <InfoCircleOutlined /> },
    { label: 'Cảnh báo lũ lụt', icon: <SafetyOutlined /> },
    { label: 'Cộng đồng', icon: <TeamOutlined /> }
  ];

  const supportLinks = [
    { label: 'Trung tâm trợ giúp', path: '/help' },
    { label: 'Liên hệ hỗ trợ', path: '/contact' },
    { label: 'Báo cáo lỗi', path: '/bug-report' },
    { label: 'Đề xuất tính năng', path: '/feature-request' }
  ];

  const legalLinks = [
    { label: 'Điều khoản sử dụng', path: '/terms' },
    { label: 'Chính sách bảo mật', path: '/privacy' },
    { label: 'Cookie Policy', path: '/cookies' },
    { label: 'Giấy phép', path: '/license' }
  ];

  const socialLinks = [
    { 
      icon: <FacebookOutlined />, 
      label: 'Facebook', 
      url: 'https://www.facebook.com/profile.php?id=61580964124258',
      color: '#1877f2'
    },
    { 
      icon: <TikTokOutlined />, 
      label: 'Tiktok', 
      url: 'https://www.tiktok.com/@mekongpathfinder',
      color: '#1da1f2'
    }
  ];

  return (
    <>
      {/* Main Footer */}
      <Footer
        style={{
          background: 'rgb(52, 52, 139)',
          color: '#fff',
          padding: '60px 0 20px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          {/* Top Section */}
          <Row gutter={[32, 32]} style={{ marginBottom: '40px' }}>
            {/* Company Info */}
            <Col xs={24} md={8}>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <Space size={16}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <GlobalOutlined style={{ fontSize: '28px', color: '#fff' }} />
                  </div>
                  <div>
                    <Title level={3} style={{ color: '#fff', margin: 0 }}>
                      Mekong Pathfinder
                    </Title>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Smart Navigation Platform
                    </Text>
                  </div>
                </Space>
                
                <Paragraph style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '15px', lineHeight: 1.6 }}>
                  Nền tảng điều hướng thông minh cho khu vực Đồng bằng sông Cửu Long. 
                  Cung cấp thông tin thời tiết, giao thông và cảnh báo lũ lụt thời gian thực.
                </Paragraph>

                {/* Contact Info */}
                <Space direction="vertical" size={8}>
                  <Space>
                    <PhoneOutlined style={{ color: '#52c41a' }} />
                    <Text style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                      Hotline: 1900-xxxx
                    </Text>
                  </Space>
                  <Space>
                    <MailOutlined style={{ color: '#1890ff' }} />
                    <Text style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                      support@mekongpathfinder.com
                    </Text>
                  </Space>
                  <Space>
                    <EnvironmentOutlined style={{ color: '#faad14' }} />
                    <Text style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                      TP. Cần Thơ, Việt Nam
                    </Text>
                  </Space>
                </Space>
              </Space>
            </Col>


            {/* Features */}
            <Col xs={24} sm={12} md={4}>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <Title level={5} style={{ color: '#fff', margin: 0 }}>
                  Tính năng
                </Title>
                <List
                  dataSource={features}
                  renderItem={item => (
                    <List.Item style={{ padding: '4px 0', border: 'none' }}>
                      <Space size={8}>
                        <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                          {item.icon}
                        </div>
                        <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                          {item.label}
                        </Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </Space>
            </Col>

            {/* Admin Section */}
            <Col xs={24} sm={12} md={4}>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <Title level={5} style={{ color: '#fff', margin: 0 }}>
                  Admin
                </Title>
                <Button
                  type="link"
                  onClick={() => navigate('/admin')}
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    padding: '4px 0',
                    height: 'auto',
                    textAlign: 'left',
                    fontWeight: '400'
                  }}
                >
                  📊 Xem thống kê downloads
                </Button>
              </Space>
            </Col>

            {/* Newsletter */}
            <Col xs={24} md={8}>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <Title level={5} style={{ color: '#fff', margin: 0 }}>
                  Nhận tin tức mới
                </Title>
                <Paragraph style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
                  Đăng ký để nhận thông tin cập nhật và tin tức mới nhất từ chúng tôi.
                </Paragraph>
                
                <Space.Compact style={{ width: '100%' }}>
                  <Input
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: '#fff',
                      borderRadius: '8px 0 0 8px'
                    }}
                  />
                  <Button
                    type="primary"
                    icon={<SendOutlined />}
                    loading={loading}
                    onClick={handleNewsletterSubmit}
                    style={{
                      background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
                      border: 'none',
                      borderRadius: '0 8px 8px 0',
                      height: '40px'
                    }}
                  >
                    Đăng ký
                  </Button>
                </Space.Compact>
              </Space>
            </Col>
          </Row>

          {/* Social Links */}
          <Row justify="center" style={{ marginBottom: '30px' }}>
            <Col>
              <Space size={16}>
                {socialLinks.map((social, index) => (
                  <Tooltip key={index} title={social.label}>
                    <Button
                      type="text"
                      icon={social.icon}
                      onClick={() => window.open(social.url, '_blank')}
                      style={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#fff',
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = social.color;
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = `0 4px 12px ${social.color}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </Tooltip>
                ))}
              </Space>
            </Col>
          </Row>

          {/* Bottom Section */}
          <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.2)', margin: '30px 0' }} />
          
          <Row justify="space-between" align="middle">
            <Col xs={24} md={12}>
              <Space direction="vertical" size={8}>
                <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  © 2024 Mekong Pathfinder. Tất cả quyền được bảo lưu.
                </Text>
                <Space wrap>
                  {legalLinks.map((link, index) => (
                    <Button
                      key={index}
                      type="link"
                      onClick={() => navigate(link.path)}
                      style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        padding: '0 8px',
                        height: 'auto',
                        fontSize: '12px'
                      }}
                    >
                      {link.label}
                    </Button>
                  ))}
                </Space>
              </Space>
            </Col>
            
            <Col xs={24} md={12} style={{ textAlign: 'right' }}>
              <Space>
                <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
                  Được phát triển với
                </Text>
                <HeartOutlined style={{ color: '#ff4d4f', fontSize: '16px' }} />
                <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
                  tại Việt Nam
                </Text>
              </Space>
            </Col>
          </Row>
        </div>
      </Footer>

      {/* Back to Top Button */}
      <Button
        type="primary"
        shape="circle"
        icon={<ArrowUpOutlined />}
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '50px',
          height: '50px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
          zIndex: 1000,
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      />
    </>
  );
};

export default HomePageFooter;

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
  message,
  Tag
} from 'antd';
import { useColorTheme } from '../../../context/ColorThemeContext';
import {
  GlobalOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
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
  RocketOutlined
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
    { label: 'Cảnh báo ngập lụt AI', icon: <SafetyOutlined /> },
    { label: 'Dự báo kẹt xe thời gian thực', icon: <InfoCircleOutlined /> },
    { label: 'Dịch vụ cứu hộ xe', icon: <TeamOutlined /> },
    { label: 'Bản đồ số tích hợp camera', icon: <EnvironmentOutlined /> }
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
      icon: <img src="https://img.icons8.com/color/48/facebook-new.png" alt="Facebook" style={{ width: '24px', height: '24px' }} />, 
      label: 'Facebook', 
      url: 'https://www.facebook.com/profile.php?id=61580964124258',
      color: '#1877f2'
    },
    { 
      icon: <img src="https://img.icons8.com/color/48/tiktok--v1.png" alt="TikTok" style={{ width: '24px', height: '24px' }} />, 
      label: 'Tiktok', 
      url: 'https://www.tiktok.com/@mekongpathfinder',
      color: '#1da1f2'
    }
  ];

  return (
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .footer-flex-container {
              flex-direction: column !important;
              align-items: center !important;
              text-align: center !important;
            }
            .footer-flex-item {
              min-width: 100% !important;
              flex: none !important;
            }
            .footer-bottom-right {
              text-align: center !important;
            }
          }
        `}
      </style>
      
      {/* Main Footer */}
      <Footer
        style={{
          background: '#001f44',
          color: '#fff',
          padding: '60px 0 20px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          {/* Top Section */}
          <div className="footer-flex-container" style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            gap: '32px',
            marginBottom: '40px'
          }}>
            {/* Company Info */}
            <div className="footer-flex-item" style={{ flex: '1', minWidth: '300px' }}>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <Space size={16}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'rgba(3, 68, 214, 0.3)',
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
                    <Text style={{ color: '#c5e2ff' }}>
                      Smart Navigation Platform
                    </Text>
                  </div>
                </Space>
                
                <Paragraph style={{ color: '#c5e2ff', fontSize: '16px', lineHeight: 1.6 }}>
                  Ứng dụng di động thông minh dành riêng cho thành phố Cần Thơ, tích hợp AI, 
                  bản đồ số và dữ liệu camera giao thông để cảnh báo ngập lụt và kẹt xe thời gian thực.
                </Paragraph>

                {/* Contact Info */}
                <Space direction="vertical" size={8}>
                  <Space>
                    <PhoneOutlined style={{ color: '#52c41a' }} />
                    <Text style={{ color: '#c5e2ff' }}>
                      Hotline: 0922306391
                    </Text>
                  </Space>
                  <Space>
                    <MailOutlined style={{ color: '#1890ff' }} />
                    <Text style={{ color: '#c5e2ff' }}>
                      quynhhnnce182514@fpt.edu.vn
                    </Text>
                  </Space>
                  <Space>
                    <EnvironmentOutlined style={{ color: '#faad14' }} />
                    <Text style={{ color: '#c5e2ff' }}>
                      TP. Cần Thơ, Đồng bằng sông Cửu Long
                    </Text>
                  </Space>
                </Space>
              </Space>
            </div>

            {/* Features */}
            <div className="footer-flex-item" style={{ flex: '0 0 auto', minWidth: '200px' }}>
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
                        <Text style={{ color: '#c5e2ff' }}>
                          {item.label}
                        </Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </Space>
            </div>

            {/* Newsletter */}
            <div className="footer-flex-item" style={{ flex: '1', minWidth: '300px' }}>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <Title level={5} style={{ color: '#fff', margin: 0 }}>
                  Nhận tin tức mới
                </Title>
                <Paragraph style={{ color: '#c5e2ff', margin: 0 }}>
                  Đăng ký để nhận thông tin cập nhật và tin tức mới nhất từ chúng tôi.
                </Paragraph>
                
                <Space.Compact style={{ width: '100%' }}>
                  <Input
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      background: 'rgba(3, 68, 214, 0.2)',
                      border: '1px solid rgba(131, 181, 252, 0.3)',
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
                      background: 'linear-gradient(135deg, #0344d6 0%, #377aef 100%)',
                      border: 'none',
                      borderRadius: '0 8px 8px 0',
                      height: '40px'
                    }}
                  >
                    Đăng ký
                  </Button>
                </Space.Compact>
              </Space>
            </div>
          </div>

          {/* Project Information Section */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            gap: '32px',
            marginBottom: '40px', 
            padding: '30px', 
            background: 'rgba(3, 68, 214, 0.1)', 
            borderRadius: '16px', 
            border: '1px solid rgba(131, 181, 252, 0.2)' 
          }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <Title level={4} style={{ color: '#fff', margin: 0, textAlign: 'center' }}>
                  🏆 Mekong Tech - Business Challenge 2025
                </Title>
                <Paragraph style={{ color: '#c5e2ff', fontSize: '16px', lineHeight: 1.6, textAlign: 'center', margin: 0 }}>
                  <strong>Đội dự thi:</strong> Mekong Pathfinders (5 thành viên)<br/>
                  <strong>Trưởng nhóm:</strong> Huỳnh Ngọc Như Quỳnh<br/>
                  <strong>Khóa:</strong> K18 - FPT University<br/>
                  <strong>Chủ đề:</strong> Khởi nghiệp dựa trên công nghệ vì phát triển bền vững vùng Đồng bằng sông Cửu Long
                </Paragraph>
              </Space>
            </div>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <Title level={4} style={{ color: '#fff', margin: 0, textAlign: 'center' }}>
                  🚀 Công nghệ tiên tiến
                </Title>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                  {['AI & Computer Vision', 'GIS & Bản đồ số', 'Big Data Analytics', 'Cloud Computing', 'Crowdsourcing', 'IoT Integration'].map((tech, index) => (
                    <Tag key={index} color="blue" style={{ 
                      background: 'rgba(3, 68, 214, 0.2)', 
                      border: '1px solid rgba(131, 181, 252, 0.3)',
                      color: '#c5e2ff',
                      borderRadius: '20px',
                      padding: '4px 12px'
                    }}>
                      {tech}
                    </Tag>
                  ))}
                </div>
              </Space>
            </div>
          </div>

          {/* Social Links */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            marginBottom: '30px' 
          }}>
            <Space size={16}>
                {socialLinks.map((social, index) => (
                  <Tooltip key={index} title={social.label}>
                    <Button
                      type="text"
                      onClick={() => window.open(social.url, '_blank')}
                      style={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        background: 'rgba(3, 68, 214, 0.2)',
                        border: '1px solid rgba(131, 181, 252, 0.3)',
                        color: '#fff',
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        padding: '0'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = social.color;
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = `0 4px 12px ${social.color}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(3, 68, 214, 0.3)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {social.icon}
                    </Button>
                  </Tooltip>
                ))}
            </Space>
          </div>

          {/* Bottom Section */}
          <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.2)', margin: '30px 0' }} />
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <Space direction="vertical" size={8}>
                        <Text style={{ color: '#c5e2ff' }}>
                  © 2024 Mekong Pathfinder. Dự án tham gia Mekong Tech - Business Challenge 2025.
                </Text>
                <Text style={{ color: 'rgba(197, 226, 255, 0.7)', fontSize: '12px' }}>
                  Chủ đề: Khởi nghiệp dựa trên công nghệ vì phát triển bền vững vùng Đồng bằng sông Cửu Long
                </Text>
                <Space wrap>
                  {legalLinks.map((link, index) => (
                    <Button
                      key={index}
                      type="link"
                      onClick={() => navigate(link.path)}
                      style={{
                        color: '#c5e2ff',
                        padding: '0 8px',
                        height: 'auto',
                        fontSize: '14px'
                      }}
                    >
                      {link.label}
                    </Button>
                  ))}
                </Space>
              </Space>
            </div>
            
            <div className="footer-bottom-right" style={{ flex: '0 0 auto' }}>
              <Space direction="vertical" size={4} style={{ textAlign: 'right' }}>
                <Space>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
                    Được phát triển với
                  </Text>
                  <HeartOutlined style={{ color: '#ff4d4f', fontSize: '16px' }} />
                  <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
                    tại Việt Nam
                  </Text>
                </Space>
                <Text style={{ color: 'rgba(197, 226, 255, 0.6)', fontSize: '12px' }}>
                  Team: Mekong Pathfinders | Trưởng nhóm: Huỳnh Ngọc Như Quỳnh
                </Text>
              </Space>
            </div>
          </div>
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
          background: 'linear-gradient(135deg, #0344d6 0%, #377aef 100%)',
          border: 'none',
          boxShadow: '0 8px 25px rgba(3, 68, 214, 0.4)',
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

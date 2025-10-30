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
import { useLanguage } from '../../../context/LanguageContext';
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
  const { t } = useLanguage();

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
    { label: t('footer.quick.home'), path: '/', icon: <HomeOutlined /> },
    { label: t('footer.quick.download'), path: '/apk-download', icon: <DownloadOutlined /> },
    { label: t('footer.quick.guide'), path: '/guide', icon: <BookOutlined /> },
    { label: t('footer.quick.feedback'), path: '/feedback', icon: <MessageOutlined /> }
  ];

  const features = [
    { label: t('footer.features.ai'), icon: <SafetyOutlined /> },
    { label: t('footer.features.traffic'), icon: <InfoCircleOutlined /> },
    { label: t('footer.features.rescue'), icon: <TeamOutlined /> },
    { label: t('footer.features.camera'), icon: <EnvironmentOutlined /> }
  ];

  const supportLinks = [
    { label: t('footer.support.center'), path: '/help' },
    { label: t('footer.support.contact'), path: '/contact' },
    { label: t('footer.support.bug'), path: '/bug-report' },
    { label: t('footer.support.feature'), path: '/feature-request' }
  ];

  const legalLinks = [
    { label: t('footer.legal.terms'), path: '/terms' },
    { label: t('footer.legal.privacy'), path: '/privacy' },
    { label: t('footer.legal.cookies'), path: '/cookies' },
    { label: t('footer.legal.license'), path: '/license' }
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
              justify-content: center !important;
            }
            .footer-flex-item {
              min-width: 100% !important;
              flex: none !important;
              justify-content: center !important;
              align-items: center !important;
              text-align: center !important;
              margin-left: auto !important;
              margin-right: auto !important;
              box-sizing: border-box !important;
            }
            .footer-bottom-right {
              text-align: center !important;
              align-items: center !important;
              justify-content: center !important;
              margin-left: auto !important;
              margin-right: auto !important;
            }
            .ant-space, .ant-typography, .ant-typography-title, .ant-typography-paragraph, .ant-typography-text {
              text-align: center !important;
              justify-content: center !important;
              word-break: break-word !important;
              white-space: normal !important;
            }
            .footer-social-block {
              justify-content: center !important;
              align-items: center !important;
              text-align: center !important;
            }
            .footer-project-block, .footer-tech-block {
              text-align: center !important;
              margin-left: auto !important;
              margin-right: auto !important;
              max-width: 100% !important;
            }
            .footer-features-list {
              display: flex !important;
              flex-direction: column !important;
              align-items: center !important;
              justify-content: center !important;
              text-align: center !important;
            }
            .footer-features-list .ant-list-items {
              width: 100% !important;
              text-align: center !important;
              align-items: center !important;
            }
            .footer-features-list .ant-list-item {
              justify-content: center !important;
              text-align: center !important;
              align-items: center !important;
            }
            /* Center and prevent overflow for project and bottom sections */
            .footer-project-section {
              flex-direction: column !important;
              justify-content: center !important;
              align-items: center !important;
              text-align: center !important;
              padding: 20px !important;
              max-width: 100% !important;
              box-sizing: border-box !important;
            }
            .footer-project-section p,
            .footer-project-section h4,
            .footer-project-section h5,
            .footer-project-section span {
              word-break: break-word !important;
              white-space: normal !important;
            }
            .footer-tech-tags {
              justify-content: center !important;
              gap: 10px !important;
              width: 100% !important;
              box-sizing: border-box !important;
            }
            .footer-bottom-section {
              justify-content: center !important;
              text-align: center !important;
              gap: 12px !important;
            }
            .footer-teamline-desktop { display: none !important; }
            .footer-teamline-mobile { display: flex !important; flex-direction: column !important; align-items: center !important; text-align: center !important; }
          }
          @media (min-width: 769px) {
            .footer-teamline-mobile { display: none !important; }
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
                      {t('footer.company.name')}
                    </Title>
                    <Text style={{ color: '#c5e2ff' }}>
                      {t('footer.company.slogan')}
                    </Text>
                  </div>
                </Space>
                
                <Paragraph style={{ color: '#c5e2ff', fontSize: '16px', lineHeight: 1.6 }}>
                  {t('footer.company.desc')}
                </Paragraph>

                {/* Contact Info */}
                <Space direction="vertical" size={8}>
                  <Space>
                    <PhoneOutlined style={{ color: '#52c41a' }} />
                    <Text style={{ color: '#c5e2ff' }}>
                      {t('footer.contact.hotline')}: 0922306391
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
                      {t('footer.contact.location')}
                    </Text>
                  </Space>
                </Space>
              </Space>
            </div>

            {/* Features */}
            <div className="footer-flex-item" style={{ flex: '0 0 auto', minWidth: '200px' }}>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <Title level={5} style={{ color: '#fff', margin: 0 }}>
                  {t('footer.features.title')}
                </Title>
                <List
                  className="footer-features-list"
                  dataSource={features}
                  renderItem={item => (
                    <List.Item style={{ padding: '4px 0', border: 'none' }}>
                      <Space size={8} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

            {/* Newsletter removed per request */}
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
          
          <div className="footer-bottom-section" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <Space direction="vertical" size={8}>
                <Text style={{ color: '#c5e2ff' }}>
                  {t('footer.bottom.copyright')}
                </Text>
                <Text style={{ color: 'rgba(197, 226, 255, 0.7)', fontSize: '12px' }}>
                  {t('footer.project.topic')}
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
                    {t('footer.bottom.theme')}
                  </Text>
                  <HeartOutlined style={{ color: '#ff4d4f', fontSize: '16px' }} />
                  <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
                    {t('footer.bottom.at')}
                  </Text>
                </Space>
                <Space direction="vertical" size={8}>
                  <Text className="footer-teamline-desktop" style={{ color: 'rgba(197, 226, 255, 0.6)', fontSize: '12px' }}>
                    {t('footer.bottom.teamline')}
                  </Text>
                  <div className="footer-teamline-mobile" style={{ color: 'rgba(197, 226, 255, 0.8)', fontSize: '12px' }}>
                    <span>Team</span>
                    <span>Mekong Pathfinders</span><br/>
                    <span>Trưởng nhóm</span>
                    <span>Huỳnh Ngọc Như Quỳnh</span>
                  </div>
                </Space>
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
          bottom: 'clamp(12px, 4vw, 30px)',
          right: 'clamp(12px, 4vw, 30px)',
          width: 'clamp(40px, 7vw, 50px)',
          height: 'clamp(40px, 7vw, 50px)',
          background: 'linear-gradient(135deg, #0344d6 0%, #377aef 100%)',
          border: 'none',
          boxShadow: '0 8px 25px rgba(3, 68, 214, 0.4)',
          zIndex: 1000,
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      />
    </>
  );
};

export default HomePageFooter;

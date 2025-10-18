import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Button, 
  Space, 
  Typography, 
  Drawer,
  Select
} from 'antd';
import {
  MenuOutlined,
  HomeOutlined,
  DownloadOutlined,
  MessageOutlined,
  BookOutlined,
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import AnimatedButton from '../../../components/AnimatedButton';
import NavigationMenu from '../../../components/NavigationMenu';
// import { useResponsive } from '../../../hooks/useResponsive';
import logoBanner from '../../../assets/images/logo_header/logo_banner.png';

const { Header } = Layout;
const { Text } = Typography;

const HomePageHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  // const { isMobile, isTablet } = useResponsive();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const menuItems = [
    {
      key: 'home',
      label: t('nav.home'),
      icon: <HomeOutlined />,
      onClick: () => navigate('/')
    },
    {
      key: 'download',
      label: t('nav.download'),
      icon: <DownloadOutlined />,
      onClick: () => navigate('/apk-download')
    },
    {
      key: 'feedback',
      label: t('nav.feedback'),
      icon: <MessageOutlined />,
      onClick: () => navigate('/feedback')
    }
  ];

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <>
      <style>
        {`
          .desktop-nav {
            display: flex;
          }
          .desktop-text {
            display: inline;
          }
          @media (max-width: 768px) {
            .desktop-nav {
              display: none !important;
            }
            .desktop-text {
              display: none !important;
            }
          }
        `}
      </style>
      <Header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: 'transparent',
          padding: '20px 0',
          height: 'auto',
          lineHeight: 'normal'
        }}
      >
        {/* Main Header Container */}
        <div style={{
          maxWidth: '1300px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          {/* Floating Header Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '12px 20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '70px'
          }}>
            {/* Left Side - Logo */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div 
                style={{ 
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onClick={handleLogoClick}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <img 
                  src={logoBanner} 
                  alt="Mekong Pathfinder" 
                  style={{ 
                    height: '36px',
                    objectFit: 'contain'
                  }}
                />
              </div>
            </div>

            {/* Center - Navigation Menu */}
            <div style={{ 
              display: 'flex',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              maxWidth: '700px',
              overflow: 'hidden',
              zIndex: 1
            }} className="desktop-nav">
              <NavigationMenu 
                items={menuItems} 
                style={{
                  flexWrap: 'nowrap',
                  overflow: 'hidden'
                }}
              />
            </div>

            {/* Right Side - Actions */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'clamp(8px, 2vw, 12px)',
              flexWrap: 'nowrap',
              zIndex: 2
            }}>
              {/* Language Selector */}
              <Select
                value={language}
                onChange={setLanguage}
                style={{ 
                  width: 'clamp(60px, 15vw, 120px)',
                  borderRadius: '20px',
                  fontSize: 'clamp(10px, 2vw, 12px)'
                }}
                suffixIcon={<GlobalOutlined />}
                options={[
                  { value: 'vi', label: '🇻🇳 VI' },
                  { value: 'en', label: '🇺🇸 EN' }
                ]}
              />

              {/* Contact Button */}
              <AnimatedButton
                variant="primary"
                icon={<PhoneOutlined />}
                onClick={() => navigate('/feedback')}
                glowEffect={true}
                shimmerEffect={true}
                size="medium"
              >
                <span className="desktop-text">{t('nav.contact')}</span>
              </AnimatedButton>

              {/* Mobile Menu Button */}
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setMobileMenuVisible(true)}
                style={{
                  borderRadius: '50%',
                  height: '36px',
                  width: '36px',
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.background = 'rgba(24, 144, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                }}
              />
            </div>
          </div>
        </div>
      </Header>

      {/* Mobile Menu Drawer */}
      <Drawer
        title={t('mobile.menu.title')}
        placement="right"
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        width={280}
        styles={{
          header: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff'
          }
        }}
      >
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          {menuItems.map(item => (
            <Button
              key={item.key}
              type="text"
              icon={item.icon}
              onClick={() => {
                item.onClick();
                setMobileMenuVisible(false);
              }}
              style={{
                width: '100%',
                height: '50px',
                textAlign: 'left',
                justifyContent: 'flex-start',
                fontSize: '16px',
                fontWeight: '500',
                borderRadius: '12px'
              }}
            >
              {item.label}
            </Button>
          ))}
          
          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #f0f0f0' }}>
            <Text type="secondary" style={{ fontSize: '14px' }}>
              {t('mobile.menu.contact')}
            </Text>
            <Space direction="vertical" size={8} style={{ width: '100%', marginTop: '12px' }}>
              <Space>
                <PhoneOutlined style={{ color: '#1890ff' }} />
                <Text>1900-xxxx</Text>
              </Space>
              <Space>
                <MailOutlined style={{ color: '#1890ff' }} />
                <Text>support@mekongpathfinder.com</Text>
              </Space>
            </Space>
          </div>
        </Space>
      </Drawer>

      {/* Spacer for fixed header */}
      <div style={{ height: '90px' }} />
    </>
  );
};

export default HomePageHeader;
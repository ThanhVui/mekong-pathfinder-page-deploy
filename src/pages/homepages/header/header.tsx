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
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import { useColorTheme } from '../../../context/ColorThemeContext';
import AnimatedButton from '../../../components/AnimatedButton';
import NavigationMenu from '../../../components/NavigationMenu';
import logoBanner from '../../../assets/images/logo_header/logo-04.png';

const { Header } = Layout;
const { Text } = Typography;

const HomePageHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { theme } = useColorTheme();

  // Scroll effect
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
      icon: <HomeOutlined style={{ color: theme.primary.bright }} />,
      onClick: () => navigate('/')
    },
    {
      key: 'download',
      label: language === 'vi' ? 'Tải xuống' : t('nav.download'),
      icon: <DownloadOutlined style={{ color: theme.primary.bright }} />,
      onClick: () => navigate('/apk-download')
    },
    {
      key: 'feedback',
      label: language === 'vi' ? 'Góp ý' : t('nav.feedback'),
      icon: <MessageOutlined style={{ color: theme.primary.bright }} />,
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
          .mobile-menu-btn {
            display: none !important;
          }
          @media (max-width: 768px) {
            .desktop-nav {
              display: none !important;
            }
            .desktop-text {
              display: none !important;
            }
            .mobile-menu-btn {
              display: flex !important;
            }
          }
        `}
      </style>

      {/* Background Layer — always at bottom, behind content */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: theme.background.header,
          zIndex: 1,
        }}
      />

      {/* Floating Header Card */}
      <Header
        style={{
          position: 'fixed',
          top: isScrolled ? '10px' : '20px',
          left: 0,
          right: 0,
          zIndex: 1000,
          background: 'transparent',
          borderBottom: 'none',
          transition: 'all 0.3s ease',
          height: 'auto',
        }}
      >
        <div
          style={{
            maxWidth: '1300px',
            margin: '0 auto',
            padding: '0 24px',
          }}
        >
          <div
            style={{
              background: theme.background.card,
              borderRadius: '20px',
              padding: '12px 20px',
              border: `1px solid ${theme.border.primary}`,
              boxShadow: theme.shadow.secondary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '70px',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(15px)',
            }}
          >
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
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
                    height: '50px',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </div>

            {/* Center Navigation */}
            <div
              style={{
                display: 'flex',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                maxWidth: '700px',
                overflow: 'hidden',
              }}
              className="desktop-nav"
            >
              <NavigationMenu
                items={menuItems}
                style={{
                  flexWrap: 'nowrap',
                }}
              />
            </div>

            {/* Right Actions */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(8px, 2vw, 12px)',
              }}
            >
              <Select
                value={language}
                onChange={setLanguage}
                style={{
                  width: 'clamp(60px, 15vw, 120px)',
                  borderRadius: '20px',
                  fontSize: 'clamp(10px, 2vw, 12px)',
                }}
                suffixIcon={<GlobalOutlined style={{ color: theme.primary.bright }} />}
                options={[
                  { value: 'vi', label: '🇻🇳 VI' },
                  { value: 'en', label: '🇺🇸 EN' },
                ]}
              />

              <AnimatedButton
                variant="primary"
                icon={<PhoneOutlined style={{ color: theme.neutral.white }} />}
                onClick={() =>
                  window.open(
                    'https://www.facebook.com/mekongpathfinder',
                    '_blank',
                    'noopener,noreferrer'
                  )
                }
                glowEffect={true}
                shimmerEffect={true}
                size="medium"
                style={{
                  boxShadow: theme.shadow.glow,
                  borderRadius: '30px',
                }}
              >
                <span className="desktop-text">{t('nav.contact')}</span>
              </AnimatedButton>

              {/* Mobile Menu Button */}
              <Button
                type="text"
                icon={<MenuOutlined style={{ color: theme.primary.bright }} />}
                onClick={() => setMobileMenuVisible(true)}
                className="mobile-menu-btn"
                style={{
                  borderRadius: '50%',
                  height: '36px',
                  width: '36px',
                  background: theme.background.overlay,
                  border: `1px solid ${theme.border.light}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: `0 0 10px ${theme.primary.bright}40`
                }}
              />
            </div>
          </div>
        </div>
      </Header>

      {/* Mobile Drawer */}
      <Drawer
        title={t('mobile.menu.title')}
        placement="right"
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        width={280}
        styles={{
          header: {
            background: `linear-gradient(135deg, ${theme.primary.medium} 0%, ${theme.primary.light} 100%)`,
            color: theme.text.white
          },
        }}
      >
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          {menuItems.map((item) => (
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
        </Space>
      </Drawer>

      {/* Spacer for layout */}
      <div style={{ height: '100px' }} />
    </>
  );
};

export default HomePageHeader;

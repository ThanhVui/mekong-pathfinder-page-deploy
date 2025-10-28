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
  LeftOutlined,
  HomeOutlined,
  DownloadOutlined,
  MessageOutlined,
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import { useColorTheme } from '../../../context/ColorThemeContext';
import AnimatedButton from '../../../components/AnimatedButton';
import NavigationMenu from '../../../components/NavigationMenu';
import logoBanner from '../../../assets/images/logo_header/logo-04.png';
import logoCenter from '../../../assets/images/logo_header/logo-12.png';
import backgroundHeader from '../../../assets/images/page-images/background-header.png';
import usFlag from '../../../assets/images/page-images/us.png';
import vietnamFlag from '../../../assets/images/page-images/vietnam.png';

const { Header } = Layout;
const { Text } = Typography;

const HomePageHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
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

  // Helper function to get icon color based on active state
  const getIconColor = (key: string) => {
    const isActive = (key === 'home' && location.pathname === '/') ||
                    (key === 'about' && location.pathname === '/') ||
                    (key === 'download' && location.pathname === '/apk-download') ||
                    (key === 'feedback' && location.pathname === '/feedback');
    return isActive ? '#83b5fc' : '#001f44';
  };

  // Scroll functions
  const scrollToDownload = () => {
    const element = document.getElementById('download-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToFeedback = () => {
    const element = document.getElementById('feedback-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const [activeKey, setActiveKey] = useState<string>('home');

  // Navigation items
  const menuItems = [
    {
      key: 'home',
      label: t('nav.home'),
      icon: <HomeOutlined style={{ color: 'inherit' }} />,
      onClick: () => { setActiveKey('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    },
    {
      key: 'about',
      label: language === 'vi' ? 'Giới thiệu' : 'About',
      icon: <UsergroupAddOutlined style={{ color: 'inherit' }} />,
      onClick: () => { setActiveKey('about'); scrollToAbout(); }
    },
    {
      key: 'download',
      label: language === 'vi' ? 'Tải xuống' : t('nav.download'),
      icon: <DownloadOutlined style={{ color: 'inherit' }} />,
      onClick: () => { setActiveKey('download'); scrollToDownload(); }
    },
    {
      key: 'feedback',
      label: language === 'vi' ? 'Góp ý' : t('nav.feedback'),
      icon: <MessageOutlined style={{ color: 'inherit' }} />,
      onClick: () => { setActiveKey('feedback'); scrollToFeedback(); }
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
          .center-nav {
            display: flex;
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
            .center-nav {
              display: none !important;
            }
          }
          @media (max-width: 1024px) and (min-width: 769px) {
            .center-nav {
              gap: 8px !important;
            }
          }
        `}
      </style>

      {/* Hero Background Section */}
      <div
        style={{
          position: 'relative',
          height: '700px',
          width: '100%',
          backgroundImage: `url(${backgroundHeader})`,
          backgroundSize: 'fill',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1,
        }}
      >
        {/* Header Content */}
        <Header
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            background: 'transparent',
            borderBottom: 'none',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            transition: 'all 0.3s ease',
          }}
        >
        <div
          style={{
            maxWidth: '1300px',
            margin: '0 auto',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '25px',
            padding: 'clamp(4px, 1vw, 8px) clamp(15px, 3vw, 30px)',
            border: '1px solid #83b5fc',
            gap: 'clamp(8px, 2vw, 16px)',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 20px rgba(131, 181, 252, 0.1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(131, 181, 252, 0.2)';
            e.currentTarget.style.border = '1px solid #1890ff';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(131, 181, 252, 0.1)';
            e.currentTarget.style.border = '1px solid #83b5fc';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {/* Left Logo */}
          <div style={{ display: 'flex', alignItems: 'center', flex: '0 0 auto' }}>
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
                  height: 'clamp(35px, 6vw, 50px)',
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>

          {/* Center Navigation Menu */}
          <div className="center-nav" style={{ 
            flex: '1', 
            display: 'flex', 
            justifyContent: 'center'
          }}>
            <NavigationMenu
              items={menuItems}
              activeKey={activeKey}
              style={{
                flexWrap: 'nowrap',
                gap: 'clamp(8px, 2vw, 24px)',
              }}
            />
          </div>

          {/* Right Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(8px, 2vw, 12px)',
              flex: '0 0 auto',
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
                  { 
                    value: 'vi', 
                    label: (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <img src={vietnamFlag} alt="Vietnam" style={{ width: '16px', height: '12px' }} />
                        <span>VI</span>
                      </div>
                    )
                  },
                  { 
                    value: 'en', 
                    label: (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <img src={usFlag} alt="USA" style={{ width: '16px', height: '12px' }} />
                        <span>EN</span>
                      </div>
                    )
                  },
                ]}
              />

            {/* Contact Button */}
            <AnimatedButton
              variant="primary"
              icon={<PhoneOutlined style={{ color: '#ffffff' }} />}
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
                borderRadius: '30px',
                background: 'linear-gradient(135deg, #0344d6 0%, #377aef 100%)',
              }}
            >
              <span className="desktop-text">{t('nav.contact')}</span>
            </AnimatedButton>

            {/* Mobile Menu Button */}
            <Button
              type="text"
              icon={<MenuOutlined style={{ color: '#001f44' }} />}
              onClick={() => setMobileMenuVisible(true)}
              className="mobile-menu-btn"
              style={{
                borderRadius: '50%',
                height: '36px',
                width: '36px',
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(0, 31, 68, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.background = 'rgba(3, 68, 214, 0.1)';
                e.currentTarget.style.border = '1px solid rgba(3, 68, 214, 0.3)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(3, 68, 214, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.border = '1px solid rgba(0, 31, 68, 0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>
        </Header>

        {/* Center Logo on Background */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.05)';
            e.currentTarget.style.filter = 'drop-shadow(0 10px 20px rgba(3, 68, 214, 0.3))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
            e.currentTarget.style.filter = 'none';
          }}
        >
          <img
            src={logoCenter}
            alt="Mekong Pathfinder"
            style={{
              height: '250px',
              objectFit: 'contain',
              transition: 'all 0.3s ease'
            }}
          />
        </div>

        {/* Welcome Section in Hero */}
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            width: '100%',
            maxWidth: '700px',
            padding: '0 20px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(-50%) translateY(-5px)';
            e.currentTarget.style.filter = 'drop-shadow(0 5px 15px rgba(3, 68, 214, 0.2))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateX(-50%) translateY(0)';
            e.currentTarget.style.filter = 'none';
          }}
        >
          {/* Title with background frame */}
          <div
            style={{
              width: '100%',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '50px',
              padding: '5px 0px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              marginBottom: '20px'
            }}
          >
            <h1
              style={{
                color: '#0344d6',
                fontSize: 'clamp(24px, 4vw, 32px)',
                fontWeight: '700',
                margin: '0',
                background: 'transparent',
                transition: 'all 0.3s ease',
                padding: '0px 0px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#001f44';
                e.currentTarget.style.textShadow = '0 2px 4px rgba(3, 68, 214, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#0344d6';
                e.currentTarget.style.textShadow = 'none';
              }}
            >
              {language === 'vi' ? 'Chào mừng đến với Mekong Pathfinder' : 'Welcome To Mekong Pathfinder'}
            </h1>
          </div>

          {/* Content without background */}
          <p
            style={{
              fontSize: 'clamp(14px, 2.5vw, 16px)',
              lineHeight: 1.6,
              color: '#fff',
              margin: '0',
              textAlign: 'justify',
              background: 'transparent',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#f0f8ff';
              e.currentTarget.style.textShadow = '0 1px 3px rgba(3, 68, 214, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            {language === 'vi' 
              ? 'Mekong Pathfinder là một dự án sáng tạo do sinh viên dẫn dắt từ Cần Thơ, tập trung vào phát triển đô thị bền vững ở Đồng bằng sông Cửu Long thông qua đổi mới kỹ thuật số, giải pháp dựa trên dữ liệu và hợp tác cộng đồng. Chúng tôi kết nối dữ liệu với hành động để xây dựng một tương lai bền vững cho cộng đồng Mekong.'
              : 'Mekong Pathfinder is an innovative student-led project from Can Tho, focused on sustainable urban development in the Mekong Delta through digital innovation, data-driven solutions, and community collaboration. We connect data to action to build a sustainable future for the Mekong community.'
            }
          </p>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>{t('mobile.menu.title')}</span>
            <Button
              type="text"
              icon={<LeftOutlined />}
              onClick={() => setMobileMenuVisible(false)}
              style={{
                color: '#ffffff',
                fontSize: '18px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        width={280}
        maskClosable={true}
        styles={{
          header: {
            background: `linear-gradient(135deg, #0344d6 0%, #377aef 100%)`,
            color: '#ffffff',
            borderBottom: 'none'
          },
          body: {
            background: '#f8f9fa',
            padding: '20px'
          }
        }}
      >
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          {menuItems.map((item) => {
            const isActive = (item.key === 'home' && location.pathname === '/') ||
                            (item.key === 'download' && location.pathname === '/apk-download') ||
                            (item.key === 'feedback' && location.pathname === '/feedback');
            return (
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
                  borderRadius: '12px',
                  background: isActive ? 'rgba(131, 181, 252, 0.2)' : 'transparent',
                  color: isActive ? '#83b5fc' : '#c5e2ff'
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Space>
      </Drawer>

      {/* Spacer for layout */}
      <div style={{ height: '0px' }} />
    </>
  );
};

export default HomePageHeader;

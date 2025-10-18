import React from 'react';
import { Dropdown, Button, Space, Typography } from 'antd';
import { GlobalOutlined, CheckOutlined } from '@ant-design/icons';
import { useUserLanguage } from '../context/UserLanguageContext';

const { Text } = Typography;

const UserLanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useUserLanguage();

  const languageOptions = [
    {
      key: 'vi',
      label: (
        <Space>
          <span>🇻🇳</span>
          <Text>{t('language.vietnamese')}</Text>
          {language === 'vi' && <CheckOutlined style={{ color: '#52c41a' }} />}
        </Space>
      ),
    },
    {
      key: 'en',
      label: (
        <Space>
          <span>🇺🇸</span>
          <Text>{t('language.english')}</Text>
          {language === 'en' && <CheckOutlined style={{ color: '#52c41a' }} />}
        </Space>
      ),
    },
  ];

  const handleLanguageChange = ({ key }: { key: string }) => {
    setLanguage(key as 'vi' | 'en');
  };

  const getCurrentLanguageFlag = () => {
    return language === 'vi' ? '🇻🇳' : '🇺🇸';
  };

  const getCurrentLanguageName = () => {
    return language === 'vi' ? 'VI' : 'EN';
  };

  return (
    <Dropdown
      menu={{
        items: languageOptions,
        onClick: handleLanguageChange,
      }}
      trigger={['click']}
      placement="bottomRight"
    >
      <Button
        type="text"
        style={{
          borderRadius: '50%',
          height: '36px',
          width: '36px',
          background: 'rgba(255, 255, 255, 0.8)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          color: '#1890ff',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: 0
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.background = 'rgba(24, 144, 255, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
        }}
      >
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          position: 'relative'
        }}>
          {/* Flag Icon */}
          <div style={{ 
            fontSize: '16px',
            lineHeight: '1',
            marginBottom: '1px'
          }}>
            {getCurrentLanguageFlag()}
          </div>
          
          {/* Language Code */}
          <div style={{ 
            fontSize: '8px',
            fontWeight: 'bold',
            color: '#1890ff',
            lineHeight: '1',
            letterSpacing: '0.5px'
          }}>
            {getCurrentLanguageName()}
          </div>
        </div>
      </Button>
    </Dropdown>
  );
};

export default UserLanguageSelector;

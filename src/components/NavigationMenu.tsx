import React from 'react';
import { Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

interface MenuItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface NavigationMenuProps {
  items: MenuItem[];
  className?: string;
  style?: React.CSSProperties;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ 
  items, 
  className, 
  style 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div 
      className={className}
      style={{ 
        display: 'flex', 
        gap: '8px',
        flexWrap: 'nowrap',
        overflow: 'hidden',
        ...style 
      }}
    >
      {items.map((item) => {
        const isActive = (item.key === 'home' && location.pathname === '/') ||
                        (item.key === 'download' && location.pathname === '/apk-download') ||
                        (item.key === 'feedback' && location.pathname === '/feedback') ||
                        location.pathname === item.key;
        return (
          <Button
            key={item.key}
            type="text"
            onClick={item.onClick}
            style={{
              borderRadius: '30px',
              height: '50px',
              padding: '0 20px',
              fontWeight: '600',
              fontSize: '14px',
              color: isActive ? '#fff' : '#666',
              background: isActive 
                ? 'linear-gradient(135deg, #4c63d2 0%, #5a4fcf 100%)' 
                : 'transparent',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              border: 'none',
              boxShadow: isActive 
                ? '0 6px 20px rgba(76, 99, 210, 0.6)' 
                : 'none',
              transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
              position: 'relative',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              minWidth: '120px',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(76, 99, 210, 0.1) 0%, rgba(90, 79, 207, 0.1) 100%)';
                e.currentTarget.style.color = '#4c63d2';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(76, 99, 210, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#666';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            <span style={{ 
              position: 'relative', 
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              {item.icon}
              {item.label}
            </span>
            {isActive && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
                borderRadius: '30px',
                zIndex: 0
              }} />
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default NavigationMenu;

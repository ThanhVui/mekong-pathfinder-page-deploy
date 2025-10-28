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
              width: '160px',
              padding: '0 20px',
              fontWeight: '600',
              fontSize: '16px',
              color: isActive ? '#fff' : '#001f44',
              background: isActive 
                ? 'linear-gradient(135deg, #0344d6 0%, #377aef 100%)' 
                : 'transparent',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              border: 'none',
              transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
              position: 'relative',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              minWidth: '120px',
              flexShrink: 0,
              display: 'flex',
              marginTop: '0.5%'
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(3, 68, 214, 0.2) 0%, rgba(55, 122, 239, 0.2) 100%)';
                e.currentTarget.style.color = '#0344d6';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#001f44';
                e.currentTarget.style.transform = 'translateY(0)';
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

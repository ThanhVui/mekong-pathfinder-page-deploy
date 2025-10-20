import React from 'react';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

interface NavigationButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  direction,
  onClick,
  disabled = false,
  style = {}
}) => {
  const isLeft = direction === 'left';
  const icon = isLeft ? <LeftOutlined /> : <RightOutlined />;
  
  const defaultStyle: React.CSSProperties = {
    position: 'absolute',
    [isLeft ? 'left' : 'right']: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.9)',
    border: 'none',
    boxShadow: '0 4px 12px rgba(0, 31, 68, 0.2)',
    fontSize: '18px',
    color: '#0344d6',
    zIndex: 10,
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
      e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
      e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
    }
  };

  return (
    <Button
      type="text"
      icon={icon}
      onClick={onClick}
      disabled={disabled}
      style={{ ...defaultStyle, ...style }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default NavigationButton;

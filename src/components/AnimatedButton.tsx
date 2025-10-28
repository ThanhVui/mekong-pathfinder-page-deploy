import React from 'react';
import { Button, ButtonProps } from 'antd';

interface AnimatedButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  glowEffect?: boolean;
  shimmerEffect?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  id?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  glowEffect = true,
  shimmerEffect = true,
  style,
  children,
  onClick,
  icon,
  disabled,
  className,
  id
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          height: '32px',
          padding: '0 16px',
          fontSize: '12px',
          borderRadius: '20px'
        };
      case 'large':
        return {
          height: '48px',
          padding: '0 24px',
          fontSize: '16px',
          borderRadius: '30px'
        };
      default:
        return {
          height: '40px',
          padding: '0 20px',
          fontSize: '14px',
          borderRadius: '25px'
        };
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          background: 'linear-gradient(135deg, #f0f2f5 0%, #e6f7ff 100%)',
          color: '#1890ff',
          border: '1px solid #d9d9d9'
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: '#666',
          border: 'none'
        };
      default:
        return {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          border: 'none'
        };
    }
  };

  const baseStyles: React.CSSProperties = {
    ...getSizeStyles(),
    ...getVariantStyles(),
    fontWeight: '600',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    ...style
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    target.style.transform = 'translateY(-3px) scale(1.05)';
    if (variant === 'primary') {
      target.style.background = 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    target.style.transform = 'translateY(0) scale(1)';
    if (variant === 'primary') {
      target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  };

  return (
    <Button
      type={variant === 'primary' ? 'primary' : variant === 'secondary' ? 'default' : 'text'}
      style={baseStyles}
      onClick={onClick}
      icon={icon}
      disabled={disabled}
      className={className}
      id={id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span style={{ 
        position: 'relative', 
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        {children}
      </span>
      {shimmerEffect && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transition: 'left 0.5s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.left = '100%';
          }}
        />
      )}
    </Button>
  );
};

export default AnimatedButton;

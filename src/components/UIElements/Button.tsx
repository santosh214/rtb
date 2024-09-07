// src/components/CustomButton.tsx

import React from 'react';
import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material/Button';

// Define the props interface
interface UIButtonProps extends ButtonProps {
  // Any additional props you want to explicitly define
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
}

// Custom Button Component
const UIButton: React.FC<UIButtonProps> = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  startIcon,
  endIcon,
  fullWidth = false, 
  ...props

}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      fullWidth={fullWidth}
      {...props} // Spreading any additional props (className, style, etc.)
    >
      {children}
    </Button>
  );
};

export default UIButton;

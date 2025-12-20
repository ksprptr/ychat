'use client';

import { ExtendedProps } from '@/common/types/global.types';

import LoadingIndicator from '../loadings/LoadingIndicator';

// Props interface
interface Props extends ExtendedProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'normal' | 'info' | 'danger' | 'transparent';
  disabled?: boolean;
  fullWidth?: boolean;
  fullRounded?: boolean;
  onClick?: () => void;
  ownPadding?: boolean;
  loading?: boolean;
}

/**
 * Component representing a button
 */
export default function Button({
  type = 'button',
  variant = 'normal',
  disabled = false,
  fullWidth = false,
  fullRounded = false,
  onClick,
  ownPadding = false,
  loading,
  children,
  className,
}: Props) {
  const getVariant = () => {
    switch (variant) {
      case 'normal':
        return 'bg-lime-500/10 text-lime-500 hover:bg-lime-500/20 disabled:hover:bg-lime-500/10';
      case 'info':
        return 'bg-sky-500/10 text-sky-500 hover:bg-sky-500/20 disabled:hover:bg-sky-500/10';
      case 'danger':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20 disabled:hover:bg-red-500/10';
      default:
        return '';
    }
  };

  return (
    <button
      {...(onClick ? { onClick } : {})}
      disabled={disabled}
      type={type}
      className={`${getVariant()} font-medium transition duration-150 disabled:opacity-50 disabled:hover:cursor-not-allowed ${
        !ownPadding ? 'px-4 py-2' : ''
      } ${loading ? 'flex items-center justify-center gap-x-2' : ''} ${className} ${
        fullWidth ? 'w-full' : ''
      } ${fullRounded ? 'rounded-full' : 'rounded-lg'}`}>
      {loading && <LoadingIndicator />}
      {children}
    </button>
  );
}

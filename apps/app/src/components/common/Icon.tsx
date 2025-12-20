'use client';

import { ExtendedProps } from '@/common/types/global.types';

import LoadingIndicator from '../loadings/LoadingIndicator';
import * as iconsOutlined from '@heroicons/react/24/outline';
import * as iconsSolid from '@heroicons/react/24/solid';

// Props interface
interface Props extends ExtendedProps {
  icon: string;
  type?: 'solid' | 'outlined';
  onClick?: () => void;
  loading?: boolean;
}

/**
 * Component representing an icon
 */
export default function Icon({
  icon,
  className,
  onClick,
  type = 'outlined',
  loading,
  ...props
}: Props) {
  if (loading) {
    return <LoadingIndicator />;
  }

  const iconSet = type === 'outlined' ? iconsOutlined : iconsSolid;

  // @ts-ignore
  const Component = iconSet[`${icon}Icon`];

  return (
    <Component
      {...(onClick ? { onClick: onClick } : {})}
      className={`h-4 w-4 ${className} ${onClick ? 'cursor-pointer' : ''}`}
      {...props}
    />
  );
}

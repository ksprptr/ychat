import { ExtendedProps } from '@/common/types/global.types';

// Props interface
interface Props extends ExtendedProps {
  fullRounded?: boolean;
}

/**
 * Component representing a loading skeleton
 */
export default function Skeleton({ fullRounded = false, className, children }: Props) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className={`h-full w-full bg-zinc-200 ${fullRounded ? 'rounded-full' : 'rounded-xl'}`}>
        {children}
      </div>
    </div>
  );
}

// Props interface
interface Props {
  size?: number;
}

/**
 * Component representing a loading indicator
 */
export default function LoadingIndicator({ size = 14 }: Props) {
  return (
    <svg
      className='animate-spin'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <circle cx='12' cy='12' r='10' strokeOpacity='0.25' />
      <path d='M12 2 a10 10 0 0 1 10 10' />
    </svg>
  );
}

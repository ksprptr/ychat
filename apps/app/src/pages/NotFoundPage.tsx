import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';

import { Link } from 'react-router-dom';

/**
 * Component representing a not found page
 */
export default function NotFoundPage() {
  return (
    <div className='grid min-h-screen grid-cols-1 px-4 text-left sm:grid-cols-2 sm:px-0'>
      {/* Text */}
      <div className='mx-auto flex w-full flex-col justify-center sm:w-2/3 md:w-1/2'>
        {/* Title and description */}
        <h1 className='text-2xl font-medium'>404 - Page Not Found</h1>
        <p className='pt-2 text-zinc-400'>
          The page you are looking for does not exist or has been moved.
        </p>

        {/* Go back home */}
        <Link to='/'>
          <Button className='mt-8 flex items-center gap-x-2'>
            Go back home <Icon icon='ArrowRight' />
          </Button>
        </Link>
      </div>

      {/* Logo */}
      <div className='hidden flex-col items-center justify-center bg-zinc-100 sm:flex'>
        <img
          src='/assets/logos/ui/logo.svg'
          alt='YChat Logo'
          className='h-auto sm:w-1/2 md:w-1/3'
        />
      </div>
    </div>
  );
}

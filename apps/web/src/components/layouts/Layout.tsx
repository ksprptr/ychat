import { PropsWithChildren } from 'react';

/**
 * Component representing a layout
 */
export default function Layout({ children }: PropsWithChildren) {
  return (
    <main className='min-h-screen bg-white font-sans text-[#2b2b2b] antialiased'>{children}</main>
  );
}

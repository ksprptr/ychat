'use client';

import Link from 'next/link';
import { useState } from 'react';

/**
 * Component representing a navbar
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='mx-auto w-full max-w-6xl px-6 py-8 lg:px-12'>
      <div className='flex items-center justify-between'>
        {/* Navigation - desktop */}
        <nav className='hidden items-center gap-10 md:flex'>
          <Link href='/' className='text-[13px] font-bold transition-colors hover:text-lime-500'>
            Home
          </Link>

          <Link
            href='/#about'
            className='text-[13px] font-bold transition-colors hover:text-lime-500'>
            About us
          </Link>

          <Link
            href='/#services'
            className='text-[13px] font-bold transition-colors hover:text-lime-500'>
            Services
          </Link>

          <Link
            href='/#contact'
            className='text-[13px] font-bold transition-colors hover:text-lime-500'>
            Contact
          </Link>
        </nav>

        {/* Download button - desktop */}
        <button className='hidden rounded-full bg-lime-500 px-8 py-2.5 text-[13px] font-bold text-white shadow-md transition-all hover:bg-lime-600 md:block'>
          Download
        </button>

        {/* Hamburger button */}
        <button onClick={() => setIsOpen(!isOpen)} className='flex flex-col gap-1.5 md:hidden'>
          <span className='h-0.5 w-6 bg-[#2b2b2b]'></span>
          <span className='h-0.5 w-6 bg-[#2b2b2b]'></span>
          <span className='h-0.5 w-6 bg-[#2b2b2b]'></span>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className='mt-6 flex flex-col gap-6 md:hidden'>
          <Link href='/' className='text-[13px] font-bold hover:text-lime-500'>
            Home
          </Link>

          <Link href='/#about' className='text-[13px] font-bold hover:text-lime-500'>
            About us
          </Link>

          <Link href='/#services' className='text-[13px] font-bold hover:text-lime-500'>
            Services
          </Link>

          <Link href='/#contact' className='text-[13px] font-bold hover:text-lime-500'>
            Contact
          </Link>

          <button className='mt-2 w-fit rounded-full bg-lime-500 px-8 py-2.5 text-[13px] font-bold text-white shadow-md transition-all hover:bg-lime-600'>
            Download
          </button>
        </nav>
      )}
    </header>
  );
}

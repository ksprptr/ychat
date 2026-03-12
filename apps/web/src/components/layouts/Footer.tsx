import Image from 'next/image';
import Link from 'next/link';

/**
 * Component representing a footer
 */
export default function Footer() {
  return (
    <footer className='mx-auto mt-16 w-full max-w-6xl border-t border-gray-100 px-6 py-20'>
      <div className='flex flex-col items-start justify-between gap-12 md:flex-row'>
        <div className='flex items-center gap-4'>
          <div className='relative h-12.5 w-12.5 shrink-0'>
            <Image src='/assets/logo.svg' alt='yChat small logo' fill className='object-contain' />
          </div>
          <span className='text-[2.5rem] font-black text-lime-500 italic'>yChat</span>
        </div>

        <div className='flex gap-20'>
          <div className='flex flex-col'>
            <h4 className='relative mb-6 w-fit text-[1.1rem] font-black text-[#1a1a1a]'>
              Links
              <span className='absolute bottom-0 left-0 -z-10 h-1 w-full rounded-sm bg-lime-500'></span>
            </h4>
            <ul className='flex flex-col space-y-3.5 text-[11px] font-bold text-[#666]'>
              <li className='flex items-center gap-2.5'>
                <Link href='/'>
                  <span className='h-1 w-1 rounded-full bg-[#333]'></span> Home
                </Link>
              </li>
              <li className='flex items-center gap-2.5'>
                <Link href='#'>
                  <span className='h-1 w-1 rounded-full bg-[#333]'></span> Terms of Service
                </Link>
              </li>
              <li className='flex items-center gap-2.5'>
                <Link href='#'>
                  <span className='h-1 w-1 rounded-full bg-[#333]'></span> Privacy Policy
                </Link>
              </li>
              <li className='flex items-center gap-2.5'>
                <Link href='#'>
                  <span className='h-1 w-1 rounded-full bg-[#333]'></span> Login
                </Link>
              </li>
            </ul>
          </div>

          <div className='flex flex-col'>
            <h4 className='relative mb-6 w-fit text-[1.1rem] font-black text-[#1a1a1a]'>
              Socials
              <span className='absolute bottom-0 left-0 -z-10 h-1 w-full rounded-sm bg-lime-500'></span>
            </h4>
            <ul className='flex flex-col space-y-3.5 text-[11px] font-bold text-[#666]'>
              <li className='flex items-center gap-2.5'>
                <Link href='#'>
                  <span className='h-1 w-1 rounded-full bg-[#333]'></span> Facebook
                </Link>
              </li>
              <li className='flex items-center gap-2.5'>
                <Link href='#'>
                  <span className='h-1 w-1 rounded-full bg-[#333]'></span> Instagram
                </Link>
              </li>
              <li className='flex items-center gap-2.5'>
                <Link href='#'>
                  <span className='h-1 w-1 rounded-full bg-[#333]'></span> X (formerly Twitter)
                </Link>
              </li>
              <li className='flex items-center gap-2.5'>
                <Link href='#'>
                  <span className='h-1 w-1 rounded-full bg-[#333]'></span> Discord
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='mt-24 flex items-center justify-between text-[10px] font-bold text-[#aaa]'>
        <span>© yChat {new Date().getFullYear()}</span>
        <span>All rights reserved.</span>
      </div>
    </footer>
  );
}

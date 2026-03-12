import Image from 'next/image';

/**
 * Component representing a not found page
 */
export default function Page() {
  return (
    <>
      {/* Hero section */}
      <section className='mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-12 px-6 pt-20 pb-32 md:flex-row lg:px-12'>
        <div className='flex flex-1 flex-col justify-center'>
          <p className='mb-4 text-xl leading-tight font-bold text-[#a0a0a0]'>
            Oops! The page you're looking for doesn't exist.
          </p>
          <h1 className='text-[6.5rem] leading-[0.9] font-black tracking-tighter text-lime-500 italic'>
            404
          </h1>
        </div>
        <div className='flex flex-1 justify-end'>
          <div className='relative aspect-square w-full max-w-85'>
            <Image
              src='/assets/logo.svg'
              alt='yChat Logo'
              fill
              className='object-contain'
              priority
            />
          </div>
        </div>
      </section>
    </>
  );
}

import Image from 'next/image';

/**
 * Component representing a home page
 */
export default function Page() {
  return (
    <>
      {/* Hero section */}
      <section className='mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-12 px-6 pt-20 pb-32 md:flex-row lg:px-12'>
        <div className='flex flex-1 flex-col justify-center'>
          <p className='mb-1 text-xl leading-tight font-bold text-[#a0a0a0]'>chat with</p>
          <p className='mb-4 text-xl leading-tight font-bold text-[#a0a0a0]'>
            anyone, anywhere, anytime
          </p>
          <h1 className='text-[6.5rem] leading-[0.9] font-black tracking-tighter text-lime-500 italic'>
            yChat
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

      {/* About us section */}
      <section id='about' className='flex w-full flex-col items-center px-6 py-28'>
        <h2 className='relative mb-16 text-[2.75rem] font-black text-[#1a1a1a]'>
          About us
          <span className='bg-opacity-80 absolute bottom-1 left-0 -z-10 h-2.5 w-full rounded-sm bg-lime-500'></span>
        </h2>
        <div className='grid w-full max-w-5xl gap-12 text-justify text-xs leading-loose font-bold text-[#666] md:grid-cols-2 lg:gap-20'>
          <p>
            yChat is a simple and modern chat application designed for fast and reliable
            communication. The project focuses on providing an intuitive user experience while using
            modern technologies and development principles. The application allows users to
            communicate easily from anywhere, making messaging straightforward and accessible.
            <br />
            <br />
            Built with the Electron framework, the application runs as a desktop program while using
            modern web technologies under the hood. This approach allows the application to combine
            the flexibility of web development with the capabilities of native desktop software. The
            goal of the project is to create a lightweight, responsive, and easy-to-use chat
            platform.
          </p>
          <p>
            The application architecture follows modern development practices and focuses on
            maintainability and scalability. Clean component structure, modular design, and clear
            separation of logic help keep the project organized and easier to expand in the future.
            Thanks to these principles, the application can evolve while keeping the codebase
            readable and manageable.
            <br />
            <br />
            yChat aims to provide a simple communication environment without unnecessary complexity.
            The interface is designed to be minimalistic and easy to understand, allowing users to
            focus on what matters most — conversation. Fast message delivery, smooth interface
            interactions, and efficient performance are key priorities of the project.
          </p>
        </div>
      </section>

      {/* Services section */}
      <section
        id='services'
        className='flex w-full flex-col items-center border-y border-[#f1f4e8] bg-[#fcfdfa] px-6 py-32'>
        <h2 className='relative mb-20 text-[2.75rem] font-black text-[#1a1a1a]'>
          Services
          <span className='bg-opacity-80 absolute bottom-1 left-0 -z-10 h-2.5 w-full rounded-sm bg-lime-500'></span>
        </h2>

        <div className='grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 md:gap-14'>
          <div className='flex aspect-4/3 transform items-center justify-center rounded-3xl bg-white shadow-[0_15px_40px_-15px_rgba(0,0,0,0.06)] transition-transform hover:-translate-y-2'>
            <h3 className='text-4xl font-black tracking-tight text-[#1a1a1a]'>simple.</h3>
          </div>
          <div className='flex aspect-4/3 transform items-center justify-center rounded-3xl bg-white shadow-[0_15px_40px_-15px_rgba(0,0,0,0.06)] transition-transform hover:-translate-y-2'>
            <h3 className='text-4xl font-black tracking-tight text-[#1a1a1a]'>fast.</h3>
          </div>
          <div className='flex aspect-4/3 transform items-center justify-center rounded-3xl bg-white shadow-[0_15px_40px_-15px_rgba(0,0,0,0.06)] transition-transform hover:-translate-y-2'>
            <h3 className='text-4xl font-black tracking-tight text-[#1a1a1a]'>easy.</h3>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section id='contact' className='flex w-full flex-col items-center px-6 py-32'>
        <h2 className='relative mb-20 text-[2.75rem] font-black text-[#1a1a1a]'>
          Contact
          <span className='bg-opacity-80 absolute bottom-1 left-0 -z-10 h-2.5 w-full rounded-sm bg-lime-500'></span>
        </h2>

        <form className='flex w-full max-w-4xl flex-col gap-6'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <input
              type='text'
              placeholder='First name and last name'
              className='w-full rounded-2xl bg-[#f6f8f6] px-8 py-5 text-sm font-bold text-[#1a1a1a] placeholder-[#b0b0b0] transition-all focus:ring-2 focus:ring-lime-500 focus:outline-none'
            />
            <input
              type='email'
              placeholder='Email'
              className='w-full rounded-2xl bg-[#f6f8f6] px-8 py-5 text-sm font-bold text-[#1a1a1a] placeholder-[#b0b0b0] transition-all focus:ring-2 focus:ring-lime-500 focus:outline-none'
            />
          </div>
          <textarea
            placeholder='Write a message...'
            className='h-55 w-full resize-none rounded-2xl bg-[#f6f8f6] px-8 py-6 text-sm font-bold text-[#1a1a1a] placeholder-[#b0b0b0] transition-all focus:ring-2 focus:ring-lime-500 focus:outline-none'
          />
          <button
            type='submit'
            className='mx-auto mt-6 rounded-full bg-lime-500 px-14 py-4 text-[14px] font-extrabold text-white shadow-md transition-all hover:-translate-y-1 hover:bg-lime-600'>
            Submit
          </button>
        </form>
      </section>
    </>
  );
}

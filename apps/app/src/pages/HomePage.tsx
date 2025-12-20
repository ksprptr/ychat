/**
 * Component representing a home page
 */
export default function HomePage() {
  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center gap-4 text-center'>
      {/* Image */}
      <img
        src='/assets/other/sitting_cat.png'
        alt='Sitting cat'
        className='h-auto w-32 opacity-20'
      />

      {/* Text */}
      <p className='text-zinc-400'>No chat selected. Please select a chat to start messaging.</p>
    </div>
  );
}

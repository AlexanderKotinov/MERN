import Navigation from '../Navigation/Navigation';

export default function Header() {
  return (
    <header className='bg-slate-900 w-full h-16 flex items-center justify-between fixed top-0 z-10'>
      <h1 className='text-white font-bold text-lg ml-4'>Real Estate (MERN Example)</h1>
      <Navigation />
    </header>
  );
}

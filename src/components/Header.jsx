import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-gray-100 shadow-lg py-6 px-4 z-50 relative">
      <div className="container mx-auto flex justify-between md:justify-evenly items-center px-4 ">
        <Link href={'/'} className="text-black font-semibold text-lg">Resume Builder</Link>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="p-3 bg-teal-500 rounded-xl px-6 hover:bg-teal-700 transition">
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
        <nav className={`space-x-4  hidden  md:block`}>
          <Link href="/" className="text-black hover:text-gray-600">Home</Link>
          <Link href="/" className="text-black hover:text-gray-600">Templates</Link>
          <Link href="/about" className="text-black hover:text-gray-600">About</Link>
          <Link href="/contact" className="text-black hover:text-gray-600">Contact</Link>
        </nav>
          <button onClick={()=> signOut()} className="hidden md:block p-3 bg-teal-500 rounded-xl px-6 hover:bg-teal-700 transition">Log out</button>
      </div>
      <nav className={`flex-col mx-4 relative space-y-3 md:hidden ${menuOpen ? 'flex' : 'hidden'} border-t-2 my-2 pb`}>
          <Link href="/" className="text-black hover:text-gray-600 mt-5">Home</Link>
          <Link href="/" className="text-black hover:text-gray-600">Templates</Link>
          <Link href="/about" className="text-black hover:text-gray-600">About</Link>
          <Link href="/contact" className="text-black hover:text-gray-600">Contact</Link>
        </nav>
    </header>
  );
}

export default Header;

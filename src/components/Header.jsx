import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
function Header() {
  return (
    <header className="bg-gray-100 shadow-lg py-6 px-4">
      <div className="container mx-auto flex justify-between items-center px-4 ">
        <Link href={'/'} className="text-black font-semibold text-lg">Resume Builder</Link>
        <nav className="space-x-4">
          <Link href="/" className="text-black hover:text-gray-600">Home</Link>
          <Link href="/" className="text-black hover:text-gray-600">Templates</Link>
          <Link href="/about" className="text-black hover:text-gray-600">About</Link>
          <Link href="/contact" className="text-black hover:text-gray-600">Contact</Link>
        </nav>
        <div className="">
          <button onClick={()=> signOut()} className="p-3 bg-teal-500 rounded-xl px-6 hover:bg-teal-700 transition">Log out</button>
        </div>
      </div>
    </header>
  );
}

export default Header;

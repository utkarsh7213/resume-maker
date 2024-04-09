import React from 'react';

function Header() {
  return (
    <header className="bg-gray-100 shadow-lg py-6">
      <div className="container mx-auto flex justify-between items-center px-4 ">
        <div className="text-black font-semibold text-lg">Resume Builder</div>
        <nav className="space-x-4">
          <a href="#" className="text-black hover:text-gray-600">Home</a>
          <a href="#" className="text-black hover:text-gray-600">Templates</a>
          <a href="#" className="text-black hover:text-gray-600">About</a>
          <a href="#" className="text-black hover:text-gray-600">Contact</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;

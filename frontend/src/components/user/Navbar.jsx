import React from 'react';

function Navbar() {
  return (
    <div className="bg-secondary">
      <div className="text-white max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center">
          <img src="./logo.png" alt="5star" className="h-10"/>
          <ul>
            <li>login</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

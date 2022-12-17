import React from 'react';
import { BsFillSunFill } from 'react-icons/bs';
import Container from '../Container';

function Navbar() {
  return (
    <div className="bg-secondary shadow-sm shadow-gray-500">
      <div className="p-2 max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center">
          <img src="./logo.png" alt="5star" className="h-10" />
          <ul className="flex items-center space-x-4">
            <li>
              <button className="bg-dark-subtle p-1 rounded">
                <BsFillSunFill className="text-white" size={24} />
              </button>
            </li>
            <li>
              <input
                type="text"
                className="border-2 border-dark-subtle p-1 rounded bg-transparent text-xl outline-none focus:border-white transition text-white"
                placeholder="Search...."
              />
            </li>
            <li className="text-white font-semibold text-lg">Login</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
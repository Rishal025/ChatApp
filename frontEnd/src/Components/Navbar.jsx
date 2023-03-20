import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import cookie from 'cookiejs'
import UseAuth from '../Hooks/UseAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const {setAuth} = UseAuth()
  const { pathname } = location
  const navigate = useNavigate()
  let activeElementClasses = "text-blue-700 px-3 py-2 rounded-md text-sm font-bold";
  let nonActiveElementClasses = "text-gray-600 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium";

  <li className={pathname == "/" ? activeElementClasses : nonActiveElementClasses} onClick={() => navigate('/')}>Home</li>

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
     cookie.remove("jwt");
     localStorage.removeItem("userInfo");
     setAuth('');
     navigate('/login');
  }

  return (
    <nav className="bg-gray-50 shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="font-bold text-xl text-indigo-600">
            MyChatApp
          </Link>
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              onClick={toggle}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19 8H5V6h14v2zm0 5H5v-2h14v2zm0 5H5v-2h14v2z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                  />
                )}
              </svg>
            </button>
          </div>
          <div className="hidden md:flex md:items-center">
            <Link
              to="/"
              className={pathname == "/" ? activeElementClasses : nonActiveElementClasses}
            >
              Home
            </Link>
            <Link
               to="/addfriends"
              className={pathname == "/addfriends" ? activeElementClasses : nonActiveElementClasses}
            >
              Add Friends
            </Link>
            <Link
              to="/requests"
              className={pathname == "/requests" ? activeElementClasses : nonActiveElementClasses}
            >
              Requests
            </Link>
            <Link
              to="/chat"
              className={pathname == "/chat" ? activeElementClasses : nonActiveElementClasses}
            >
              Messenger
            </Link>
            <Link
              to="/profile"
              className={pathname == "/profile" ? activeElementClasses : nonActiveElementClasses}
            >
              Profile
            </Link>
            <button
              onClick={() => handleLogout()}
              className={pathname == "/login" ? activeElementClasses : nonActiveElementClasses}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className={isOpen ? 'block' : 'hidden md:hidden'}>
        <div className="px-2 pt-2 pb-3">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            to="/addfriends"
            className="text-gray-600 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Add Friends
          </Link>
          <Link
            to="/requests"
            className="text-gray-600 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Requests
          </Link>
          <Link
            to="/chat"
            className="text-gray-600 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Messenger
          </Link>
          <Link
              to="/profile"
              className="text-gray-600 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Profile
            </Link>
          <Link
            to="/logout"
            className="text-gray-600 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
          >
           Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

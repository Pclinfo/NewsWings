


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import { toast } from 'react-toastify';
import Avatar from "react-avatar";
import  isTokenExpired from '../utils/isTokenExpired';
const NewsWingNavBar = () => {
  const BASE_URL = import.meta.env.VITE_API_URL || 'http://192.168.0.109:5000';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const isAdmin = user?.isAdmin;
  const categoryMap = useSelector((state) => state.category.categoryMap);

  const [profileImageSrc, setProfileImageSrc] = useState('');

  useEffect(() => {
    if (user?.profile_image) {
      setProfileImageSrc(`${BASE_URL}/${user.profile_image}?t=${Date.now()}`);
    } else {
      setProfileImageSrc('');
    }
  }, [user?.profile_image]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    if (user.token===null) {
      toast.info('You are not logged in');
      navigate(isAdmin ? '/admin' : '/login');
    }
    else {
       toast.success('Logout Successful');
    dispatch(logout());
    setIsDropdownOpen(false);
    setProfileImageSrc('');
    navigate(isAdmin ? '/admin' : '/login');
    }
   
  };

  const handleProfileEdit = () => {
    setIsDropdownOpen(false);
console.log(user);
  if (!user?.token || isTokenExpired(user.token)) {
    toast.error('Session expired. Please log in again.');
    dispatch(logout());
    navigate('/login');
  } else {
    navigate('/profile/edit');
  }
};

  const dynamicMenuItems = Object.keys(categoryMap).map((category) => ({
    name: category,
    path: `/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
  }));

  return (
    <div className="w-full">
      {/* Top Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-white border-b">
        <div className="flex items-center">
          <h1 className="text-red-600 font-bold text-xl mr-2">PRACHIDA.IN</h1>
          <Link to="/e-paper">
            <div className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">E-paper</div>
          </Link>
        </div>

        <div className="hidden sm:flex items-center">
          <h2 className="text-blue-600 text-2xl font-bold">NEWSWING</h2>
        </div>

        <div className="flex items-center space-x-2">
          <div className="hidden lg:flex items-center text-gray-600 text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>

          {isAdmin && (
            <Link to="/admin-create" className="px-2 py-1 rounded">
              <span className="bg-blue-600 text-white p-2 my-1 font-medium mx-2">Post News</span>
            </Link>
          )}

          <div className="relative">
            {profileImageSrc ? (
  <img
    src={profileImageSrc}
    alt="Profile"
    className="w-14 h-14 rounded-full border-black border-2 object-cover cursor-pointer"
    onClick={toggleDropdown}
    onError={(e) => {
      e.target.src = '/default-profile.png';
    }}
  />
) : (
  <div onClick={toggleDropdown} className="cursor-pointer">
    <Avatar
      name={user?.email || 'User'}
      size="50"
      round={true}
      textSizeRatio={2}
        
    />
  </div>
)}

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg z-10">
                <div className="py-2 px-4">
                  <button
                    className="block w-full text-center font-medium cursor-pointer text-gray-800 hover:bg-gray-200 rounded-md py-2"
                    onClick={handleProfileEdit}
                  >
                    Profile Edit
                  </button>
                  <button
                    className="block w-full font-medium cursor-pointer text-center text-gray-800 hover:bg-gray-200 rounded-md py-2"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            className="text-gray-600 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="bg-black text-white hidden lg:flex">
        <ul className="flex items-center w-full lg:justify-center">
          <li className="px-6 py-4 hover:bg-gray-800">
            <Link to="/news">Home</Link>
          </li>
          {dynamicMenuItems.map((item, index) => (
            <li key={index} className="px-6 py-4 hover:bg-gray-800">
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black text-white flex flex-col">
          <Link
            to="/news"
            className="px-2 py-2 border-b border-gray-700 hover:bg-gray-800 text-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          {dynamicMenuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="px-2 py-2 border-b border-gray-700 hover:bg-gray-800 text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsWingNavBar;

import React from 'react';
import { Link } from 'react-router-dom';

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 my-4 w-full py-10">
      {/* Top Message */}
      <p className="text-center text-sm md:text-base mb-10 max-w-3xl mx-auto">
        We value your feedback and are committed to providing timely and effective responses.
        Thank you for reaching out — PRACHIDA looks forward to connecting with you!
      </p>

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo and Social */}
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-2xl font-bold text-red-500">PRACHIDA.IN</h2>
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-5">
              <a href="#" className="text-gray-400 hover:text-white"><FaFacebookF size={22} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><FaTwitter size={22} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><FaInstagram size={22} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><FaLinkedinIn size={22} /></a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6 text-center md:text-left">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/news" className="hover:text-gray-300">News Wing</Link>
            </li>
            <li>
              <Link to="/publication" className="hover:text-gray-300">Publication</Link>
            </li>
            <li>
              <Link to="/college" className="hover:text-gray-300">College</Link>
            </li>
            <li>
              <Link to="/university" className="hover:text-gray-300">University</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6 text-center md:text-left">
          <h3 className="text-xl font-semibold mb-4">Reach Us</h3>

          <div className="flex items-start justify-center md:justify-start space-x-3 text-sm">
            <FaPhoneAlt className="mt-1 text-gray-400" />
            <p>+91 7358791013</p>
          </div>

          <div className="flex items-start justify-center md:justify-start space-x-3 text-sm">
            <FaEnvelope className="mt-1 text-gray-400" />
            <p>pclinfotechitd@gmail.com</p>
          </div>

          <div className="flex items-start justify-center md:justify-start space-x-3 text-sm">
            <FaMapMarkerAlt className="mt-1 text-gray-400" />
            <p>
              No.2/156, 1st Floor, Poonamalee–Avadi Road,<br />
              Senneerkuppam, Chennai – 56
            </p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs text-gray-500 mt-10">
        &copy; {new Date().getFullYear()} NewsWing. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

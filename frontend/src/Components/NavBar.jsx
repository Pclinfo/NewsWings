
import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [navOpen, setNavOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const links = [
    { name: "Home", path: "/" },
    { name: "News Wing", path: "/news" },
    { name: "publication", path: "/publication" },
    {
      name: "Higher Educations & Research",
      subLinks: [
        { name: "College", path: "/college" },
        { name: "Universities", path: "/university" },
      ],
    },
  ];

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProtectedClick = (path) => {
    if (!user?.token) {
      navigate("/login");
    } else {
      navigate(path, { state: { from: path } });
    }
    setNavOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="py-2 text-2xl font-bold text-blue-600">
          PRACHIDA<span className="text-gray-900">.IN</span>
        </div>

        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium items-center">
          {links.map((link, index) => (
            <li key={index} className="relative mx-5">
              {link.subLinks ? (
                <div ref={dropdownRef} className="relative">
                  <div
                    className="flex items-center cursor-pointer hover:text-blue-600"
                    onClick={() =>
                      setDropdownOpen(dropdownOpen === link.name ? false : link.name)
                    }
                  >
                    {link.name}
                    <FiChevronDown className="ml-1 mt-1" />
                  </div>
                  {dropdownOpen === link.name && (
                    <ul className="absolute top-full left-0 mt-2 min-w-[10rem] bg-white shadow-lg rounded-md z-50 border border-gray-100">
                      {link.subLinks.map((sublink, subIndex) => (
                        <li key={subIndex} className="px-4 py-2 text-center hover:bg-gray-100">
                          <Link to={sublink.path}>{sublink.name}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : link.name === "publication" ? (
                <div
                  className="cursor-pointer hover:text-blue-600"
                  onClick={() => handleProtectedClick(link.path)}
                >
                  {link.name}
                </div>
              ) : (
                <Link to={link.path} className="hover:text-blue-600">
                  {link.name}
                </Link>
              )}
            </li>
          ))}

          <li className=" ">
            <div id="google_translate_element" />
          </li>
        </ul>

        <div
          className="md:hidden p-2 text-2xl cursor-pointer text-gray-700"
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {navOpen && (
        <ul className="md:hidden p-2 absolute top-full left-0 mt-2 min-w-[10rem] bg-white shadow-lg rounded-md z-50 border border-gray-100">
          {links.map((link, index) => (
            <li key={index}>
              {link.subLinks ? (
                <div>
                  <div
                    className="flex justify-between items-center cursor-pointer hover:text-blue-600"
                    onClick={() =>
                      setDropdownOpen(dropdownOpen === link.name ? false : link.name)
                    }
                  >
                    {link.name}
                    <FiChevronDown />
                  </div>
                  {dropdownOpen === link.name && (
                    <ul className="pl-4 space-y-2 mt-2">
                      {link.subLinks.map((sublink, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={sublink.path}
                            className="block hover:text-blue-600"
                            onClick={() => {
                              setNavOpen(false);
                              setDropdownOpen(false);
                            }}
                          >
                            {sublink.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : link.name === "publication" ? (
                <div
                  className="hover:text-blue-600 block cursor-pointer"
                  onClick={() => handleProtectedClick(link.path)}
                >
                  {link.name}
                </div>
              ) : (
                <Link
                  to={link.path}
                  className="hover:text-blue-600 block"
                  onClick={() => setNavOpen(false)}
                >
                  {link.name}
                </Link>
              )}
            </li>
          ))}

          <li className="mt-2">
            <div id="google_translate_element_mobile" />
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;


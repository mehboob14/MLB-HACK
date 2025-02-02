import { useState } from "react";
import { Link } from "react-router-dom";
import { GiBaseballGlove } from "react-icons/gi";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex items-center">
          <div className="flex items-center flex-shrink-0">
            <GiBaseballGlove className="h-10 w-10 mr-2" />
            <div className="text-4xl font-extrabold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                statVision
              </span>
            </div>
          </div>

          <ul className="hidden lg:flex ml-14 space-x-14">
            <li>
              <Link to="/" className="hover:text-blue-400">Home</Link>
            </li>
            <li>
              <Link to="/VideoAnalyzer" className="hover:text-blue-400">Video Analyzer</Link>
            </li>
            <li>
              <Link to="/Demo" className="hover:text-blue-400">Demo</Link>
            </li>
            <li>
            <Link to="/About" className="hover:text-blue-400">About</Link>
            </li>
            <li>
              <Link to="/Contact" className="hover:text-blue-400">Contact</Link>
            </li>
          </ul>

          <div className="lg:hidden flex flex-col justify-end">
            <button
              onClick={toggleNavbar}
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileDrawerOpen ? "true" : "false"}
              className="focus:outline-none text-white"
            >
              {mobileDrawerOpen ? "X" : "Menu"}
            </button>
          </div>
        </div>

        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              <li className="py-4">
                <Link
                  to="/"
                  className="text-white hover:text-orange-500 transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li className="py-4">
                <Link
                  to="/VideoAnalyzer"
                  className="text-white hover:text-orange-500 transition duration-300"
                >
                  Video Analyzer
                </Link>
              </li>
              <li className="py-4">
                <Link
                  to="/Demo"
                  className="text-white hover:text-orange-500 transition duration-300"
                >
                  Demo
                </Link>
              </li>
              <li className="py-4">
                <Link
                  to="/Contact"
                  className="text-white hover:text-orange-500 transition duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

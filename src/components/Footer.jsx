import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-8">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        <p className="text-sm">© 2025 Video Analyzer. All rights reserved.</p>
        <div className="flex space-x-6">
         
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500"
          >
            Facebook
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400"
          >
            Twitter
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-700"
          >
            LinkedIn
          </a>
        </div>
        <p className="text-xs text-gray-500">
          Crafted with ❤️ by AK
        </p>
      </div>
    </footer>
  );
};

export default Footer;

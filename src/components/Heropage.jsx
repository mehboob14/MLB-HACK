import React from "react";
import { Link } from "react-router-dom";

const Heropage = () => {
  return (
    <section className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white min-h-screen flex items-center justify-center px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center relative z-10">

        <div className="relative md:w-1/2 w-full mb-10 md:mb-0">
          <img
            className="object-cover object-center rounded-lg w-full h-auto shadow-2xl"
            alt="hero"
            src="/stat.jpeg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 rounded-lg"></div>
        </div>

        <div className="md:w-1/2 w-full md:pl-12 flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl mb-6 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">
            Analyze Baseball Videos
          </h1>
          <p className="mb-8 text-gray-300 text-lg">
            Dive deep into the game with cutting-edge video analysis. Extract detailed metrics and gain insights into performance and strategies.
          </p>

        
          <Link to="/VideoAnalyzer">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg text-lg shadow-lg transition-transform transform hover:scale-105">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Heropage;

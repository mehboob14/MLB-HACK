import React from "react";
import { FaVideo, FaChartLine, FaUsers } from "react-icons/fa";

const About = () => {
  return (
    <section className="py-16 bg-gray-900 text-white text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">
          About Video Analyzer
        </h2>
        <p className="text-gray-300 mb-12 text-lg">
          Unlock the power of AI-driven insights with our advanced baseball video analyzer.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
         
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <FaVideo className="text-indigo-400 text-5xl mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Advanced Video Processing</h3>
            <p className="text-gray-300">
              Our AI-powered system analyzes every frame to provide key insights and performance metrics.
            </p>
          </div>

         
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <FaChartLine className="text-purple-400 text-5xl mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Detailed Statistics</h3>
            <p className="text-gray-300">
              Get in-depth statistics, including player movement, speed tracking, and precision analytics.
            </p>
          </div>

        
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <FaUsers className="text-pink-400 text-5xl mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Team Collaboration</h3>
            <p className="text-gray-300">
              Share analyzed videos with your team and coaches to strategize and improve performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

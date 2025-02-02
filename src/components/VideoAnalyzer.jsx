import React, { useState } from "react";
import { FaVideo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VideoAnalyzer = ({ setUploadedVideo }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoURL(URL.createObjectURL(file)); 
      setError("");
    }
  };

  const handleURLChange = (e) => {
    setVideoLink(e.target.value); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!videoFile && !videoLink) {
      setError("Please upload a video or provide a video URL.");
      return;
    }

    const selectedVideoURL = videoFile ? videoURL : videoLink; 
    setUploadedVideo(selectedVideoURL); 
    navigate("/Demo"); 
  };

  return (
    <section className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white min-h-screen flex items-center justify-center px-6">
      <div className="container mx-auto p-8 rounded-lg shadow-xl bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-6">Upload or Provide Video Link</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <label className="bg-indigo-600 hover:bg-indigo-700 py-3 px-6 rounded-lg shadow-md flex items-center justify-center cursor-pointer text-white">
            <FaVideo className="mr-2" />
            Upload Video
            <input type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
          </label>


          <div>
            <label htmlFor="videoLink" className="block text-sm font-medium text-white">
              Or Provide Video URL
            </label>
            <input
              type="url"
              id="videoLink"
              value={videoLink}
              onChange={handleURLChange}
              className="mt-2 w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter video URL"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

        
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
          >
            Analyze Video
          </button>
        </form>
      </div>
    </section>
  );
};

export default VideoAnalyzer;

import React, { useState } from "react";
import { FaVideo, FaLink } from "react-icons/fa";
import axios from "axios";

const VideoAnalyzer = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [error, setError] = useState("");
  const [returnedVideo, setReturnedVideo] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoURL(""); 
      setError("");
    }
  };

  const handleURLChange = (e) => {
    setVideoURL(e.target.value);
    if (e.target.value) {
      setVideoFile(null); 
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");
    setError("");
    setReturnedVideo(""); 

    console.log('Video file selected:', videoFile);
    console.log('Video URL:', videoURL);

    try {
      let response;

      if (videoFile) {
        const formData = new FormData();
        formData.append("file", videoFile);

      
        console.log('FormData:', formData);

        response = await axios.post("http://localhost:8000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else if (videoURL) {
        response = await axios.post(
          "http://localhost:8000/analyze-url",
          { url: videoURL },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        setError("Please upload a video file or provide a video URL.");
        setLoading(false);
        return;
      }

      
      console.log('Server Response:', response.data);

      if (response.data.videoUrl) {
        setReturnedVideo(response.data.videoUrl); 
        setResponseMessage("Video processed successfully.");
      } else {
        setError("Failed to retrieve the processed video from the server.");
      }
    } catch (err) {
      console.log('Error:', err);
      setError(err.response?.data?.error || "An error occurred while processing your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-5 py-12 flex flex-col lg:flex-row items-center gap-8">
       
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          {returnedVideo ? (
            <video
              src={returnedVideo}
              controls
              className="w-full max-h-96 rounded-lg"
            />
          ) : (
            <p className="text-gray-400 text-center">No video to display yet.</p>
          )}
        </div>

        
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl font-bold mb-6 text-center lg:text-left">
            Upload or Enter Video URL
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
           
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <label className="cursor-pointer bg-indigo-500 py-3 px-6 rounded-lg shadow-md text-center flex items-center">
                <FaVideo className="mr-2" />
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                Upload Video
              </label>
              <div className="relative w-full">
                <FaLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={videoURL}
                  onChange={handleURLChange}
                  placeholder="Paste Video URL"
                  className="pl-12 py-3 border rounded-lg w-full"
                />
              </div>
            </div>

            
            {error && <p className="text-red-500">{error}</p>}
            {loading && <p className="text-yellow-500">Processing...</p>}
            {responseMessage && <p className="text-green-500">{responseMessage}</p>}

            
            <div className="flex justify-end">
              <button
                type="submit"
                className="py-3 px-6 bg-purple-600 rounded-lg shadow-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VideoAnalyzer;

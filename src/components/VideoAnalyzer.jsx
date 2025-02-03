import React, { useState } from "react";
import { FaLink, FaCopy } from "react-icons/fa";
import axios from "axios";

const VideoStats = () => {
  const [videoURL, setVideoURL] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [videoBlobURL, setVideoBlobURL] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [shareableLink, setShareableLink] = useState(null);

  const handleURLChange = (e) => {
    setVideoURL(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponseData(null);
    setShareableLink(null);

    if (!videoURL.trim()) {
      setError("Please enter a valid video URL.");
      setLoading(false);
      return;
    }

    try {
      const encodedURL = encodeURIComponent(videoURL);
      const speechResponse = await axios.post(
        `http://20.244.34.18:443/audio/url-to-speech/?text=${encodedURL}`,
        { headers: { "Content-Type": "application/json" } }
      );

      if (speechResponse.data) {
        setResponseData(speechResponse.data);

        const videoResponse = await axios.get(
          "http://20.244.34.18:443/audio/generate-video/",
          { responseType: "blob" }
        );

        if (videoResponse.data) {
          const videoBlob = new Blob([videoResponse.data], { type: "video/mp4" });
          const videoURL = URL.createObjectURL(videoBlob);
          setVideoBlobURL(videoURL);
          setShowVideoModal(true);
          setShareableLink(videoURL);
        } else {
          setError("Failed to load video.");
        }
      } else {
        setError("No data received from the first request.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const renderMetrics = (data) => {
    return (
      <div className="w-full">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="my-2">
            <strong>{key}:</strong> {value}
          </div>
        ))}

        {data.videoURL && (
          <div className="my-2">
            <strong>Video URL:</strong> <a href={data.videoURL} target="_blank" rel="noopener noreferrer">View Video</a>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="relative bg-gray-800 text-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-5 py-12 flex flex-col lg:flex-row items-center gap-8">
        <div className="w-full lg:w-1/2 flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Analysis Result</h2>
          {loading && <p className="text-yellow-500">Processing...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {responseData && (
            <div className="w-full">
              <h3 className="text-2xl font-bold text-white mb-4">Metrics:</h3>
              <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-auto max-h-60">
              {renderMetrics(responseData)}
              </pre>
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl font-bold mb-6 text-center lg:text-left">Enter Video URL</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative w-full">
              <FaLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={videoURL}
                onChange={handleURLChange}
                placeholder="Paste Video URL"
                className="pl-12 py-3 border rounded-lg w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="py-3 px-6 bg-blue-500 rounded-md shadow-md hover:bg-blue-600 transition duration-200"
                disabled={loading}
              >
                {loading ? "Processing..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showVideoModal && videoBlobURL && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg relative w-[60%] h-[60%] flex flex-col">
            <h2 className="text-xl font-semibold text-white mb-4">Generated Video</h2>

            <div className="flex-grow flex justify-center items-center">
              <video controls className="w-full h-full rounded-lg">
                <source src={videoBlobURL} type="video/mp4" />
                Your browser is incompatible with video tag.
              </video>
            </div>

            <div className="mt-4 flex justify-between items-center">
              {shareableLink && (
                <div className="flex items-center space-x-2 bg-gray-800 p-2 rounded-lg">
                  <input
                    type="text"
                    value={shareableLink}
                    readOnly
                    className="bg-gray-700 text-white p-2 rounded-md w-full"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(shareableLink)}
                    className="p-2 bg-blue-500 rounded-md hover:bg-blue-600 transition"
                  >
                    <FaCopy />
                  </button>
                </div>
              )}

              <button
                onClick={() => setShowVideoModal(false)}
                className="py-2 px-4 bg-red-500 rounded-md shadow-md hover:bg-red-600 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoStats;

import React, { useState } from "react";
import { FaCopy, FaFileUpload } from "react-icons/fa";
import axios from "axios";

const VideoStats = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [videoBlobURL, setVideoBlobURL] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [shareableLink, setShareableLink] = useState(null);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponseData(null);
    setShareableLink(null);

    if (!videoFile) {
      setError("Please upload a video file.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", videoFile);

      const response = await axios.post(
        "http://20.244.34.18:443/audio/url-to-speech/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data) {
        setResponseData(response.data);

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
                {JSON.stringify(responseData, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="relative w-full">
            <FaFileUpload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
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

      {showVideoModal && videoBlobURL && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg relative w-[60%] h-[60%] flex flex-col">
            <h2 className="text-xl font-semibold text-white mb-4">Generated Video</h2>

            <div className="flex-grow flex justify-center items-center">
              <video controls className="w-full h-full rounded-lg">
                <source src={videoBlobURL} type="video/mp4" />
                Your browser does not support the video tag.
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

import React from "react";

const Demo = ({ uploadedVideo }) => {
  return (
    <div className="relative w-full h-[calc(110vh-100px)] overflow-hidden bg-black flex justify-center items-center mt-[80px]">
      {uploadedVideo ? (
        <video
          className="w-full h-full object-cover"
          src={uploadedVideo}
          autoPlay
          loop
          muted
          playsInline
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <p className="text-white text-2xl">No video uploaded yet.</p>
      )}
    </div>
  );
};

export default Demo;

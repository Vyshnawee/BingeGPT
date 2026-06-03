import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[15%] px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>

      <div className="flex gap-4">
        <button className="bg-white text-black px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-70">
          Play
        </button>

        <button className="bg-gray-500 bg-opacity-55 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-70">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;

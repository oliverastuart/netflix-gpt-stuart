import React from "react";

export default function VideoTitle(props) {
  return (
    <div className="w-screen aspect-video pt-[10%] px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{props.title}</h1>
      <p className="py-6 text-lg w-1/4 ">{props.overview}</p>
      <div>
        <button className="bg-white text-black p-4 px-16 text-xl rounded-lg hover:bg-opacity-60">
          ▶️ Play
        </button>
        <button className="bg-gray-500 mx-2 text-white p-4 px-16 text-xl opacity-60 rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
}

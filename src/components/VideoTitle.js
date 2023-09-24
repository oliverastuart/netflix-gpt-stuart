import React from "react";

export default function VideoTitle(props) {
  return (
    <div className="w-screen aspect-video pt-[10%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold my-6 md:my-0">
        {props.title}
      </h1>
      <p className="py-6 text-lg w-1/4 hidden md:inline-block">
        {props.overview}
      </p>
      <div className="my-4 md:m-0">
        <button className="bg-white text-black py-1 md:py-4 px-3 md:px-16 text-xl rounded-lg hover:bg-opacity-60">
          ▶️ Play
        </button>
        <button className="bg-gray-500 mx-2 text-white p-4 px-16 text-xl opacity-60 rounded-lg hidden md:inline-block">
          More Info
        </button>
      </div>
    </div>
  );
}
